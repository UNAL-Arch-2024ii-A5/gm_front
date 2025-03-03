import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import GymLogo from 'assets/gym-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PUBLIC_ROUTES } from 'routers/routes';
import { FORGOT_PASSWORD } from '../../graphql/authMs/mutations';


type ForgotPasswordForm = {
    token:string;
    password: string;
  };
  
  export const ForgotPasswordP = () => {
    const { register, handleSubmit } = useForm<ForgotPasswordForm>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token"); // Obtener token de la URL
    const [forgotPassword, {  data: data, loading: loading, error: error }] = useMutation(FORGOT_PASSWORD);
  
    const onSubmit = async (formValues: ForgotPasswordForm) => {
      try {
        const response = await forgotPassword({
          variables: {
            token: formValues.token,
            password: formValues.password,
          },
        });
        console.log("Respuesta del servidor:", response);
        alert("Contraseña actualizada con éxito.");
        navigate(PUBLIC_ROUTES.LOGIN);
      } catch (err) {
        console.error("Error al resetear la contraseña:", err);
        alert("Hubo un error al actualizar la contraseña.");
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
              Ingresa tu el token del correo para continuar.
            </p>
            <label className="flex flex-col gap-1 text-xs">
                Ingresa el token
              <input
                type="token"
                placeholder="Token"
                autoComplete="new-token"
                className="grow rounded-lg border-1 px-2 py-2"
                {...register("token", { required: true })}
              />
            </label>
            <p className="text-center text-sm text-gray-600 mb-3">
              Ingresa tu nueva contraseña para continuar.
            </p>
  
            <label className="flex flex-col gap-1 text-xs">
              Nueva Contraseña
              <input
                type="password"
                placeholder="Nueva contraseña"
                autoComplete="new-password"
                className="grow rounded-lg border-1 px-2 py-2"
                {...register("password", { required: true })}
              />
            </label>
  
            {/* Botones */}
            <div className="mt-3 flex flex-col items-center gap-2">
              <button
                type="submit"
                className="h-6 border-1 rounded-lg mt-3 w-1/2 self-center text-sm"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Actualizar"}
              </button>
              <Link to="/login" className="text-xs text-center">
                Cancelar
              </Link>
            </div>
  
            {/* Mostrar errores */}
            {error && <p className="text-red-500 text-xs mt-2">{error.message}</p>}
          </form>
        </div>
      </div>
    );
  };
  
  export default ForgotPasswordP;
  