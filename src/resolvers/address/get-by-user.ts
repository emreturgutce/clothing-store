import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Address } from '../../models/address';
import { Context } from '../../types';
import { JWT_SECRET } from '../../config';
import { User } from '../../models/user';

@Resolver()
export class GetAddressByUserResolver {
  @Authorized()
  @Query(() => [Address], { nullable: true })
  async getAddressByUser(@Ctx() { req }: Context): Promise<Address[] | null> {
    if (!req.session) {
      return null;
    }

    const userId = jwt.verify(req.session.userId, JWT_SECRET);

    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      return null;
    }

    const address = await Address.find({
      where: { user },
      relations: ['user'],
    });

    if (!address) {
      return null;
    }

    return address;
  }
}
