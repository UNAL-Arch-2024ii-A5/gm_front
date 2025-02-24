import GymLogo from 'assets/gym-logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useUserStore } from 'stores/user-sesion'
import { PRIVATE_LINK_ROUTES } from 'routers/routes'

type RegisterForm = {
  firstname: string
  lastname: string
  email: string
  mobile: string
  password: string
  address: string
  role: string
}

export const Register = () => {
  const { updateUser } = useUserStore()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<RegisterForm>({
    defaultValues: { role: 'user' }
  })

  const onSubmit = async (formValues: RegisterForm) => {
    console.log(formValues)
    updateUser({ 
      email: formValues.email, 
      firstname: formValues.firstname, 
      lastname: formValues.lastname, 
      role: formValues.role
    })
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
            Nombre
            <input
              placeholder="Nombre"
              type="text"
              className="grow rounded-lg border-1 px-2 py-2"
              {...register('firstname', { required: true })}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs">
            Apellido
            <input
              placeholder="Apellido"
              type="text"
              className="grow rounded-lg border-1 px-2 py-2"
              {...register('lastname', { required: true })}
            />
          </label>
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
          <label className="flex flex-col gap-1 text-xs">
            Teléfono
            <input
              placeholder="Teléfono"
              type="tel"
              className="grow rounded-lg border-1 px-2 py-2"
              {...register('mobile', { required: true })}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs">
            Contraseña
            <input
              placeholder="Contraseña"
              type="password"
              autoComplete="new-password"
              className="grow rounded-lg border-1 px-2 py-2"
              {...register('password', { required: true })}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs">
            Dirección
            <input
              placeholder="Dirección"
              type="text"
              className="grow rounded-lg border-1 px-2 py-2"
              {...register('address', { required: true })}
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
          <button className='h-6 border-1 rounded-lg mt-3 w-1/2 self-center text-sm'>Registrarse</button>
          <Link to="/login" className="text-xs text-center">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </form>
      </div>
    </div>
  )
}
