import 'colors';
import { ExecutionResult } from 'graphql';
import { createConnection, getConnection } from 'typeorm';
import { registerMutation } from '../mutations';
import { clearDatabase, gCall } from '../utils';

type User = {
  name?: string;
  phone?: string;
  email: string;
  password: string;
};

declare global {
  namespace NodeJS {
    interface Global {
      signup(
        user: User,
      ): Promise<
        ExecutionResult<
          {
            [key: string]: any;
          },
          {
            [key: string]: any;
          }
        >
      >;
    }
  }
}

global.signup = (user: User) => gCall(registerMutation, { data: user });

beforeAll(async () => {
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
