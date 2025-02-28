// src/views/exercise-guide/index.tsx
import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ROUTINES } from "../../graphql/routines/querys";
import { Routine } from "../../types/types";

const ExerciseGuide: React.FC = () => {
  const { routineId } = useParams<{ routineId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the routine from state if available
  const routineFromState = location.state?.routine as Routine | undefined;
  
  // Fallback to querying all routines if not in state
  const { loading, error, data } = useQuery(GET_ROUTINES, {
    skip: !!routineFromState
  });
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  
  // Find the routine either from state or from the fetched list
  let routine: Routine | undefined = routineFromState;
  
  if (!routine && data?.allRoutines) {
    routine = data.allRoutines.find((r: Routine) => r.id === routineId);
  }
  
  // Show loading state
  if (loading && !routine) return <p>Loading...</p>;
  
  // Show error state
  if (error && !routine) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Error Loading Routine</h2>
        <p className="text-red-500">{error.message}</p>
        <button 
          onClick={() => navigate("/rutinas")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Go Back to Routines
        </button>
      </div>
    );
  }
  
  // If we still don't have a routine, show an error
  if (!routine) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Routine Not Found</h2>
        <p>Could not find routine with ID: {routineId}</p>
        <button 
          onClick={() => navigate("/rutinas")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Go Back to Routines
        </button>
      </div>
    );
  }
  
  // Sort exercises by number of muscle groups (most to least)
  const sortedExercises = [...routine.exercises].sort(
    (a, b) => b.muscularGroup.length - a.muscularGroup.length
  );
  
  const currentExercise = sortedExercises[currentExerciseIndex];
  
  const handleNext = () => {
    if (currentExerciseIndex < sortedExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      // All exercises completed
      alert("¡Rutina completada!");
      navigate("/rutinas");
    }
  };
  
  const handleBack = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };
  
  const progress = ((currentExerciseIndex + 1) / sortedExercises.length) * 100;
  
  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">{routine.routineName}</h1>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-gray-600 mb-4">
        Exercise {currentExerciseIndex + 1} of {sortedExercises.length}
      </p>
      <div className="border rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-bold mb-2">{currentExercise.exerciseName}</h2>
        <img
          src={currentExercise.exerciseImage}
          alt={currentExercise.exerciseName}
          className="w-full h-56 object-cover rounded-md mb-4"
        />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-100 p-3 rounded-md">
            <p className="font-bold text-gray-700">Sets</p>
            <p className="text-2xl font-bold text-blue-600">{currentExercise.exerciseSets}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-md">
            <p className="font-bold text-gray-700">Reps</p>
            <p className="text-2xl font-bold text-blue-600">{currentExercise.exerciseReps}</p>
          </div>
        </div>
        <p className="text-gray-700 mb-2">Time: {currentExercise.exerciseTime} minutes</p>
        <p className="text-gray-700 mb-4">
          Targets: {currentExercise.muscularGroup.map(muscle => muscle.muscleName).join(", ")}
        </p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentExerciseIndex === 0}
          className={`px-4 py-2 rounded-lg transition ${
            currentExerciseIndex === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-500 text-white hover:bg-gray-600'
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {currentExerciseIndex < sortedExercises.length - 1 ? 'Next Exercise' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

export default ExerciseGuide;