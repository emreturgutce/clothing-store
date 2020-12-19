import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { FORGOT_PASSWORD_PREFIX } from '../../constants';
import { User } from '../../models/user';
import { redis } from '../../config';
import { ChangePasswordInput } from '../../input-types/change-password-input';
import { Context } from '../../types';

@Resolver()
export class ChangePasswordResolver {
    @Authorized()
    @Mutation(() => Boolean)
    async changePassword(
        @Arg('data') { token, password }: ChangePasswordInput,
        @Ctx() ctx: Context,
    ): Promise<boolean> {
        const id = await redis.get(`${FORGOT_PASSWORD_PREFIX}${token}`);

        if (!id) {
            return false;
        }

        const result = await User.update(id, {
            password: await bcrypt.hash(password, 12),
        });

        if (!result.affected) {
            return false;
        }

        await redis.del(`${FORGOT_PASSWORD_PREFIX}${token}`);

        ctx.req.session!.userId = id;

        return true;
    }
}
