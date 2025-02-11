import GymLogo from 'assets/gym-logo.png'
import { Link } from 'react-router-dom'
import { PRIVATE_LINK_ROUTES } from '../routers/routes'

export const SideNav = () => {
  return (
    <nav className="h-full w-80 shadow-lg min-w-80 flex flex-col px-3 py-6 gap-4">
      <div className="mb-2 flex h-14 items-center  gap-4">
          <img src={GymLogo} className="h-full w-auto" />
          <span className="text-sm ">GymMaster</span>
        </div>
      <Link to={PRIVATE_LINK_ROUTES.ROUTINES} className="flex items-center gap-2">
        <span className="material-symbols-outlined">exercise</span>Mis Rutinas
      </Link>
      <Link to={PRIVATE_LINK_ROUTES.PROGRESS} className="flex items-center gap-2">
        {' '}
        <span className="material-symbols-outlined">self_improvement</span>Mi
        Progreso
      </Link>
      <Link to={PRIVATE_LINK_ROUTES.MONITORING} className="flex items-center gap-2">
        <span className="material-symbols-outlined">browse_activity</span>
        Monitoreo
      </Link>
      <Link to={PRIVATE_LINK_ROUTES.MACHINES} className="flex items-center gap-2">
        <span className="material-symbols-outlined">construction</span>{' '}
        Administrar equipos
      </Link>
    </nav>
  )
}
