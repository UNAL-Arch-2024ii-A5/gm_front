export interface Exercise {
  exercise_name: string;
  exercise_image: string;
  exercise_time: string;
  exercise_sets: number;
  exercise_reps: number;
  muscle_group: string[];
}

export interface Routine {
  imageUrl: string;
  name: string;
  owner: string;
  exercises: Exercise[];
  muscleGroups: string[];
}