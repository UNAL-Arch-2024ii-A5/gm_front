import { gql } from '@apollo/client';

export const CREATE_MACHINE = gql`
  mutation Mutation($name: String!, $description: String, $state: String, $type: String, $serviceInterval: Int) {
  createMachineMS(name: $name, description: $description, state: $state, type: $type, serviceInterval: $serviceInterval) {
    id
  }
}
`;

export const DELETE_MACHINE = gql`
  mutation DeleteMachine($deleteMachineId: ID!) {
  deleteMachine(id: $deleteMachineId) {
    message
  }
}
`;
