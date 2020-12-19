import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Address } from '../../models/address';
import { Context, UserRoles } from '../../types';
import { JWT_SECRET } from '../../config';
import { User } from '../../models/user';

@Resolver()
export class GetAddressByIdResolver {
    @Authorized([UserRoles.user, UserRoles.admin])
    @Query(() => Address, { nullable: true })
    async getAddressById(
        @Arg('addressId') addressId: string,
        @Ctx() { req }: Context,
    ): Promise<Address | null> {
        const userId = jwt.verify(req.session!.userId, JWT_SECRET);

        const user = await User.findOneOrFail({ where: { id: userId } });

        if (user.role.name === UserRoles.user) {
            return Address.getFromUser(addressId, user);
        }

        if (user.role.name === UserRoles.admin) {
            return Address.getFromUser(addressId);
        }

        return null;
    }
}
