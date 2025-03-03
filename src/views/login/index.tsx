import GymLogo from 'assets/gym-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUserStore } from 'stores/user-sesion';
import { PRIVATE_LINK_ROUTES } from 'routers/routes';
import { useMutation } from '@apollo/client';
import { LOGIN_ADMIN, LOGIN_COACH, LOGIN_USER } from '../../graphql/authMs/mutations';

type LoginForm = {
  email: string;
  password: string;
  role: string;
};

export const Login = () => {
  const { updateUser } = useUserStore();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginForm>();

  // Mutaciones de login para cada tipo de usuario
  const [loginAdmin] = useMutation(LOGIN_ADMIN);
  const [loginCoach] = useMutation(LOGIN_COACH);
  const [loginUser] = useMutation(LOGIN_USER);

  // Asocia cada rol con su mutación
  const methodSwitch: any = {
    admin: loginAdmin,
    coach: loginCoach, // 🔥 Corregido (antes "Coach", ahora en minúscula)
    user: loginUser,
  };

  // Asocia cada rol con el nombre de la respuesta del backend
  const methodSwitchName: any = {
    admin: "loginAdmin",
    coach: "loginCoach", // 🔥 Corregido para coincidir con el backend
    user: "loginUsuarios",
  };

  const onSubmit = async (formValues: LoginForm) => {
    const { role } = formValues;
    
    console.log("Rol seleccionado:", role);

    try {
      if (!methodSwitch[role]) {
        console.error("⚠️ Error: No existe una mutación para el rol:", role);
        return;
      }

      console.log(`🚀 Ejecutando mutación para ${role}...`);

      // Llamamos la mutación correspondiente al rol
      const response = await methodSwitch[role]({
        variables: { email: formValues.email, password: formValues.password },
      });

      console.log("✅ Respuesta del servidor:", response);

      const responseData = response?.data?.[methodSwitchName[role]];

      if (!responseData) {
        console.error(`❌ Error: No se recibió una respuesta válida para el rol ${role}`);
        return;
      }

      // Extraemos los datos del usuario
      const { address, email, firstname, lastname, mobile, token, _id } = responseData;

      // Actualizamos el estado del usuario y almacenamos el token
      updateUser({ address, email, firstname, lastname, mobile, token, _id });
      sessionStorage.setItem("token", token);

      console.log("🎉 Login exitoso. Redirigiendo a Home...");
      navigate(PRIVATE_LINK_ROUTES.HOME);

    } catch (error) {
      console.error("❌ Error autenticando:", error);
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
              <option value="coach">Entrenador</option> {/* 🔥 Corregido, antes tenía "Coach" con mayúscula */}
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
  );
};
