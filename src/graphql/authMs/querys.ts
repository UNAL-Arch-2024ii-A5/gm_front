import { gql } from '@apollo/client';
export const GET_USERS= gql`
    query AllUsers {
    allUsers {
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
