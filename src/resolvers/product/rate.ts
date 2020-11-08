import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { Context, UserRoles } from '../../types';

@Resolver()
export class RateProductResolver {
  @Authorized([UserRoles.user, UserRoles.admin])
  @Mutation(() => Product, { nullable: true })
  async rateProduct(
    @Arg('productId') productId: string,
    @Arg('rate') rate: number,
    @Ctx() { req }: Context,
  ): Promise<Product | null> {
    const userId = jwt.verify(req.session!.userId, JWT_SECRET);

    const user = await User.findOneOrFail({ where: { id: userId } });

    const product = await Product.findOneOrFail({ where: { id: productId } });

    const val = user.checkIfUserBoughtTheProduct(product);

    if (!val) {
      return null;
    }

    if (!product.rate) {
      product.rate = [rate];
    } else {
      product.rate.push(rate);
    }

    await product.save();

    return product;
  }
}
