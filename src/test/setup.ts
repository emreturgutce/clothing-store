import 'colors';
import { createConnection, getConnection } from 'typeorm';
import {
  createTestClient,
  ApolloServerTestClient,
} from 'apollo-server-testing';
import { clearDatabase } from '../utils';
import { initializeApolloServerBase } from '../config/apollo-server-base';

declare global {
  namespace NodeJS {
    interface Global {
      graphqlClient: ApolloServerTestClient;
    }
  }
}

beforeAll(async () => {
  global.graphqlClient = createTestClient(await initializeApolloServerBase());
  await createConnection();
});

beforeEach(async () => {
  await clearDatabase();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});
