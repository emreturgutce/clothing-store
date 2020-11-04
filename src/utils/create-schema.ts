import { buildSchema } from 'type-graphql';
import path from 'path';
import { authChecker } from './auth-checker';
import { AvatarScalar } from '../types/avatar-scalar';

export const createSchema = async () => {
  return buildSchema({
    resolvers: [path.join(__dirname, '../resolvers/*/*.ts')],
    authChecker,
    scalarsMap: [
      {
        type: Buffer,
        scalar: AvatarScalar,
      },
    ],
  });
};
