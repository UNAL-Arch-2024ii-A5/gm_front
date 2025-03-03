import { gql } from '@apollo/client';


// Queries
export const GET_ALL_SNAPSHOTS_USER = gql`
  query GetAllSnapshotsUser($userId: ID!) {
    getAllSnapshotsUser(userId: $userId) {
      id
      userId
      weight
      height
      bodyFatPercentage
      neck
      waist
      hip
      chest
      leftArm
      rightArm
      leftForearm
      rightForearm
      leftThigh
      rightThigh
      leftCalf
      rightCalf
      date
    }
  }
`;