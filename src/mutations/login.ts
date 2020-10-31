export const loginMutation = `
mutation Login($data: LoginInput!) {
  Login(
    data: $data
  ) {
    id
    email
  }
}
`;
