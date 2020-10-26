import 'reflect-metadata';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { createConnection } from 'typeorm';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

createConnection()
  .then(() => {
    console.log(`🐘 Connected to Postgres DB`);
  })
  .catch((err) => {
    console.error(`❌ Error occurred connecting Postgres DB:\n${err}`);
    process.exit(1);
  });

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
