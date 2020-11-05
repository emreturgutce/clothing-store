import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Address } from '../../models/address';
import { Context } from '../../types';
import { JWT_SECRET } from '../../config';
import { User } from '../../models/user';

@Resolver()
export class DelAddressResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async delAddress(
    @Arg('id') id: string,
    @Ctx() { req }: Context,
  ): Promise<boolean> {
    if (!req.session) {
      return false;
    }

    const userId = jwt.verify(req.session.userId, JWT_SECRET);

    const user = await User.findOne({ where: { id: userId } });

    const result = await Address.delete({
      id,
      user,
    });

    if (!result.affected) {
      return false;
    }

    return true;
  }
}
