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
export const FORGOT_PASSWORD =gql`
    mutation ResetPassword($token: String!, $password: String!) {
        resetPassword(token: $token, password: $password) {
            _id
            firstname
            lastname
            email
            mobile
            password
            role
            isBlocked
            address
            routines
            images
            totalrating
            createdAt
            updatedAt
            refreshToken
        }
}
`;
export const REGISTER =gql`
    mutation RegisterUser($firstname: String!, $lastname: String!, $email: String!, $mobile: String!, $password: String!, $address: String!) {
    registerUser(firstname: $firstname, lastname: $lastname, email: $email, mobile: $mobile, password: $password, address: $address) {
        firstname
        lastname
        email
        mobile
        password
        role
        isBlocked
        address
        routines
        images
        totalrating
        _id
        createdAt
        updatedAt
  }
}
`;
export const DELETE_USER = gql `
    mutation DeleteUser($_id: ID!) {
    deleteUser(_id: $_id) { 
      _id
      firstname
      lastname
      email
      mobile
      password
      role
      isBlocked
      address
      refreshToken
      routines
      images
      totalrating
      passwordChangeAt
      passwordResetToken
      passwordResetExpires
    }
  }

`;

