import { buildSchema } from 'type-graphql';
import path from 'path';
import { authChecker } from './auth-checker';
import { AvatarScalar } from '../types/avatar-scalar';
import { NODE_ENV } from '../config';

export const createSchema = async () => {
    return buildSchema({
        resolvers: [
            path.join(
                __dirname,
                `../resolvers/*/*.${NODE_ENV === 'production' ? 'js' : 'ts'}`,
            ),
        ],
        authChecker,
        scalarsMap: [
            {
                type: Buffer,
                scalar: AvatarScalar,
            },
        ],
        emitSchemaFile: true,
        nullableByDefault: true,
    });
};
