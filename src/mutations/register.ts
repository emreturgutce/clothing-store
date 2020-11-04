export const registerMutation = `
  mutation Register($data: RegisterInput!) {
    register(
      data: $data
    ) {
      id
      email
      detail {
        id
        name
        phone
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
