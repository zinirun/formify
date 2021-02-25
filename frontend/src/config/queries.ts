import gql from 'graphql-tag';

export const VERIFY_USER = gql`
    query verifyUser {
        verifyUser {
            id
            provider
            providerId
            username
            email
        }
    }
`;

export const GET_GROUPS = gql`
    query getGroups {
        getGroups {
            id
            name
        }
    }
`;

export const CREATE_GROUP = gql`
    mutation createGroup($group: GroupInput!) {
        createGroup(group: $group) {
            id
            name
        }
    }
`;
