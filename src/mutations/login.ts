export const loginMutation = `
mutation Login($data: LoginInput!) {
  login(
    data: $data
  ) {
    id
    email
  }
}
`;
