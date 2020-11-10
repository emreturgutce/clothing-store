import { ApolloServerBase } from 'apollo-server-core';
import { createTestClient } from 'apollo-server-testing';
import { initializeApolloServerBase } from '../../../config/apollo-server-base';
import { helloQuery, registerMutation } from '../../../mutations';

let server: ApolloServerBase;
(async () => {
  server = await initializeApolloServerBase();
})();

describe('Register Mutation Test Suite', () => {
  it('Hello Query', async () => {
    const { query } = createTestClient(server);

    type Data = { hello: string };

    const res = await query<Data>({ query: helloQuery });

    expect(res).toBeDefined();
    expect(res.data?.hello).toEqual('hello World');
    expect(res.errors).toBeUndefined();
    expect(res.extensions).toBeUndefined();
  });

  it('Register Mutation', async () => {
    const { mutate } = createTestClient(server);

    const res = await mutate({
      mutation: registerMutation,
      variables: {
        data: {
          name: 'emre',
          phone: '+905350149645',
          email: 'emreturgut@mail.com',
          password: '123456',
        },
      },
    });

    console.log(res);

    expect(res).toBeDefined();
    // expect(res.data?.hello).toEqual('hello World');
    // expect(res.errors).toBeUndefined();
    // expect(res.extensions).toBeUndefined();
  });
});
