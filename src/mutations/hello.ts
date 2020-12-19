import { gql } from 'apollo-server-core';

export const helloQuery = gql`
    {
        hello
    }
`;
