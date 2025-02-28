// src/graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_ROUTINES = gql`
  query AllRoutines {
    allRoutines {
      id
      routineName
      imageUrl
      owner
      routineDifficulty
      routineMuscles {
        muscleID
        muscleName
      }
      exercises {
        id
        exerciseName
        exerciseImage
        exerciseTime
        exerciseSets
        exerciseReps
        muscularGroup {
          muscleID
          muscleName
        }
      }
    }
  }
`;

export const GET_ROUTINE = gql`
  query GetRoutine($id: ID!) {
    routine(id: $id) {
      id
      routineName
      imageUrl
      owner
      routineDifficulty
      routineMuscles {
        muscleID
        muscleName
      }
      exercises {
        id
        exerciseName
        exerciseImage
        exerciseTime
        exerciseSets
        exerciseReps
        muscularGroup {
          muscleID
          muscleName
        }
      }
    }
  }
`;