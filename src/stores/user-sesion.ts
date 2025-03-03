import { create } from 'zustand'

export type Rating = {
  star: number
  comment: string
  postedby: string
}

export type user = {
  _id?: string
  firstname?: string
  lastname?: string
  email?: string
  mobile?: string
  password?: string
  role?: string
  isBlocked?: boolean
  address?: string
  token?: string // Diana plz valida qué tipo tiene el session token para almacenarlo acá de una vez.
  routines?: [string]
  images?: [string]
  ratings?: [Rating]
  totalrating?: string
  passwordChangeAt?: string
  passwordResetToken?: string
  passwordResetExpires?: string
}

type State = {
  user?: user
}

type Action = {
  updateUser: (user: user) => void
}

const initUser = () => {
  const userData = sessionStorage.getItem('user-profile')
  if (userData) {
    return JSON.parse(userData)
  }
  return undefined
}

export const useUserStore = create<State & Action>(set => ({
  user: initUser(),
  updateUser: (user: user) => set(() => ({ user })),
}))
