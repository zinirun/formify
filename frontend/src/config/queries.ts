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
            status
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
            updatedAt
            status
            pubUrl
        }
    }
`;

export const GET_FORM_BY_PUB_URL = gql`
    query getFormByPubUrl($pubUrl: String!) {
        getFormByPubUrl(pubUrl: $pubUrl) {
            id
            title
            content
            status
            createdAt
            pubUrl
        }
    }
`;

export const GET_FORMS_BY_GROUP_ID = gql`
    query getFormsByGroupId($groupId: Float!) {
        getFormsByGroupId(groupId: $groupId) {
            id
            title
            content
            status
            pubUrl
            createdAt
        }
    }
`;

export const UPDATE_FORM = gql`
    mutation updateForm($id: Float!, $form: FormUpdateInput!) {
        updateForm(id: $id, form: $form) {
            id
            title
            content
            status
            user {
                id
                username
            }
        }
    }
`;

export const PUBLISH_FORM = gql`
    mutation publishForm($id: Float!) {
        publishForm(id: $id) {
            id
            title
            content
            status
            pubUrl
            user {
                id
                username
            }
        }
    }
`;

export const CREATE_ANSWER = gql`
    mutation createAnswer($answer: AnswerInput!) {
        createAnswer(answer: $answer) {
            id
            content
            form {
                id
                title
            }
        }
    }
`;

export const GET_ANSWERS_BY_FORM_ID = gql`
    query getAnswersByFormId($formId: Float!) {
        getAnswersByFormId(formId: $formId) {
            id
            content
        }
    }
`;
