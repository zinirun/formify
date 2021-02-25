import gql from 'graphql-tag';

export const VERIFY_USER = gql`
    mutation verifyUser {
        verifyUser {
            id
            provider
            providerId
            username
            email
        }
    }
`;
