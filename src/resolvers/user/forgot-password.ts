import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { v4 as uuid } from 'uuid';
import { FORGOT_PASSWORD_PREFIX } from '../../constants';
import { User } from '../../models/user';
import { redis } from '../../config';
import { sendEmail } from '../../utils';

@Resolver()
export class ForgotPasswordResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return false;
    }

    const token = uuid();

    await redis.set(
      `${FORGOT_PASSWORD_PREFIX}${token}`,
      user.id,
      'ex',
      60 * 60 * 24,
    );

    await sendEmail(
      email,
      `http://localhost:3000/user/change-password/${token}`,
    );

    return true;
  }
}
