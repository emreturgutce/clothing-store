import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Product } from '../../models/product';
import { Context } from '../../types';
import { JWT_SECRET } from '../../config';

@Resolver()
export class GetProductByUserResolver {
  @Authorized()
  @Query(() => [Product])
  async getProductByUser(
    @Ctx() { req }: Context,
    @Arg('userId', { nullable: true }) userId?: string,
  ): Promise<Product[]> {
    if (userId) {
      const products = await Product.find({
        where: { owner: { id: userId } },
      });

      return products;
    }

    const id = jwt.verify(req.session!.userId, JWT_SECRET);

    const products = await Product.find({
      where: { owner: { id } },
    });

    return products;
  }
}
