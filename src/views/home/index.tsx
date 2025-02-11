import { Outlet } from 'react-router-dom'
import { Header } from '../../components/header'
import { SideNav } from '../../components/sidenav'

export const Home = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <div className="h-full w-ful flex flex-row-reverse">
        <div className='w-full p-4'>
          <Outlet />
        </div>
        <SideNav />
      </div>
    </div>
  )
}
