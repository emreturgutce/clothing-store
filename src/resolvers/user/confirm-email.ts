import { Arg, Mutation, Resolver } from 'type-graphql';
import { redis } from '../../config/redis';
import { User } from '../../models/user';
import { CONFIRM_USER_PREFIX } from '../../constants';

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmEmail(@Arg('token') token: string): Promise<boolean> {
    const userId = await redis.get(`${CONFIRM_USER_PREFIX}${token}`);

    if (!userId) {
      return false;
    }

    await User.update({ id: userId }, { confirmed: true });

    await redis.del(token);

    return true;
  }
}
