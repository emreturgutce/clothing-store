import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { NODE_ENV } from '.';
import { createSchema, formatError } from '../utils';

export const initializeApolloServer = async (app: Express) => {
  const schema = await createSchema();

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    tracing: true,
    cacheControl: true,
    formatError,
    playground: NODE_ENV === 'development',
  });

  server.applyMiddleware({ app });
};
