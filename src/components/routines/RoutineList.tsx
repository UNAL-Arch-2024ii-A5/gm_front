import React from "react";
import { useQuery } from "@apollo/client";
import RoutineCard from "./RoutineCard";
import { Routine } from "../../types/types";
import { GET_ROUTINES } from "../../graphql/routines/querys";
import { useUserStore } from "stores/user-sesion";

const RoutineList: React.FC = () => {
  const { user } = useUserStore();
  console.log(user?._id);

  const { loading, error, data } = useQuery(GET_ROUTINES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const routines: Routine[] = data.allRoutines;
  console.log(routines);

  // Filter routines where user.id or user._id is in the customerId list
  const filteredRoutines = routines.filter(
    (routine) =>
      Array.isArray(routine.customerId) && 
      (routine.customerId.includes(user.id) || routine.customerId.includes(user._id))
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredRoutines.length > 0 ? (
        filteredRoutines.map((routine) => (
          <RoutineCard key={routine.id} routine={routine} />
        ))
      ) : (
        <p>No routines available for this user.</p>
      )}
    </div>
  );
};

export default RoutineList;


