import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Address } from '../../models/address';
import { Context } from '../../types';
import { JWT_SECRET } from '../../config';
import { User } from '../../models/user';
import { OptionalAddressInput } from '../../input-types/address-input';

@Resolver()
export class UpdateAddressResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async updateAddress(
    @Arg('id') id: string,
    @Arg('data') optionalAddressInput: OptionalAddressInput,
    @Ctx() { req }: Context,
  ): Promise<boolean> {
    if (!req.session) {
      return false;
    }

    const userId = jwt.verify(req.session.userId, JWT_SECRET);

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return false;
    }

    const result = await Address.update(
      {
        id,
        user,
      },
      optionalAddressInput,
    );

    if (!result.affected) {
      return false;
    }

    return true;
  }
}
