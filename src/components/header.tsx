import GymLogo from '../assets/gym-logo.png';
import { useEffect, useState } from 'react';
import { decodeToken } from '../utils/auth'; // ✅ Importamos la función
import { useNavigate } from 'react-router-dom';

export const Header = () => { 
  const [userName, setUserName] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const userData = decodeToken(token);
      if (userData) {
        setUserName(userData.firstname); // Ajusta según la estructura del token
      }
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Elimina el token
    navigate("/login"); // Redirige al login
  };

  return (
    <div className="w-full h-12 bg-rose-200 flex items-center justify-between px-4 drop-shadow-sm relative">
      {/* Sección vacía para que el logo quede en el centro */}
      <div className="w-1/3"></div>

      {/* Logo en el centro */}
      <div className="w-1/3 flex justify-center">
        <img src={GymLogo} className="h-10"/>
      </div>

      {/* Nombre del usuario alineado a la derecha */}
      <div className="w-1/3 flex justify-end relative">
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="text-sm font-bold relative"
        >
          {userName ? `Hola, ${userName}` : "Bienvenido"}
        </button>

        {/* Menú desplegable */}
        {showMenu && (
          <div className="absolute right-0 mt-10 w-40 bg-white shadow-md rounded-md z-50">
            <button 
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => navigate("/profile")}
            >
              Actualizar perfil
            </button>
            <button 
              className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

