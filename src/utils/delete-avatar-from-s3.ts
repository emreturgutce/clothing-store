import { AWS_S3_BUCKET } from '../config';
import { s3 } from '../config/s3';

export const deleteAvatarFromS3 = (avatarId: string) => {
  return s3
    .deleteObject({
      Bucket: AWS_S3_BUCKET,
      Key: avatarId,
    })
    .promise();
};
