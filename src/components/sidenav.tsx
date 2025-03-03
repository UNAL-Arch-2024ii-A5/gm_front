import GymLogo from 'assets/gym-logo.png';
import { Link } from 'react-router-dom';
import { PRIVATE_LINK_ROUTES } from '../routers/routes';
import { useState, useEffect } from 'react';
import { decodeToken } from '../utils/auth';

export const SideNav = () => {
  const [role, setRole] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false); // Estado para colapsar

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const userData = decodeToken(token);
      if (userData) {
        setRole(userData.role);
      }
    }
  }, []);

  return (
    <nav className={`h-full ${isCollapsed ? "w-20" : "w-80"} fixed left-0 top-0 bg-white shadow-lg flex flex-col px-4 py-6 gap-4 transition-all duration-300`}>
      
      {/* Botón para colapsar/expandir */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)} 
        className="self-end p-1 mb-4 rounded-lg hover:bg-gray-200 transition"
      >
        <span className="material-symbols-outlined">{isCollapsed ? "chevron_right" : "chevron_left"}</span>
      </button>

      <div className="mb-2 flex h-14 items-center gap-4">
        <img src={GymLogo} className={`h-full w-auto ${isCollapsed ? "hidden" : "block"}`} />
        {!isCollapsed && <span className="text-sm font-bold">GymMaster</span>}
      </div>

      {/* Enlaces */}
      <Link to={PRIVATE_LINK_ROUTES.ROUTINES} className="flex items-center gap-2">
        <span className="material-symbols-outlined">exercise</span>{!isCollapsed && "Mis Rutinas"}
      </Link>
      <Link to={PRIVATE_LINK_ROUTES.PROGRESS} className="flex items-center gap-2">
        <span className="material-symbols-outlined">self_improvement</span>{!isCollapsed && "Mi Progreso"}
      </Link>
      <Link to={PRIVATE_LINK_ROUTES.MONITORING} className="flex items-center gap-2">
        <span className="material-symbols-outlined">browse_activity</span>{!isCollapsed && "Monitoreo"}
      </Link>
      <Link to={PRIVATE_LINK_ROUTES.MACHINES} className="flex items-center gap-2">
        <span className="material-symbols-outlined">construction</span>{!isCollapsed && "Administrar equipos"}
      </Link>

      {/* 🛠 Opciones solo para ADMIN */}
      {role === "admin" && (
        <div className="mt-4">
          <span className={`text-sm font-bold text-gray-600 ${isCollapsed ? "hidden" : "block"}`}>Administración</span>

          <div className="flex flex-col pl-4">
            <details className="cursor-pointer">
              <summary className="flex items-center gap-2 text-gray-700">
                <span className="material-symbols-outlined">manage_accounts</span>{!isCollapsed && "Administración de usuarios"}
              </summary>
              {!isCollapsed && (
                <div className="pl-6 flex flex-col gap-2 mt-2">
                  <Link to="/admin/users" className="text-gray-600">- Todos los usuarios</Link>
                  <Link to="/admin/delete-users" className="text-gray-600">- Eliminar usuarios</Link>
                </div>
              )}
            </details>

            <details className="cursor-pointer mt-2">
              <summary className="flex items-center gap-2 text-gray-700">
                <span className="material-symbols-outlined">fitness_center</span>{!isCollapsed && "Rutinas"}
              </summary>
              {!isCollapsed && (
                <div className="pl-6 flex flex-col gap-2 mt-2">
                  <Link to="/admin/all-routines" className="text-gray-600">- Todas las rutinas</Link>
                  <Link to="/admin/create-machines" className="text-gray-600">- Crear máquinas</Link>
                  <Link to="/admin/assign-routines" className="text-gray-600">- Asignar rutinas</Link>
                </div>
              )}
            </details>
          </div>
        </div>
      )}
    </nav>
  );
};
