import { create } from 'zustand'

export type Rating  ={
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
  role?: string
  isBlocked?: boolean
  address?: string
  refreshToken?: string
  routines?: [string]
  images?: [string]
  ratings?: [Rating]
  totalrating?: string
  passwordResetToken?: string
  sesionToken?: string // Diana plz valida qué tipo tiene el session token para almacenarlo acá de una vez. 
}

type State = {
  user?: user
}

type Action = {
  updateUser: (user: user) => void
}

export const useUserStore = create<State & Action>(set => ({
  user: undefined,
  updateUser: (user: user) => set(() => ({user}))
}))
