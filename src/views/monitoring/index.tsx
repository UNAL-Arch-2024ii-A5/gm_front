import { useQuery, gql, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'

// Definir la query que quieren hacer (Creo que la puede compiar directo de Apolo)
const MONITORING_EVENTS_QUERY = gql`
  {
    allMonitoringEvents {
      _id
      name
      machineID
      startDate
      endDate
      userID
    }
  }
`

export const GET_ALL_MACHINE_TYPES = gql`
  query {
    getAllTypes {
      types
    }
  }
`

const CREATE_EVENT = gql`
  mutation CreateMonitoringEvent($input: MonitoringInput) {
    createMonitoringEvent(input: $input) {
      name
    }
  }
`

type NewEvent = {
  name: string
  machineID: string
  userID: string
}

export const Monitoring = () => {
  // useQuery(<la query>) hace el get tan pronto se carga este componente.
  const { data, loading, error, refetch } = useQuery(MONITORING_EVENTS_QUERY)
  // Pass mutation to useMutation
  const [
    createEvent,
    { data: mutationEvent, loading: loadingMutation, error: errorMutation },
  ] = useMutation(CREATE_EVENT)

  // Manejo del fomulario usando React-hook-form
  const { register, handleSubmit } = useForm<NewEvent>()

  // Esta es la función que se invoca cuando se hace submit del form
  const onSubmit = async (formState: NewEvent) => {
    console.log(formState)
    const result = await createEvent({ variables: { input: formState } })
    console.log(result)

    // En la línea 37 puede ver que se declaran también las variables:
    // mutationEvent, loadingMutation, errorMutation
    // que guardan automáticamente el resultado de la operación, si está cargando o si hubo error
  }

  console.log(data)

  return (
    <div>
      <h1>Monitoring</h1>
      <p>
        En este archivo (src/views/monitoring) hay un ejemplo de como hacer una
        llamada al api usando graphQL
      </p>
      {loading && <p>CARGANDO....</p>}
      {error && <p>Error realiazando la query: {error.message}</p>}
      {data && (
        <table className="my-5">
          {data.allMonitoringEvents.map((item: NewEvent) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.machineID}</td>
              <td>{item.userID}</td>
            </tr>
          ))}
        </table>
      )}
      <button onClick={refetch}>Re cargar eventos</button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 my-4 px-4"
      >
        <h2>Crear un evento nuevo</h2>
        <div className="flex flex-wrap p-4 gap-4 bg-gray-200 rounded-lg ">
          <label className="w-1/3 flex-col flex">
            Nombre del evento
            <input
              type="text"
              placeholder="Nombre del evento"
              {...register('name')}
              className="bg-neutral-50 rounded-sm mt-1"
            />
          </label>
          <label className="w-1/2 flex-col flex">
            MachineID
            <input
              type="text"
              readOnly
              defaultValue={'6348acd2e1a47ca32e79f46f'}
              placeholder="MachineID"
              {...register('machineID')}
              className="bg-neutral-50 rounded-sm mt-1"
            />
          </label>
          <label className="w-1/2 flex-col flex">
            UserID
            <input
              type="text"
              readOnly
              defaultValue={'6348acd2e1a47ca32e79f46f'}
              placeholder="UserID"
              {...register('userID')}
              className="bg-neutral-50 rounded-sm mt-1"
            />
          </label>
        </div>
        <button className="self-end border-1 border-neutral-950 bg-neutral-100 px-3 py-2 rounded-sm">
          Crear evento
        </button>
      </form>
    </div>
  )
}
