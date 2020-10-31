import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RegisterInput } from '../../input-types/register-input';
import { User } from '../../models/user';
import { Context } from '../../types/context';
import { JWT_SECRET } from '../../config';
import { UserDetail } from '../../models/user-detail';
import { sendEmail, createConfirmationUrl } from '../../utils';

@Resolver()
export class RegisterUserResolver {
  @Query(() => String)
  hello() {
    return 'hello World';
  }

  @Mutation(() => User)
  async register(
    @Arg('data') { email, password, name, phone }: RegisterInput,
    @Ctx() ctx: Context,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPassword,
      detail: await UserDetail.create({
        name,
        phone,
      }).save(),
    }).save();

    ctx.req.session!.userId = jwt.sign(user.id, JWT_SECRET);

    await sendEmail(email, await createConfirmationUrl(user.id));

    return user;
  }
}
