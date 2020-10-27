import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user';
import { Context } from '../../types/context';
import { JWT_SECRET } from '../../config';
import { DetailInput } from '../../input-types/detail-input';

@Resolver()
export class DetailResolver {
  @Authorized()
  @Mutation(() => User, { nullable: true })
  async detail(
    @Arg('data', { nullable: true }) { name, phone }: DetailInput,
    @Ctx() { req }: Context,
  ): Promise<User | null | undefined> {
    const id = jwt.verify(req.session!.userId, JWT_SECRET);

    if (!id) {
      return null;
    }

    const user = await User.findOne({
      where: { id },
      select: ['id', 'email', 'detail'],
      relations: ['detail'],
    });
    console.log(user);

    if (!user) {
      return null;
    }

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
