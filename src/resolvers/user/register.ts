import { Arg, Mutation, Query, Resolver } from 'type-graphql';
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
    const user = await User.create({
      email,
      password,
    }).save();

    return user;
  }
}
