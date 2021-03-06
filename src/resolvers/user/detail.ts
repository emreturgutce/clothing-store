import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user';
import { Context } from '../../types';
import { JWT_SECRET } from '../../config';
import { DetailInput } from '../../input-types/detail-input';

@Resolver()
export class DetailResolver {
    @Authorized()
    @Mutation(() => User)
    async detail(
        @Arg('data', { nullable: true }) { name, phone }: DetailInput,
        @Ctx() { req }: Context,
    ): Promise<User> {
        const id = jwt.verify(req.session!.userId, JWT_SECRET);

        const user = await User.findOneOrFail({
            where: { id },
        });

        if (name) {
            user.detail!.name = name;
        }

        if (phone) {
            user.detail!.phone = phone;
        }

        await user.save();

        return user;
    }
}
