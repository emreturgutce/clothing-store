import { Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user';
import { Context } from '../../types/context';
import { JWT_SECRET } from '../../config';

@Resolver()
export class MeResolver {
  @Authorized()
  @Mutation(() => User, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<User | null> {
    const id = jwt.verify(req.session!.userId, JWT_SECRET);

    if (!id) {
      return null;
    }

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return null;
    }

    return user;
  }
}
