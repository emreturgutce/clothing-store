import 'colors';
import { createConnection, getConnection } from 'typeorm';
import { ApolloServerBase } from 'apollo-server-core';
import { clearDatabase } from '../utils';
import { initializeApolloServerBase } from '../config/apollo-server-base';

declare global {
    namespace NodeJS {
        interface Global {
            server: ApolloServerBase;
        }
    }
}

beforeAll(async () => {
    global.server = await initializeApolloServerBase();
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
