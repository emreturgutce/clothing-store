import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Address } from '../../models/address';
import { Context, UserRoles } from '../../types';
import { JWT_SECRET } from '../../config';
import { User } from '../../models/user';
import { OptionalAddressInput } from '../../input-types/address-input';

@Resolver()
export class UpdateAddressResolver {
  @Authorized([UserRoles.user, UserRoles.admin])
  @Mutation(() => Boolean)
  async updateAddress(
    @Arg('addressId') addressId: string,
    @Arg('data') optionalAddressInput: OptionalAddressInput,
    @Ctx() { req }: Context,
  ): Promise<boolean> {
    const userId = jwt.verify(req.session!.userId, JWT_SECRET);

    const user = await User.findOneOrFail({ where: { id: userId } });

    return Address.updateFromUser(addressId, optionalAddressInput, user);
  }
}
