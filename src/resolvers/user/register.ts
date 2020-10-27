import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { RegisterInput } from '../../input-types/register-input';
import { User } from '../../models/user';

@Resolver()
export class RegisterUserResolver {
  @Query(() => String)
  hello() {
    return 'hello World';
  }

  @Mutation(() => User)
  async register(
    @Arg('data') { email, password }: RegisterInput,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPassword,
    }).save();

    return user;
  }
}
