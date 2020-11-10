import { ApolloServerBase } from 'apollo-server-core';
import { createSchema } from '../utils';

export const initializeApolloServerBase = async () => {
  const schema = await createSchema();

  const server = new ApolloServerBase({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  return server;
};
