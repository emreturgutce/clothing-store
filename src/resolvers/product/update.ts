import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Category } from '../../models/category';
import { ProductInput } from '../../input-types/product-input';
import { Product } from '../../models/product';
import { Context, UserRoles } from '../../types';
import { JWT_SECRET } from '../../config';
import { User } from '../../models/user';

@Resolver()
export class UpdateProductResolver {
  @Authorized([UserRoles.user, UserRoles.admin])
  @Mutation(() => Boolean)
  async updateProduct(
    @Arg('productId') productId: string,
    @Arg('data')
    { name, description, price, stock, categoryNames }: ProductInput,
    @Ctx() { req }: Context,
  ): Promise<boolean> {
    const userId = jwt.verify(req.session!.userId, JWT_SECRET);

    const user = await User.findOneOrFail({ where: { id: userId } });

    if (user.role.name === UserRoles.user) {
      const val = user.checkIfUserIsOwner(productId);

      if (!val) {
        return false;
      }

      const product = await Product.findOneOrFail(productId);

      if (name) {
        product.name = name;
      }

      if (description) {
        product.description = description;
      }

      if (price) {
        product.price = price;
      }

      if (stock) {
        product.stock = stock;
      }

      if (categoryNames) {
        product.categories = await Category.findByNames(categoryNames);
      }

      await product.save();

      return true;
    }

    if (user.role.name === UserRoles.admin) {
      const product = await Product.findOneOrFail(productId);

      if (name) {
        product.name = name;
      }

      if (description) {
        product.description = description;
      }

      if (price) {
        product.price = price;
      }

      if (stock) {
        product.stock = stock;
      }

      if (categoryNames) {
        product.categories = await Category.findByNames(categoryNames);
      }

      await product.save();

      return true;
    }

    return false;
  }
}
