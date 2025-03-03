// src/views/ManagementView.tsx
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Exercise, Routine, Muscle } from '../../types/types';

// GraphQL Queries
const GET_ALL_EXERCISES = gql`
  query GetAllExercises {
    allExercises {
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
`;

const GET_ALL_ROUTINES = gql`
  query GetAllRoutines {
    allRoutines {
      id
      routineName
      routineDifficulty
      routineExercises
      routineMuscles {
        muscleID
        muscleName
      }
      imageUrl
      owner
      exercises {
        id
        exerciseName
      }
      customerId
    }
  }
`;

// GraphQL Mutations for Exercises
const CREATE_EXERCISE = gql`
  mutation CreateExercise($exerciseName: String!, $muscularGroup: [MuscularGroupInput!]!) {
    createExercise(exerciseName: $exerciseName, muscularGroup: $muscularGroup) {
      id
      exerciseName
      muscularGroup {
        muscleID
        muscleName
      }
    }
  }
`;

const UPDATE_EXERCISE = gql`
  mutation UpdateExercise($id: ID!, $exerciseName: String!, $muscularGroup: [MuscularGroupInput!]!) {
    updateExercise(id: $id, exerciseName: $exerciseName, muscularGroup: $muscularGroup) {
      id
      exerciseName
      muscularGroup {
        muscleID
        muscleName
      }
    }
  }
`;

const DELETE_EXERCISE = gql`
  mutation DeleteExercise($id: ID!) {
    deleteExercise(id: $id)
  }
`;

// GraphQL Mutations for Routines
const CREATE_ROUTINE = gql`
  mutation CreateRoutine($routineName: String!, $routineDifficulty: Int!, $routineExercises: [ID!]!, $customerId: [ID]) {
    createRoutine(routineName: $routineName, routineDifficulty: $routineDifficulty, routineExercises: $routineExercises, customerId: $customerId) {
      id
      routineName
      routineDifficulty
      routineExercises
      customerId
    }
  }
`;

const UPDATE_ROUTINE = gql`
  mutation UpdateRoutine($id: ID!, $routineName: String!, $routineDifficulty: Int!, $routineExercises: [ID!]!, $customerId: [ID]) {
    updateRoutine(id: $id, routineName: $routineName, routineDifficulty: $routineDifficulty, routineExercises: $routineExercises, customerId: $customerId) {
      id
      routineName
      routineDifficulty
      routineExercises
      customerId
    }
  }
`;

const DELETE_ROUTINE = gql`
  mutation DeleteRoutine($id: ID!) {
    deleteRoutine(id: $id)
  }
`;

// Common predefined muscles for the application
const COMMON_MUSCLES: Muscle[] = [
  { muscleID: "1", muscleName: "Chest" },
  { muscleID: "2", muscleName: "Back" },
  { muscleID: "3", muscleName: "Shoulders" },
  { muscleID: "4", muscleName: "Biceps" },
  { muscleID: "5", muscleName: "Triceps" },
  { muscleID: "6", muscleName: "Legs" },
  { muscleID: "7", muscleName: "Abs" },
  { muscleID: "8", muscleName: "Calves" }
];

const ManageRoutines: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<'exercises' | 'routines'>('exercises');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manejo de Ejercicios y Rutinas</h1>
      
      <div className="flex mb-4">
        <button 
          className={`px-4 py-2 mr-2 rounded ${activeTab === 'exercises' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('exercises')}
        >
          Administrar Ejercicios
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'routines' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('routines')}
        >
          Administrar Rutinas
        </button>
      </div>

      {activeTab === 'exercises' ? <ExerciseManagement /> : <RoutineManagement />}
    </div>
  );
};

// Exercise Management Component
const ExerciseManagement: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  
  // Form state
  const [exerciseName, setExerciseName] = useState('');
  const [selectedMuscles, setSelectedMuscles] = useState<Muscle[]>([]);
  
  // GraphQL operations
  const { loading, error, data, refetch } = useQuery(GET_ALL_EXERCISES);
  
  const [createExercise] = useMutation(CREATE_EXERCISE, {
    onCompleted: () => {
      refetch();
      resetForm();
      setModalOpen(false);
    }
  });
  
  const [updateExercise] = useMutation(UPDATE_EXERCISE, {
    onCompleted: () => {
      refetch();
      resetForm();
      setModalOpen(false);
    }
  });
  
  const [deleteExercise] = useMutation(DELETE_EXERCISE, {
    onCompleted: () => {
      refetch();
    }
  });
  
  // Effects
  useEffect(() => {
    if (data?.allExercises) {
      setExercises(data.allExercises);
    }
  }, [data]);
  
  // Functions
  const resetForm = () => {
    setExerciseName('');
    setSelectedMuscles([]);
    setSelectedExercise(null);
  };
  
  const openCreateModal = () => {
    resetForm();
    setFormMode('create');
    setModalOpen(true);
  };
  
  const openEditModal = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setExerciseName(exercise.exerciseName);
    setSelectedMuscles(exercise.muscularGroup || []);
    setFormMode('edit');
    setModalOpen(true);
  };
  
  const handleSaveExercise = (e: React.FormEvent) => {
    e.preventDefault();
    
    const muscularGroup = selectedMuscles.map(muscle => ({
      muscleID: muscle.muscleID,
      muscleName: muscle.muscleName
    }));
    
    if (formMode === 'create') {
      createExercise({ 
        variables: { 
          exerciseName, 
          muscularGroup 
        } 
      });
    } else {
      updateExercise({ 
        variables: { 
          id: selectedExercise?.id, 
          exerciseName, 
          muscularGroup 
        } 
      });
    }
  };
  
  const handleDeleteExercise = (id: string) => {
    if (window.confirm('Seguro que deseas eliminar este ejercicio?')) {
      deleteExercise({ variables: { id } });
    }
  };
  
  const handleToggleMuscle = (muscle: Muscle) => {
    if (selectedMuscles.some(m => m.muscleID === muscle.muscleID)) {
      setSelectedMuscles(selectedMuscles.filter(m => m.muscleID !== muscle.muscleID));
    } else {
      setSelectedMuscles([...selectedMuscles, muscle]);
    }
  };
  
  if (loading) return <p>Cargando Ejercicios...</p>;
  if (error) return <p>Error cargando los ejercicios: {error.message}</p>;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Administración de ejercicios</h2>
        <button 
          onClick={openCreateModal}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Añadir nuevo ejercicio
        </button>
      </div>
      
      {/* Exercise List */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Musculos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exercises.map((exercise) => (
              <tr key={exercise.id}>
                <td className="px-6 py-4 whitespace-nowrap">{exercise.exerciseName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {exercise.muscularGroup?.map(muscle => muscle.muscleName).join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => openEditModal(exercise)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDeleteExercise(exercise.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Exercise Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {formMode === 'create' ? 'Create New Exercise' : 'Edit Exercise'}
            </h2>
            
            <form onSubmit={handleSaveExercise}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nombre Ejercicio
                </label>
                <input 
                  type="text"
                  value={exerciseName}
                  onChange={(e) => setExerciseName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Musculo
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {COMMON_MUSCLES.map(muscle => (
                    <div key={muscle.muscleID} className="flex items-center">
                      <input 
                        type="checkbox"
                        id={`muscle-${muscle.muscleID}`}
                        checked={selectedMuscles.some(m => m.muscleID === muscle.muscleID)}
                        onChange={() => handleToggleMuscle(muscle)}
                        className="mr-2"
                      />
                      <label htmlFor={`muscle-${muscle.muscleID}`}>
                        {muscle.muscleName}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Routine Management Component
const RoutineManagement: React.FC = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  
  // Form state
  const [routineName, setRoutineName] = useState('');
  const [routineDifficulty, setRoutineDifficulty] = useState(1);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [customerIds, setCustomerIds] = useState<string[]>([]);
  const [customerId, setCustomerId] = useState('');
  
  // GraphQL operations
  const { loading: loadingRoutines, error: routinesError, data: routinesData, refetch: refetchRoutines } = useQuery(GET_ALL_ROUTINES);
  const { loading: loadingExercises, error: exercisesError, data: exercisesData } = useQuery(GET_ALL_EXERCISES);
  
  const [createRoutine] = useMutation(CREATE_ROUTINE, {
    onCompleted: () => {
      refetchRoutines();
      resetForm();
      setModalOpen(false);
    }
  });
  
  const [updateRoutine] = useMutation(UPDATE_ROUTINE, {
    onCompleted: () => {
      refetchRoutines();
      resetForm();
      setModalOpen(false);
    }
  });
  
  const [deleteRoutine] = useMutation(DELETE_ROUTINE, {
    onCompleted: () => {
      refetchRoutines();
    }
  });
  
  // Effects
  useEffect(() => {
    if (routinesData?.allRoutines) {
      setRoutines(routinesData.allRoutines);
    }
  }, [routinesData]);
  
  // Functions
  const resetForm = () => {
    setRoutineName('');
    setRoutineDifficulty(1);
    setSelectedExercises([]);
    setCustomerIds([]);
    setCustomerId('');
    setSelectedRoutine(null);
  };
  
  const openCreateModal = () => {
    resetForm();
    setFormMode('create');
    setModalOpen(true);
  };
  
  const openEditModal = (routine: Routine) => {
    setSelectedRoutine(routine);
    setRoutineName(routine.routineName);
    setRoutineDifficulty(routine.routineDifficulty);
    setSelectedExercises(routine.routineExercises || []);
    setCustomerIds(routine.customerId || []);
    setFormMode('edit');
    setModalOpen(true);
  };
  
  const handleSaveRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formMode === 'create') {
      createRoutine({ 
        variables: { 
          routineName, 
          routineDifficulty: parseInt(routineDifficulty.toString(), 10), 
          routineExercises: selectedExercises,
          customerId: customerIds
        } 
      });
    } else {
      updateRoutine({ 
        variables: { 
          id: selectedRoutine?.id, 
          routineName, 
          routineDifficulty: parseInt(routineDifficulty.toString(), 10), 
          routineExercises: selectedExercises,
          customerId: customerIds
        } 
      });
    }
  };
  
  const handleDeleteRoutine = (id: string) => {
    if (window.confirm('Seguro que deseas eliminar esta rutina?')) {
      deleteRoutine({ variables: { id } });
    }
  };
  
  const handleToggleExercise = (exerciseId: string) => {
    if (selectedExercises.includes(exerciseId)) {
      setSelectedExercises(selectedExercises.filter(id => id !== exerciseId));
    } else {
      setSelectedExercises([...selectedExercises, exerciseId]);
    }
  };

  const handleAddCustomerId = () => {
    if (customerId && !customerIds.includes(customerId)) {
      setCustomerIds([...customerIds, customerId]);
      setCustomerId('');
    }
  };

  const handleRemoveCustomerId = (id: string) => {
    setCustomerIds(customerIds.filter(customerId => customerId !== id));
  };
  
  if (loadingRoutines || loadingExercises) return <p>Cargando datos...</p>;
  if (routinesError) return <p>Error cargando rutina: {routinesError.message}</p>;
  if (exercisesError) return <p>Error cargando ejercicios: {exercisesError.message}</p>;
  
  const availableExercises = exercisesData?.allExercises || [];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Administracion de rutina</h2>
        <button 
          onClick={openCreateModal}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Añadir nueva rutina
        </button>
      </div>
      
      {/* Routine List */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dificultad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ejercicio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clientes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {routines.map((routine) => (
              <tr key={routine.id}>
                <td className="px-6 py-4 whitespace-nowrap">{routine.routineName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{routine.routineDifficulty}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {routine.exercises?.length || routine.routineExercises?.length || 0} Ejercicios
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {routine.customerId?.length || 0} Clientes
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => openEditModal(routine)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDeleteRoutine(routine.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Routine Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {formMode === 'create' ? 'Create New Routine' : 'Edit Routine'}
            </h2>
            
            <form onSubmit={handleSaveRoutine}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nombre de rutina
                </label>
                <input 
                  type="text"
                  value={routineName}
                  onChange={(e) => setRoutineName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Dificultad (1-5)
                </label>
                <input 
                  type="number"
                  min="1"
                  max="5"
                  value={routineDifficulty}
                  onChange={(e) => setRoutineDifficulty(parseInt(e.target.value, 10))}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Ejercicios
                </label>
                <div className="max-h-40 overflow-y-auto border rounded p-2">
                  {availableExercises.map((exercise: Exercise) => (
                    <div key={exercise.id} className="flex items-center mb-1">
                      <input 
                        type="checkbox"
                        id={`exercise-${exercise.id}`}
                        checked={selectedExercises.includes(exercise.id)}
                        onChange={() => handleToggleExercise(exercise.id)}
                        className="mr-2"
                      />
                      <label htmlFor={`exercise-${exercise.id}`}>
                        {exercise.exerciseName}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Clientes IDs
                </label>
                <div className="flex mb-2">
                  <input 
                    type="text"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter customer ID"
                  />
                  <button 
                    type="button"
                    onClick={handleAddCustomerId}
                    className="ml-2 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                  >
                    Añadir
                  </button>
                </div>
                <div className="border rounded p-2">
                  {customerIds.length === 0 ? (
                    <p className="text-gray-500 text-sm">No se asigno a clientes</p>
                  ) : (
                    <ul>
                      {customerIds.map(id => (
                        <li key={id} className="flex justify-between items-center mb-1">
                          <span>{id}</span>
                          <button 
                            type="button"
                            onClick={() => handleRemoveCustomerId(id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Quitar
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRoutines;