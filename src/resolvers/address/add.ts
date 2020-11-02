import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { AddressInput } from '../../input-types/address-input';
import { Address } from '../../models/address';
import { Context } from '../../types';
import { JWT_SECRET } from '../../config';
import { User } from '../../models/user';

@Resolver()
export class AddAddressResolver {
  @Authorized()
  @Mutation(() => Address, { nullable: true })
  async addAddress(
    @Arg('data') { addressLines, city, zipcode }: AddressInput,
    @Ctx() { req }: Context,
  ): Promise<Address | null> {
    if (!req.session) {
      return null;
    }

    const userId = jwt.verify(req.session.userId, JWT_SECRET);

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return null;
    }

    const address = await Address.create({
      addressLines,
      city,
      zipcode,
      user,
    }).save();

    return address;
  }
}
