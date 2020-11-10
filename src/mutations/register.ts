import { gql } from 'apollo-server-core';

export const registerMutation = gql`
  mutation registerUser($data: RegisterInput) {
    register(data: $data) {
      id
      email
    }
  }
`;
