import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS } from '../../graphql/authMs/querys';
import { DELETE_USER } from '../../graphql/authMs/mutations';
import { useState } from 'react';

export const Users = () => {
  const { data, loading, error, refetch } = useQuery(GET_USERS);
  const [deleteUser, { loading: deleting }] = useMutation(DELETE_USER);
  const [deletingUser, setDeletingUser] = useState<string | null>(null);

  const handleDelete = async (_id: string) => {
    console.log(`🗑 Intentando eliminar usuario con ID: ${_id}`);
  
    if (!confirm('⚠️ ¿Seguro que quieres eliminar este usuario?')) return;
  
    setDeletingUser(_id);
  
    try {
      const response = await deleteUser({ variables: { _id } }); // 🔥 Usamos "_id" en vez de "id"
      console.log("✅ Usuario eliminado correctamente:", response);
      await refetch();
    } catch (err) {
      console.error("❌ Error eliminando usuario:", err);
    } finally {
      setDeletingUser(null);
    }
  };
  
  

  if (loading) return <p className="text-center">⏳ Cargando usuarios...</p>;
  if (error) return <p className="text-center text-red-500">❌ Error al cargar usuarios.</p>;
  console.log("Usuarios en la tabla:", data?.allUsers);

  return (
    <div className="flex-grow p-6">
      <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Nombre</th>
              <th className="border p-2 text-left">Correo</th>
              <th className="border p-2 text-left">Teléfono</th>
              <th className="border p-2 text-left">Rol</th>
              <th className="border p-2 text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {data?.allUsers.map((user: any) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="border p-2">{user.firstname} {user.lastname}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.mobile}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2 text-center">
                  <button 
                    onClick={() => handleDelete(user._id)}
                    className={`text-red-500 hover:text-red-700 text-lg font-bold 
                      ${deletingUser === user._id ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={deletingUser === user._id}
                  >
                    {deletingUser === user._id ? "⏳" : "✖"} {/* Cambia el ícono mientras se elimina */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
