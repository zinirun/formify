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

export const CREATE_FORM = gql`
    mutation createForm($form: FormInput!) {
        createForm(form: $form) {
            id
            title
            content
        }
    }
`;

export const GET_FORM_BY_ID = gql`
    query getFormById($id: Float!) {
        getFormById(id: $id) {
            id
            title
            content
            createdAt
        }
    }
`;

export const GET_FORMS_BY_GROUP_ID = gql`
    query getFormsByGroupId($groupId: Float!) {
        getFormsByGroupId(groupId: $groupId) {
            id
            title
            content
            createdAt
        }
    }
`;
