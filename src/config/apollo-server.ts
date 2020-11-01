import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { createSchema, formatError } from '../utils';

export const initializeApolloServer = async (app: Express) => {
  const schema = await createSchema();

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    formatError,
  });

  server.applyMiddleware({ app });
};
