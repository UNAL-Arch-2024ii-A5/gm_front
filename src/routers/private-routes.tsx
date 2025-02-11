import { Route, Routes } from "react-router-dom"
import { PRIVATE_ROUTES } from "./routes"
import { Home, Machines, Monitoring, Progress, Routines } from "../views"

export const PrivateRouter = () => {
  return (
    <Routes>
      <Route path={PRIVATE_ROUTES.HOME} element={<Home />}>
        <Route path={PRIVATE_ROUTES.MACHINES} element={<Machines />} />
        <Route path={PRIVATE_ROUTES.MONITORING} element={<Monitoring />} />
        <Route path={PRIVATE_ROUTES.PROGRESS} element={<Progress />} />
        <Route path={PRIVATE_ROUTES.ROUTINES} element={<Routines />} />
      </Route>
    </Routes>
  )
}