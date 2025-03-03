import { gql } from '@apollo/client';

export const GET_ALL_MACHINES = gql`
  query {
    getAllMachines {
      id
      name
      description 
      state
      type
      lastService
      serviceInterval
    }
  }
`;