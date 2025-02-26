import { useQuery, gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';

// Queries
const GET_ALL_SNAPSHOTS_USER = gql`
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

// Mutations
const CREATE_MACHINE = gql`
  mutation Mutation($name: String!, $description: String, $state: String, $type: String, $serviceInterval: Int) {
    createMachineMS(name: $name, description: $description, state: $state, type: $type, serviceInterval: $serviceInterval) {
      name
      state
      type
      lastService
      serviceInterval
    }
  }
`;
const DELETE_MACHINE = gql`
  mutation DeleteMachine($id: ID!) {
    deleteMachine(id: $id) {
      message
      statusCode
    }
  }
`;

// Form Types
type MachineForm = {
  name: string;
  description?: string;
  state?: string;
  type: string;
  lastService?: string;
  serviceInterval?: number;
};


export const Progress = () => {
  const { data, loading, error} = useQuery(GET_ALL_SNAPSHOTS_USER, {
    variables: { userId: 1 }, // Replace with dynamic user ID
  });

  const snapshots = data?.getAllSnapshotsUser
  ? [...data.getAllSnapshotsUser].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  : [];

  const latestSnapshot = snapshots[0] || null;
  const previousSnapshot = snapshots[1] || null;

  const getTrendArrow = (latest: number, previous: number) => {
    if (previous === undefined || previous === null) return ""; // No previous data
    if (latest > previous) return "▲";
    if (latest < previous) return "▼";
    return "➖"; // No change
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Último Registro</h1>
  
      {loading && <p>Cargando...</p>}
      {error && <p>Error al obtener datos: {error.message}</p>}
      {latestSnapshot ? (
        <div className="border border-gray-300 p-4 rounded-lg w-64">
          <h2 className="text-lg font-semibold">Fecha: {new Date(latestSnapshot.date).toLocaleDateString()}</h2>
          <ul className="mt-2">
            <li><strong>Peso:</strong> {latestSnapshot.weight} kg {getTrendArrow(latestSnapshot.weight, previousSnapshot?.weight)}</li>
            <li><strong>Altura:</strong> {latestSnapshot.height} cm {getTrendArrow(latestSnapshot.height, previousSnapshot?.height)}</li>
            <li><strong>Grasa Corporal:</strong> {latestSnapshot.bodyFatPercentage} % {getTrendArrow(latestSnapshot.bodyFatPercentage, previousSnapshot?.bodyFatPercentage)}</li>
            <li><strong>Cuello:</strong> {latestSnapshot.neck} cm {getTrendArrow(latestSnapshot.neck, previousSnapshot?.neck)}</li>
            <li><strong>Cintura:</strong> {latestSnapshot.waist} cm {getTrendArrow(latestSnapshot.waist, previousSnapshot?.waist)}</li>
            <li><strong>Cadera:</strong> {latestSnapshot.hip} cm {getTrendArrow(latestSnapshot.hip, previousSnapshot?.hip)}</li>
            <li><strong>Pecho:</strong> {latestSnapshot.chest} cm {getTrendArrow(latestSnapshot.chest, previousSnapshot?.chest)}</li>
            <li><strong>Brazo Izq.:</strong> {latestSnapshot.leftArm} cm {getTrendArrow(latestSnapshot.leftArm, previousSnapshot?.leftArm)}</li>
            <li><strong>Brazo Der.:</strong> {latestSnapshot.rightArm} cm {getTrendArrow(latestSnapshot.rightArm, previousSnapshot?.rightArm)}</li>
            <li><strong>Muslo Izq.:</strong> {latestSnapshot.leftThigh} cm {getTrendArrow(latestSnapshot.leftThigh, previousSnapshot?.leftThigh)}</li>
            <li><strong>Muslo Der.:</strong> {latestSnapshot.rightThigh} cm {getTrendArrow(latestSnapshot.rightThigh, previousSnapshot?.rightThigh)}</li>
            <li><strong>Gemelo Izq.:</strong> {latestSnapshot.leftCalf} cm {getTrendArrow(latestSnapshot.leftCalf, previousSnapshot?.leftCalf)}</li>
            <li><strong>Gemelo Der.:</strong> {latestSnapshot.rightCalf} cm {getTrendArrow(latestSnapshot.rightCalf, previousSnapshot?.rightCalf)}</li>
          </ul>
        </div>
      ) : (
        <p>No hay registros disponibles.</p>
      )}
    </div>
  );
  
};