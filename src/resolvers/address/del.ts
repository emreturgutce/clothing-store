import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Address } from '../../models/address';
import { Context, UserRoles } from '../../types';
import { JWT_SECRET } from '../../config';
import { User } from '../../models/user';

@Resolver()
export class DeleteAddressResolver {
  @Authorized([UserRoles.user, UserRoles.admin])
  @Mutation(() => Boolean)
  async deleteAddress(
    @Arg('addressId') addressId: string,
    @Ctx() { req }: Context,
  ): Promise<boolean> {
    const userId = jwt.verify(req.session!.userId, JWT_SECRET);

    const user = await User.findOneOrFail({ where: { id: userId } });

    if (user.role.name === UserRoles.user) {
      return Address.deleteFromUser(addressId, user);
    }

    if (user.role.name === UserRoles.admin) {
      return Address.deleteFromUser(addressId);
    }

    return false;
  }
}
