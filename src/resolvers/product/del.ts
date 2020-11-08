import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Product } from '../../models/product';
import { Context, UserRoles } from '../../types';
import { JWT_SECRET } from '../../config';
import { User } from '../../models/user';

@Resolver()
export class DeleteProductResolver {
  @Authorized([UserRoles.user, UserRoles.admin])
  @Mutation(() => Boolean)
  async deleteProduct(
    @Arg('productId') productId: string,
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

      const result = await Product.delete(productId);

      if (!result.affected) {
        return false;
      }

      return true;
    }
    if (user.role.name === UserRoles.admin) {
      const result = await Product.delete(productId);

      if (!result.affected) {
        return false;
      }

      return true;
    }

    return false;
  }
}
