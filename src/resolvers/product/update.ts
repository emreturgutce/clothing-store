import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Category } from '../../models/category';
import { ProductInput } from '../../input-types/product-input';
import { Product } from '../../models/product';
import { Context, UserRoles } from '../../types';
import { JWT_SECRET } from '../../config';
import { User } from '../../models/user';
import { ProductUpdateInput } from '../../input-types/product-update-input';

@Resolver()
export class UpdateProductResolver {
  @Authorized([UserRoles.user, UserRoles.admin])
  @Mutation(() => Boolean)
  async updateProduct(
    @Arg('productId') productId: string,
    @Arg('productUpdateInput') productUpdateInput: ProductUpdateInput,
    @Ctx() { req }: Context,
  ): Promise<boolean> {
    const userId = jwt.verify(req.session!.userId, JWT_SECRET);

    const user = await User.findOneOrFail({
      where: { id: userId },
      relations: ['products'],
    });

    if (user.role.name === UserRoles.user) {
      const val = user.checkIfUserIsOwner(productId);

      if (!val) {
        return false;
      }

      return Product.updateFromUser(productId, productUpdateInput, user);
    }

    if (user.role.name === UserRoles.admin) {
      return Product.updateFromUser(productId, productUpdateInput);
    }

    return false;
  }
}
