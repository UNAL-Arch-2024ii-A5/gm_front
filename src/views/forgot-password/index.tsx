import GymLogo from 'assets/gym-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PUBLIC_ROUTES } from 'routers/routes';
import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORDT } from '../../graphql/authMs/mutations';
type ForgotPasswordForm = {
  email: string;
  mobile: string;
};

export const ForgotPassword = () => {
  const { register, handleSubmit } = useForm<ForgotPasswordForm>();
  const navigate = useNavigate()
  const [forgotPasswordT, { data: adminData, loading: adminLoading, error: adminError }] = useMutation(FORGOT_PASSWORDT);
  const onSubmit = async (formValues: ForgotPasswordForm) => {
    console.log(`Solicitud de recuperación de contraseña para: ${formValues.email}`);
    try{
      const response = await forgotPasswordT({variables: {email: formValues.email, mobile: formValues.mobile}})
      navigate(PUBLIC_ROUTES.LOGIN);
      console.log(response);
    }catch (error){
      console.log("Error buscando algo");
    }
  };
  
  
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-100">
      <div className="min-w-96 rounded-lg px-10 py-6 shadow-md">
        <div className="mb-8 flex h-16 items-center justify-center gap-4">
          <img src={GymLogo} className="h-full w-auto" alt="GymMaster Logo" />
          <span className="text-2xl">GymMaster</span>
        </div>

        {/* Formulario */}
        <form className="mt-8 flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-center text-lg font-semibold">Reestablece tu contraseña</h3>
          <p className="text-center text-sm text-gray-600 mb-3">
            Te enviaremos un mensaje a tu correo electrónico para reestablecer tu contraseña.
          </p>

          <label className="flex flex-col gap-1 text-xs">
            Correo con el cual estás registrado
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              className="grow rounded-lg border-1 px-2 py-2"
              {...register('email', { required: true })}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs">
            Telefono con el cual estás registrado
            <input
              type="mobile"
              placeholder="Mobile"
              autoComplete="mobile"
              className="grow rounded-lg border-1 px-2 py-2"
              {...register('mobile', { required: true })}
            />
          </label>

          {/* Botones */}
          <div className="mt-3 flex flex-col items-center gap-2">
            <button
              type="submit"
              className="h-6 border-1 rounded-lg mt-3 w-1/2 self-center text-sm"
            >
              Enviar
            </button>
            <Link to="/login" className="text-xs text-center">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
