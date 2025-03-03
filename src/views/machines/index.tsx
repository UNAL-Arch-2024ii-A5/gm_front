import { useQuery, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import {CREATE_MACHINE, DELETE_MACHINE} from '../../graphql/machines/mutations'
import {GET_ALL_MACHINES} from '../../graphql/machines/query'


// Form Types
type MachineForm = {
  name: string;
  description: string;
  state: string;
  type: string;
  lastService: string;
  serviceInterval: string;
};

export const Machines = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_MACHINES);
  const [createMachine, { data: mutationEvent, loading: loadingMutation, error: errorMutation }] = useMutation(CREATE_MACHINE);
  const [deleteMachine] = useMutation(DELETE_MACHINE);


  const { register, handleSubmit, reset } = useForm<MachineForm>();

  // Handle Machine Creation
  const onSubmit = async (formState: MachineForm) => {
    console.log(formState);
    const result = await createMachine({ variables: { 
      name:formState.name,
      description:formState.description,
      state:formState.state,
      type:formState.type,
      serviceInterval:parseInt(formState.serviceInterval)
    } });
    console.log(result);
    refetch();
    reset();
  };

  // Handle Machine Deletion
  const handleDelete = async (id: string) => {
    console.log(id)
    if (window.confirm("¿Estás seguro de que quieres eliminar esta máquina?")) {
      const result =await deleteMachine({ variables: { deleteMachineId:id } });
      console.log(result)
    }
    refetch();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Maquinas</h1>

      {/* Loading/Error States */}
      {loading && <p>Cargando...</p>}
      {error && <p>Error al obtener datos: {error.message}</p>}
      <button onClick={refetch}>Re cargar eventos</button>
      {/* Machines List */}
      {data && (
        <table className="w-full border-collapse border border-gray-300 mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Id</th>
              <th className="border px-4 py-2">estado</th>
              <th className="border px-4 py-2">tipo</th>
              <th className="border px-4 py-2">Ultimo mantenimiento</th>
              <th className="border px-4 py-2">Periodicidad mantenimiento</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.getAllMachines.map((machine: any) => (
              <tr key={machine.id} className="border">
                <td className="border px-4 py-2">{machine.id}</td>
                <td className="border px-4 py-2">{machine.name}</td>
                <td className="border px-4 py-2">{machine.state}</td>
                <td className="border px-4 py-2">{machine.type}</td>
                <td className="border px-4 py-2">{machine.lastService}</td>
                <td className="border px-4 py-2">{machine.serviceInterval}</td>
                <td className="border px-4 py-2">
                  <button 
                    onClick={() => handleDelete(machine.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Create Machine Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-lg font-semibold">Crear Maquina Nueva</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <input className="border p-2 rounded-md" placeholder="Nombre" {...register("name", { required: true })} />
          <input className="border p-2 rounded-md" placeholder="Tipo" {...register("type", { required: true })} />
          <input className="border p-2 rounded-md" placeholder="Estado" {...register("state")} />
          <input className="border p-2 rounded-md" placeholder="Periodicidad Mantenimientos (días)" type="number" {...register("serviceInterval")} />
          <textarea className="border p-2 col-span-2 rounded-md" placeholder="Descripción" {...register("description")} />
        </div>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Create Machine</button>
      </form>
    </div>
  );
};