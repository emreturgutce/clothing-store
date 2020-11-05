import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user';
import { Context } from '../../types';
import { JWT_SECRET } from '../../config';
import { CacheControl } from '../../utils/cache-control';

@Resolver()
export class MeResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  @CacheControl({ maxAge: 15 })
  async me(@Ctx() { req }: Context): Promise<User | null> {
    const id = jwt.verify(req.session!.userId, JWT_SECRET);

    const user = await User.findOneOrFail({
      where: { id },
    });

    return user;
  }
}
