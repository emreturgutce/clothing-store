import { ApolloServerBase } from 'apollo-server-core';
import { createSchema } from '../utils';

export const initializeApolloServerBase = async () => {
  const schema = await createSchema();

  const server = new ApolloServerBase({
    schema,
    context: () => ({ req: { session: {} }, res: {} }),
  });

  return server;
};
