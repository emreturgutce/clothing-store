import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user';
import { Context } from '../../types';
import { JWT_SECRET } from '../../config';

@Resolver()
export class MeResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<User | null> {
    const id = jwt.verify(req.session!.userId, JWT_SECRET);

    const user = await User.findOne({
      where: { id },
      select: [
        'id',
        'email',
        'detail',
        'avatar',
        'confirmed',
        'createdAt',
        'updatedAt',
      ],
      relations: ['detail'],
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
