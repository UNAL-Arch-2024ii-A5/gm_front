import { Route, Routes } from 'react-router-dom'
import { PRIVATE_ROUTES } from './routes'
import ManageRoutines from '../views/routinesCRUD/ManageRoutines'
import {
  Home,
  Machines,
  Monitoring,
  Progress,
  Routines,
  Users,
  Profile,
} from '../views'
import ExerciseGuide from '../views/exercises/index'
import { AvailableMachines } from 'views/availlable-machines'

export const PrivateRouter = () => {
  return (
    <Routes>
      <Route path={PRIVATE_ROUTES.HOME} element={<Home />}>
        <Route path={PRIVATE_ROUTES.MACHINES} element={<Machines />} />
        <Route path={PRIVATE_ROUTES.MONITORING} element={<Monitoring />} />
        <Route
          path={PRIVATE_ROUTES.AVAILABLE_MANCHINES}
          element={<AvailableMachines />}
        />
        <Route path={PRIVATE_ROUTES.PROGRESS} element={<Progress />} />
        <Route path={PRIVATE_ROUTES.ROUTINES} element={<Routines />} />
        <Route
          path={PRIVATE_ROUTES.ROUTINESMANAGE}
          element={<ManageRoutines />}
        />
        <Route path={PRIVATE_ROUTES.USERS} element={<Users />} />
        <Route path={PRIVATE_ROUTES.PROFILE} element={<Profile />} />
        <Route path="/exercise-guide/:routineId" element={<ExerciseGuide />} />
      </Route>
    </Routes>
  )
}
