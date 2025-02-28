// src/components/routines/RoutineList.tsx
import React, { useEffect, useState } from "react";
import RoutineCard from "./RoutineCard";
import { Routine } from "../../types/types";

const fakeRoutines: Routine[] = [
  {
    imageUrl: "https://via.placeholder.com/300",
    name: "Full Body Blast",
    owner: "John Doe",
    muscleGroups: ["Legs", "Chest", "Back"],
    exercises: [
      {
        exercise_name: "Squats",
        exercise_image: "https://via.placeholder.com/300",
        exercise_time: "10 minutos",
        exercise_sets: 5,
        exercise_reps: 5,
        muscle_group: ["abs", "back", "legs"]
      },
      {
        exercise_name: "Push-Ups",
        exercise_image: "https://via.placeholder.com/300",
        exercise_time: "15 minutos",
        exercise_sets: 3,
        exercise_reps: 2,
        muscle_group: ["chest"]
      },
      {
        exercise_name: "Pull-ups",
        exercise_image: "https://via.placeholder.com/300",
        exercise_time: "20 minutos",
        exercise_sets: 2,
        exercise_reps: 10,
        muscle_group: ["upper back", "lower back"]
      }
    ]
  },
  {
    imageUrl: "https://via.placeholder.com/300",
    name: "Upper Body Strength",
    owner: "Jane Smith",
    muscleGroups: ["Chest", "Shoulders", "Arms"],
    exercises: [
      {
        exercise_name: "Bench Press",
        exercise_image: "https://via.placeholder.com/300",
        exercise_time: "12 minutos",
        exercise_sets: 4,
        exercise_reps: 8,
        muscle_group: ["chest", "shoulders", "triceps"]
      },
      {
        exercise_name: "Overhead Press",
        exercise_image: "https://via.placeholder.com/300",
        exercise_time: "10 minutos",
        exercise_sets: 3,
        exercise_reps: 10,
        muscle_group: ["shoulders", "triceps"]
      },
      {
        exercise_name: "Bicep Curls",
        exercise_image: "https://via.placeholder.com/300",
        exercise_time: "8 minutos",
        exercise_sets: 3,
        exercise_reps: 12,
        muscle_group: ["biceps"]
      }
    ]
  },
  {
    imageUrl: "https://via.placeholder.com/300",
    name: "Leg Day",
    owner: "Mike Johnson",
    muscleGroups: ["Legs", "Glutes"],
    exercises: [
      {
        exercise_name: "Squats",
        exercise_image: "https://via.placeholder.com/300",
        exercise_time: "15 minutos",
        exercise_sets: 4,
        exercise_reps: 10,
        muscle_group: ["quads", "glutes", "hamstrings"]
      },
      {
        exercise_name: "Lunges",
        exercise_image: "https://via.placeholder.com/300",
        exercise_time: "12 minutos",
        exercise_sets: 3,
        exercise_reps: 12,
        muscle_group: ["quads", "glutes"]
      },
      {
        exercise_name: "Calf Raises",
        exercise_image: "https://via.placeholder.com/300",
        exercise_time: "8 minutos",
        exercise_sets: 3,
        exercise_reps: 15,
        muscle_group: ["calves"]
      }
    ]
  }
];

const RoutineList: React.FC = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setRoutines(fakeRoutines);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {routines.map((routine, index) => (
        <RoutineCard key={index} routine={routine} />
      ))}
    </div>
  );
};

export default RoutineList;