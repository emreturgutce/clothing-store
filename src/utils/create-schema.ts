import { buildSchema } from 'type-graphql';
import path from 'path';
import { authChecker } from './auth-checker';

export const createSchema = async () => {
  return buildSchema({
    resolvers: [path.join(__dirname, '../resolvers/**/*.*')],
    authChecker,
  });
};
