import { Route, Routes } from "react-router-dom"
import { PUBLIC_ROUTES } from "./routes"
import { Login } from "../views"

export const PublicRouter = () => {
  return (
    <Routes>
      <Route path={PUBLIC_ROUTES.LOGIN} element={<Login />}/>
    </Routes>
  )
}