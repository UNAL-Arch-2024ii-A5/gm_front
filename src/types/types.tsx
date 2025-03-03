// src/types/types.ts
export interface Muscle {
  muscleID: string;
  muscleName: string;
}

export interface Exercise {
  id: string;
  exerciseName: string;
  exerciseImage: string;
  exerciseTime: number;
  exerciseSets: number;
  exerciseReps: number;
  muscularGroup: Muscle[];
}

export interface Routine {
  id: string;
  routineName: string;
  imageUrl: string;
  owner: string;
  routineDifficulty: number;
  routineMuscles: Muscle[];
  exercises: Exercise[];
  routineExercises?: string[]; // This appears in the response but might not be needed in UI
  customerId?: string[];
}