import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { ProductInput } from '../../input-types/product-input';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { Context, UserRoles } from '../../types';
import { JWT_SECRET } from '../../config';

@Resolver()
export class AddProductResolver {
  @Authorized([UserRoles.user, UserRoles.admin])
  @Mutation(() => Product, { nullable: true })
  async addProduct(
    @Arg('data')
    { name, price, description, stock, categoryNames }: ProductInput,
    @Ctx() { req }: Context,
  ): Promise<Product | null> {
    const id = jwt.verify(req.session!.userId, JWT_SECRET);

    const owner = await User.findOneOrFail({
      where: { id },
    });

    const categories = await Category.findByNames(categoryNames);

    const product = await Product.create({
      name,
      price,
      description,
      stock,
      owner,
      categories,
    }).save();

    return product;
  }
}
