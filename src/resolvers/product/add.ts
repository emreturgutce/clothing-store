import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { ProductInput } from '../../input-types/product-input';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { Context } from '../../types/context';
import { JWT_SECRET } from '../../config';

@Resolver()
export class AddProductResolver {
  @Authorized()
  @Mutation(() => Product, { nullable: true })
  async add(
    @Arg('data')
    { name, price, description, stock, categoriesIds }: ProductInput,
    @Ctx() { req }: Context,
  ): Promise<Product | null> {
    const userId = jwt.verify(req.session!.userId, JWT_SECRET);
    const owner = await User.findOne({
      where: { id: userId },
      relations: ['detail'],
    });

    if (!owner) {
      return null;
    }

    let categories: Category[] | undefined;

    if (categoriesIds) {
      categories = await Category.findByIds(categoriesIds);
    }

    const product = Product.create({
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
