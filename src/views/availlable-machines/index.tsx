import { useQuery, gql, useMutation } from '@apollo/client'
import { Images } from 'assets/index'
import { useEffect, useMemo } from 'react'

export const GET_ALL_MACHINE_AVAILABILITY = gql`
  query {
    banco: getMachinesByType(type: "banco") {
      id
      name
      description
      state
      lastService
      serviceInterval
      type
    }
    bicicleta: getMachinesByType(type: "bicicleta") {
      id
      name
      description
      state
      lastService
      serviceInterval
      type
    }
    caminadora: getMachinesByType(type: "caminadora") {
      id
      name
      description
      state
      lastService
      serviceInterval
      type
    }
    cardio: getMachinesByType(type: "cardio") {
      id
      name
      description
      state
      lastService
      serviceInterval
      type
    }
    eliptica: getMachinesByType(type: "elíptica") {
      id
      name
      description
      state
      lastService
      serviceInterval
      type
    }
    multiuso: getMachinesByType(type: "multiuso") {
      id
      name
      description
      state
      lastService
      serviceInterval
      type
    }
    pesas: getMachinesByType(type: "pesas") {
      id
      name
      description
      state
      lastService
      serviceInterval
      type
    }
    remo: getMachinesByType(type: "remo") {
      id
      name
      description
      state
      lastService
      serviceInterval
      type
    }
  }
`

const USE_CAMINADORA = gql`
  mutation UpdateUseMachine($updateUseMachineId: ID!) {
    updateUseMachine(id: $updateUseMachineId)
  }
`
const buildItem = (data: any) => {
  const items = []
  for (const machineType in data) {
    const available = data[machineType].reduce(
      (accomulator, machine) =>
        machine.state === 'Disponible' ? accomulator + 1 : accomulator,
      0,
    )

    items.push({
      amount: data[machineType].length,
      type: machineType,
      available,
    })
  }
  return items
}

export const AvailableMachines = () => {
  // useQuery(<la query>) hace el get tan pronto se carga este componente.
  const { data, loading, error, refetch } = useQuery(
    GET_ALL_MACHINE_AVAILABILITY,
  )
  const [
    useCaminadora,
    { data: mutationEvent, loading: loadingMutation, error: errorMutation },
  ] = useMutation(USE_CAMINADORA)

  const parsedMachines = useMemo(() => (data ? buildItem(data) : []), [data])

  useEffect(() => {
    if (data) console.log(buildItem(data))
  }, [data])

  if (loading)
    return (
      <div>
        <h1 className="text-4xl font-bold">Cargando</h1>
      </div>
    )

  return (
    <div>
      <h1 className="text-4xl font-bold mb-16">Disponibilidad de máquinas</h1>
      <div className="flex py-3 px-4 gap-6 justify-center flex-wrap max-w-[50rem] mx-auto">
        {parsedMachines.map(item => (
          <div
            className="min-w-24 px-3 py-4 border-1 border-fuchsia-700 shadow flex align-middle justify-center flex-col rounded-xl"
            key={item.type}
          >
            <img
              className="w-40 h-40 aspect-square object-cover"
              src={Images[item.type]}
            />
            <span className="text-center">{item.type.toUpperCase()}</span>
            <span className="text-center">{`Disponibles: ${item.available}/${item.amount}`}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center py-20">
        <button
          className="rounded-xl p-3 border-1 border-fuchsia-600 hover:bg-fuchsia-300"
          onClick={() =>
            useCaminadora({ variables: { updateUseMachineId: '1' } })
          }
        >
          Usar caminadora 1
        </button>
      </div>
    </div>
  )
}
