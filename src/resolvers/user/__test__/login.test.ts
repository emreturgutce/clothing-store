import { gCall, createFakeUser } from '../../../utils';
import { registerMutation, loginMutation } from '../../../mutations';

describe('Login Test Suite', () => {
  it('login user', async () => {
    const user = createFakeUser();

    await gCall({
      source: registerMutation,
      variableValues: {
        data: user,
      },
    });

    await gCall({
      source: loginMutation,
      variableValues: {
        data: {
          email: user.email,
          password: user.password,
        },
      },
    });
  });
});
