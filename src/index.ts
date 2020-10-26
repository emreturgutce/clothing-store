import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import path from 'path';

async function main() {
  createConnection()
    .then(() => {
      console.log(`🐘 Connected to Postgres DB`);
    })
    .catch((err) => {
      console.error(`❌ Error occurred connecting Postgres DB:\n${err}`);
      process.exit(1);
    });

  const schema = await buildSchema({
    resolvers: [path.join(__dirname, '/resolvers/**/*.ts')],
  });

  const server = new ApolloServer({ schema });

  const app = express();

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    );
  });
}

main().catch((err) => {
  console.error(err);
});
