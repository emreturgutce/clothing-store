import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../../models/user';

@Resolver()
export class RegisterUserResolver {
  @Query(() => String)
  hello() {
    return 'hello World';
  }

  @Mutation(() => User)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<User> {
    const user = await User.create({
      email,
      password,
    }).save();

    return user;
  }
}
