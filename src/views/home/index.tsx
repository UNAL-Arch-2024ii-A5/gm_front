import { Outlet } from 'react-router-dom';
import { Header } from '../../components/header';
import { SideNav } from '../../components/sidenav';
import { useState } from 'react';

export const Home = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Estado para colapsar SideNav

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <div className="h-full w-full flex">
        {/* Sidebar */}
        <SideNav isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Contenido principal */}
        <div className={`flex-grow p-4 transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-80"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
