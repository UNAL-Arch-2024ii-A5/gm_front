import { useUserStore } from 'stores/user-sesion'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../graphql/authMs/mutations'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PUBLIC_ROUTES } from 'routers/routes'

export const Profile = () => {
  const navigate = useNavigate()
  const { user } = useUserStore() // ✅ Obtiene los datos del usuario desde `userStore`

  useEffect(() => {
    if (!user?._id) {
      alert('⚠️ Debes iniciar sesión para acceder al perfil.')
      navigate(PUBLIC_ROUTES.LOGIN)
    }
  }, [user, navigate])

  const [updateUser, { loading: updating }] = useMutation(UPDATE_USER)
  const [formData, setFormData] = useState({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    address: user?.address || '',
    password: '',
  })

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleUpdate = async () => {
    if (!formData.password) {
      alert('⚠️ Debes ingresar tu contraseña para actualizar los datos.')
      return
    }

    try {
      const response = await updateUser({
        variables: {
          email: formData.email,
          password: formData.password,
          firstname: formData.firstname,
          lastname: formData.lastname,
          mobile: formData.mobile,
          address: formData.address,
        },
      })

      console.log('✅ Usuario actualizado:', response.data.updateUser)
      alert('🎉 Datos actualizados correctamente')
    } catch (err) {
      console.error('❌ Error actualizando usuario:', err)
      alert('❌ Hubo un error al actualizar los datos.')
    }
  }

  if (!user?._id)
    return (
      <p className="text-red-500">
        ⚠️ No se encontró el usuario. Redirigiendo...
      </p>
    )

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
          {updating ? '⏳ Actualizando...' : 'Actualizar Datos'}
        </button>
      </form>
    </div>
  )
}

export default Profile
