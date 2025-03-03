import { create } from 'zustand'
import { decodeToken } from '../utils/auth'

interface User {
  _id: string
  firstname: string
  lastname: string
  email: string
  mobile: string
  address: string
  role: string
  token: string
}

interface UserStore {
  user: User | null
  updateUser: (userData: User) => void
  clearUser: () => void
}

// ✅ Inicializa el estado con los datos del token
const getUserFromToken = (): User | null => {
  const token = sessionStorage.getItem('token')
  return token ? decodeToken(token) : null
}

export const useUserStore = create<UserStore>(set => ({
  user: getUserFromToken(),
  updateUser: userData => set({ user: userData }),
  clearUser: () => {
    sessionStorage.removeItem('token')
    set({ user: null })
  },
}))
