import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { User } from '../../models/user';
import { Context } from '../../types';
import { JWT_SECRET } from '../../config';
import { uploadAvatarToS3 } from '../../utils/upload-avatar-to-s3';
import { deleteAvatarFromS3 } from '../../utils/delete-avatar-from-s3';

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

            const user = await User.findOneOrFail({ where: { id } });

            const readStream = file.createReadStream();

            const extension = file.filename.split('.')[1];

            const avatarId = `${uuid()}.${extension}`;

            try {
                if (user.avatarId) {
                    await deleteAvatarFromS3(user.avatarId);
                }

                await uploadAvatarToS3(avatarId, readStream);

                user.avatarId = avatarId;

                await user.save();

                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }
}
