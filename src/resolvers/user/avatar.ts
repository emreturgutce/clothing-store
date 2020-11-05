import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import jwt from 'jsonwebtoken';
import streamToPromise from 'stream-to-promise';
import { User } from '../../models/user';
import { Context } from '../../types';
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
      const id = jwt.verify(req.session!.userId, JWT_SECRET);

      const user = await User.findOneOrFail({
        where: { id },
      });

      const readStream = file.createReadStream();

      streamToPromise(readStream)
        .then(async (data) => {
          user.avatar = data;
          await user.save();
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
