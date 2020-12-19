import { gql } from 'apollo-server-core';

export const meQuery = gql`
    {
        me {
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
