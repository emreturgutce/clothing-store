import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user';
import { Context } from '../../types';
import { JWT_SECRET } from '../../config';
import { getAvatarFromS3 } from '../../utils/get-avatar-from-s3';

@Resolver()
export class GetAvatarResolver {
  @Authorized()
  @Query(() => Boolean)
  async getAvatar(@Ctx() { req }: Context): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const id = jwt.verify(req.session!.userId, JWT_SECRET);

      const user = await User.findOneOrFail({ where: { id } });

      if (user.avatarId) {
        try {
          const data = getAvatarFromS3(user.avatarId);

          const writeStream = fs.createWriteStream(user.avatarId);

          data.pipe(writeStream);
        } catch (err) {
          reject(err);
        }
      }

      resolve(true);
    });
  }
}
