import { Route, Routes } from "react-router-dom"
import { PUBLIC_ROUTES } from "./routes"
import { Login } from "../views"
import { Register} from "../views"
import { ForgotPassword} from "../views"
import { Home } from "views/home"
import { ForgotPasswordP} from "../views/forgot-passwordP" 

export const PublicRouter = () => {
  return (
    <Routes>
      <Route path={PUBLIC_ROUTES.LOGIN} element={<Login />}/>
      <Route path={PUBLIC_ROUTES.REGISTER} element={<Register />}/>
      <Route path={PUBLIC_ROUTES.FORGOT} element={<ForgotPassword />}/>
      <Route path={PUBLIC_ROUTES.FORGOTP} element={<ForgotPasswordP />}/>
      <Route path={PUBLIC_ROUTES.HOME} element={<Home />}/>

    </Routes>
  )
}