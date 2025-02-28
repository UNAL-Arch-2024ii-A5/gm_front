// src/components/routines/RoutineList.tsx
import React from "react";
import { useQuery } from "@apollo/client";
import RoutineCard from "./RoutineCard";
import { Routine } from "../../types/types";
import { GET_ROUTINES } from "../../graphql/routines/querys";

const RoutineList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ROUTINES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const routines: Routine[] = data.allRoutines;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {routines.map((routine) => (
        <RoutineCard key={routine.id} routine={routine} />
      ))}
    </div>
  );
};

export default RoutineList;