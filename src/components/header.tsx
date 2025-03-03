import GymLogo from '../assets/gym-logo.png';
import { useEffect, useState } from 'react';
import { decodeToken } from '../utils/auth'; // ✅ Importamos la función

export const Header = () => { 
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const userData = decodeToken(token);
      if (userData) {
        setUserName(userData.firstname); // Ajusta según la estructura del token
      }
    }
  }, []);

  return (
    <div className="w-full h-12 bg-rose-200 flex items-center justify-between px-4 drop-shadow-sm">
      {/* Sección vacía para que el logo quede en el centro */}
      <div className="w-1/3"></div>

      {/* Logo en el centro */}
      <div className="w-1/3 flex justify-center">
        <img src={GymLogo} className="h-10"/>
      </div>

      {/* Nombre del usuario alineado a la derecha */}
      <div className="w-1/3 flex justify-end">
        <span className="text-sm font-bold">{userName ? `Hola, ${userName}` : "Bienvenido"}</span>
      </div>
    </div>
  );
};
