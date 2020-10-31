import { gCall } from '../../../utils/g-call';

const registerMutation = `
  mutation Register($data: RegisterInput!) {
    register(
      data: $data
    ) {
      id
      email
    }
  }
`;

describe('Register', () => {
  it('create user', async () => {
    const user = {
      name: 'emre',
      phone: '+905358885555',
      email: 'sdgdsgsdg@test.com',
      password: '123456',
    };

    await gCall({
      source: registerMutation,
      variableValues: {
        data: user,
      },
    });
  });
});
