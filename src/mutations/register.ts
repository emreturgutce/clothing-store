import { gql } from 'apollo-server-core';

export const registerMutation = gql`
    mutation registerUser($data: RegisterInput) {
        register(data: $data) {
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
