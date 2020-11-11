import { createTestClient } from 'apollo-server-testing';
import { registerMutation, meQuery } from '../../../mutations';
import { createTestUser } from '../../../utils/create-test-user';

describe('Me Resolver Test Suite', () => {
  it('Successful Me Query', async () => {
    const { mutate, query } = createTestClient(global.server);

    const user = createTestUser();

    await mutate({
      mutation: registerMutation,
      variables: {
        data: user,
      },
    });

    const res = await query({
      query: meQuery,
    });

    expect(res).toBeDefined();
  });
});
