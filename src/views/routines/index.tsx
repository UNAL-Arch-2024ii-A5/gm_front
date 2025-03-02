import React from "react";
import RoutineList from "../../components/routines/RoutineList";

export const Routines = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Routines</h1>
      <RoutineList />
    </div>
  );
};

export default Routines;