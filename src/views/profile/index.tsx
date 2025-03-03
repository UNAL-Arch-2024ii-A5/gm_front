import { useQuery, useMutation } from "@apollo/client";
import { PROFILE } from "../../graphql/authMs/querys";
import { UPDATE_USER } from "../../graphql/authMs/mutations";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES } from "routers/routes"; // 🔥 Para redirección si no hay usuario

export const Profile = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  // ✅ Obtén `userId` al montar el componente
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (!storedUserId) {
      alert("⚠️ Debes iniciar sesión para acceder al perfil.");
      navigate(PUBLIC_ROUTES.LOGIN);
    } else {
      setUserId(storedUserId);
    }
  }, [navigate]);

  // ✅ Espera a que `userId` tenga valor antes de hacer la query
  const { data, loading, error } = useQuery(PROFILE, {
    variables: { id: userId },
    skip: !userId, // 🔥 Evita ejecutar la consulta si `userId` es `null`
  });

  const [updateUser, { loading: updating }] = useMutation(UPDATE_USER);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    address: "",
    password: "", // Para validar la actualización
  });

  // ✅ Cargar datos del usuario cuando estén disponibles
  useEffect(() => {
    if (data?.getUser) {
      setFormData((prev) => ({
        ...prev,
        firstname: data.getUser.firstname || "",
        lastname: data.getUser.lastname || "",
        email: data.getUser.email || "",
        mobile: data.getUser.mobile || "",
        address: data.getUser.address || "",
      }));
    }
  }, [data]);

  // ✅ Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Enviar actualización
  const handleUpdate = async () => {
    if (!formData.password) {
      alert("⚠️ Debes ingresar tu contraseña para actualizar los datos.");
      return;
    }

    try {
      const response = await updateUser({
        variables: {
          email: formData.email,
          password: formData.password, // 🔥 Validación obligatoria
          firstname: formData.firstname,
          lastname: formData.lastname,
          mobile: formData.mobile,
          address: formData.address,
        },
      });

      console.log("✅ Usuario actualizado:", response.data.updateUser);
      alert("🎉 Datos actualizados correctamente");
    } catch (err) {
      console.error("❌ Error actualizando usuario:", err);
      alert("❌ Hubo un error al actualizar los datos. Inténtalo de nuevo.");
    }
  };

  // ✅ Mostrar mensajes de carga y error
  if (!userId) return <p className="text-center text-red-500">⚠️ No se encontró el ID del usuario. Redirigiendo...</p>;
  if (loading) return <p className="text-center text-gray-500">⏳ Cargando datos...</p>;
  if (error) return <p className="text-center text-red-500">❌ Error cargando perfil. Intenta nuevamente.</p>;

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4 text-center">Actualizar Perfil</h2>
      <form className="flex flex-col gap-3">
        <label>
          Nombre
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </label>

        <label>
          Apellido
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            className="w-full border rounded px-3 py-2 bg-gray-200"
            disabled
          />
        </label>

        <label>
          Teléfono
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </label>

        <label>
          Dirección
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </label>

        <label>
          Contraseña (para confirmar cambios)
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </label>

        <button
          type="button"
          onClick={handleUpdate}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={updating}
        >
          {updating ? "⏳ Actualizando..." : "Actualizar Datos"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
