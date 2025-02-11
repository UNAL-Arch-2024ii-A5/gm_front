import GymLogo from '../assets/gym-logo.png'

export const Header = () => { 
  return <div className="w-full h-10 bg-rose-200 flex justify-center items-center drop-shadow-sm">
    <img src={GymLogo} className='h-full'/>
  </div>
}