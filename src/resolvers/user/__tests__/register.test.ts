import { gql } from 'apollo-server-core';

const helloQuery = gql`
  {
    hello
  }
`;

describe('Register Mutation Test Suite', () => {
  it('Hello Query', async () => {
    const res = await global.graphqlClient.query({ query: helloQuery });

    console.log(res);

    expect(res).toBeDefined();
  });
});
