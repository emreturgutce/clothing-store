import { createTestClient } from 'apollo-server-testing';
import { helloQuery, registerMutation } from '../../../mutations';
import { createTestUser } from '../../../utils/create-test-user';

describe('Register Mutation Test Suite', () => {
  it('Hello Query', async () => {
    const { query } = createTestClient(global.server);

    type Data = { hello: string };

    const res = await query<Data>({ query: helloQuery });

    expect(res).toBeDefined();
    expect(res.data?.hello).toEqual('hello World');
    expect(res.errors).toBeUndefined();
    expect(res.extensions).toBeUndefined();
  });

  it('Register Mutation', async () => {
    const { mutate } = createTestClient(global.server);

    const res = await mutate({
      mutation: registerMutation,
      variables: {
        data: createTestUser(),
      },
    });

    console.log(res);

    expect(res).toBeDefined();
    expect(res.data?.register).toBeDefined();
  });
});
