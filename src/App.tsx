import './App.css'
import { useUserStore } from './stores/user-sesion'
import { PrivateRouter } from './routers/private-routes'
import { PublicRouter } from './routers/public-routes'

import { Navigate, useLocation } from 'react-router-dom'
import { PUBLIC_ROUTES } from 'routers/routes'

const App = () => {
  const { user } = useUserStore()
  const location = useLocation()

  if (
    !user &&
    location.pathname !== PUBLIC_ROUTES.LOGIN &&
    location.pathname !== PUBLIC_ROUTES.REGISTER &&
    location.pathname !== PUBLIC_ROUTES.FORGOT &&
    location.pathname !== PUBLIC_ROUTES.FORGOTP
  )
    return <Navigate to={PUBLIC_ROUTES.LOGIN} replace={true} />

  return (
    <div className="h-full w-full">
      {user ? <PrivateRouter /> : <PublicRouter />}
    </div>
  )
}

export default App
