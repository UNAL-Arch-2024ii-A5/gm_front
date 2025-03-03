import GymLogo from 'assets/gym-logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useUserStore } from 'stores/user-sesion'
import { PRIVATE_LINK_ROUTES } from 'routers/routes'
import { useMutation } from '@apollo/client'
import { LOGIN_ADMIN, LOGIN_COACH, LOGIN_USER } from '../../graphql/authMs/mutations'


type LoginForm = {
  email: string
  password: string
  role: string,
}

export const Login = () => {
  const { updateUser } = useUserStore()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<LoginForm>()
  const [loginAdmin, { data: adminData, loading: adminLoading, error: adminError }] = useMutation(LOGIN_ADMIN);
  const [loginCoach, { data: coachData, loading: coachLoading, error: coachError }] = useMutation(LOGIN_COACH);
  const [loginUser, { data: userData, loading: userLoading, error: userError }] = useMutation(LOGIN_USER);
  
  const methodSwitch: any = {
    admin: loginAdmin,
    coach: loginCoach,
    user: loginUser,
  }

  const methodSwitchName: any = {
    admin: "loginAdmin",
    coach: "loginCoach",
    user: "loginUser",
  }

  const onSubmit = async (formValues: LoginForm) => {
    const { role } = formValues;
    try {
      const response = await methodSwitch[role]({
        variables: { email: formValues.email, password: formValues.password },
      });
      const { address, email, firstname, lastname, mobile, token, _id } = response.data[methodSwitchName[role]];
      updateUser({ address, email, firstname, lastname, mobile, token, _id });
      sessionStorage.setItem("token", token);
      navigate(PRIVATE_LINK_ROUTES.HOME);
      console.log(response);
    } catch (error) {
      console.log("Error autenticando"); // Aquí podrías mostrar un mensaje de error en la UI
    }
  };
  
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-100">
      <div className="min-w-96 rounded-lg px-10 py-6 shadow-md">
        <div className="mb-8 flex h-16 items-center justify-center gap-4">
          <img src={GymLogo} className="h-full w-auto" />
          <span className="text-2xl ">GymMaster</span>
        </div>
        <form
          className="mt-8 flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="flex flex-col gap-1 text-xs">
            Email
            <input
              placeholder="Email"
              type="email"
              autoComplete="email"
              className="grow rounded-lg border-1 px-2 py-2"
              {...register('email', { required: true })}
            />
          </label>
          <label className="flex gap-1 flex-col text-xs">
            Password
            <input
              placeholder="Contraseña"
              type="password"
              autoComplete="current-password"
              className="grow rounded-lg border-1 px-2 py-2"
              {...register('password', { required: true })}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs">
            Rol
            <select
              className="grow rounded-lg border-1 px-2 py-2"
              {...register('role', { required: true })}
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
              <option value="coach">Entrenador</option>
            </select>
          </label>
          <button className='h-6 border-1 rounded-lg mt-3 w-1/2 self-center text-sm' >Iniciar sesión</button>
          <Link to="/forgot-password" className="text-xs text-center">
            Recuperar contraseña
          </Link>
          <Link to="/register" className="text-s text-center">
            ¿No estás registrado? Crea una cuenta
          </Link>
        </form>
      </div>
    </div>
  )
}
