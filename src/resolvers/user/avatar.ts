import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { writeFileSync } from 'fs';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import jwt from 'jsonwebtoken';
import streamToPromise from 'stream-to-promise';
import { User } from '../../models/user';
import { Context } from '../../types/context';
import { JWT_SECRET } from '../../config';

@Resolver()
export class AvatarResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async avatar(
    @Arg('avatar', () => GraphQLUpload)
    file: FileUpload,
    @Ctx() { req }: Context,
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const userId = jwt.verify(req.session!.userId, JWT_SECRET);

      const user = await User.findOne({
        where: { id: userId },
        relations: ['detail'],
      });

      if (!user) {
        return false;
      }

      const { createReadStream, filename } = await file;

      const readStream = createReadStream();

      streamToPromise(readStream)
        .then(async (data) => {
          console.log(user);
          user.avatar = data.toString('base64');
          await user.save();
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
