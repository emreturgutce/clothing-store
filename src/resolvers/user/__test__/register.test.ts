import { registerMutation } from '../../../mutations';
import { createFakeUser, gCall } from '../../../utils';

describe('Register Test Suite', () => {
  it('create user', async () => {
    const user = createFakeUser();

    await gCall({
      source: registerMutation,
      variableValues: {
        data: user,
      },
    });
  });
});
