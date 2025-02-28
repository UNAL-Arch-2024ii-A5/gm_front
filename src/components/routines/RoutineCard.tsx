// src/components/routines/RoutineCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Routine } from "../../types/types";

const RoutineCard: React.FC<{ routine: Routine }> = ({ routine }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    console.log(`Iniciando rutina: ${routine.name}`);
    // Navigate to the exercise guide page with the routine data
    navigate(`/exercise-guide/${encodeURIComponent(routine.name)}`, { 
      state: { routine } 
    });
  };

  // Extract all muscle groups from exercises for display
  const allMuscleGroups = routine.exercises
    .flatMap(ex => ex.muscle_group)
    .filter((value, index, self) => self.indexOf(value) === index)
    .join(", ");

  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col items-center">
      <img src={routine.imageUrl} alt={routine.name} className="w-full h-40 object-cover rounded-md" />
      <h2 className="text-lg font-bold mt-2">{routine.name}</h2>
      <p className="text-gray-600">Owner: {routine.owner}</p>
      <p className="text-sm text-gray-500">Muscle Groups: {allMuscleGroups}</p>
      <ul className="mt-2">
        {routine.exercises.map((exercise, index) => (
          <li key={index} className="text-sm text-gray-700">• {exercise.exercise_name}</li>
        ))}
      </ul>
      <button
        onClick={handleStart}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Iniciar
      </button>
    </div>
  );
};

export default RoutineCard;