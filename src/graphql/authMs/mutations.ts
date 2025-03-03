import { gql } from '@apollo/client';

export const LOGIN_ADMIN = gql`
    mutation LoginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
        _id
        firstname
        lastname
        email
        mobile
        address
        token
  }
}
`;
export const LOGIN_COACH =gql`
    mutation LoginCoach($email: String!, $password: String!) {
    loginCoach(email: $email, password: $password) {
        _id
        firstname
        lastname
        email
        mobile
        address
        token
  }
}
`;
export const LOGIN_USER =gql`
    mutation LoginUsuarios($email: String!, $password: String!) {
    loginUsuarios(email: $email, password: $password) {
        _id
        firstname
        lastname
        email
        mobile
        token
  }
}
`;
export const FORGOT_PASSWORDT=gql`
    mutation ForgotPasswordT($email: String!, $mobile: String!) {
        forgotPasswordT(email: $email, mobile: $mobile) {
            token
        }
}
`;


