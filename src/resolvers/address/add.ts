import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { AddressInput } from '../../input-types/address-input';
import { Address } from '../../models/address';
import { Context, UserRoles } from '../../types';
import { JWT_SECRET } from '../../config';
import { User } from '../../models/user';

@Resolver()
export class AddAddressResolver {
    @Authorized([UserRoles.user, UserRoles.admin])
    @Mutation(() => Address, { nullable: true })
    async addAddress(
        @Arg('data') { addressLines, city, zipcode }: AddressInput,
        @Ctx() { req }: Context,
    ): Promise<Address | null> {
        const userId = jwt.verify(req.session!.userId, JWT_SECRET);

        const user = await User.findOneOrFail({ where: { id: userId } });

        const address = await Address.create({
            addressLines,
            city,
            zipcode,
            user,
        }).save();

        return address;
    }
}
