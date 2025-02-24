import GymLogo from 'assets/gym-logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useUserStore } from 'stores/user-sesion'
import { PRIVATE_LINK_ROUTES } from 'routers/routes'

type LoginForm = {
  email: string
  password: string
}

export const Login = () => {
  const { updateUser } = useUserStore()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<LoginForm>()

  const onSubmit = async (formValues: LoginForm) => {
    /**
     * Diana: Acá vas a recibir el user y el password en el formValues.
     * La idea es dispara el flujo de login desde acá y guardar la sesión del
     * usuario en store usando la función updateUser:
     */

    // const laSesionDeUsuario = laFuncionQueHaceElLogin()
    // updateUser(laSesionDeUsuario)

    // por lo pronto con que metan cualquier valor la cosa rueda.
    console.log(formValues)
    updateUser({ email: formValues.email })
    navigate(PRIVATE_LINK_ROUTES.HOME)
  }

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
