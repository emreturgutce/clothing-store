import { Arg, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { RegisterInput } from '../../input-types/register-input';
import { User } from '../../models/user';

@Resolver()
export class LoginUserResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('data') { email, password }: RegisterInput,
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return null;
    }

    return user;
  }
}
