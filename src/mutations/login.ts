import { gql } from 'apollo-server-core';

export const loginMutation = gql`
    mutation loginUser($data: LoginInput) {
        login(data: $data) {
            id
            email
            confirmed
            avatarId
            role {
                id
                name
                createdAt
                updatedAt
            }
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
