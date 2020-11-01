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
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg('data') { token, password }: ChangePasswordInput,
    @Ctx() ctx: Context,
  ): Promise<User | null> {
    const userId = await redis.get(`${FORGOT_PASSWORD_PREFIX}${token}`);

    if (!userId) {
      return null;
    }

    const user = await User.findOne(userId);

    if (!user) {
      return null;
    }

    await redis.del(`${FORGOT_PASSWORD_PREFIX}${token}`);

    user.password = await bcrypt.hash(password, 12);

    await user.save();

    ctx.req.session!.userId = user.id;

    return user;
  }
}
