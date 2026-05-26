export type RegisterRequestDTO = {
  userName: string
  password: string
}

export type RegisterResponseDTO = {
  userId: number
  userName: string
  createdAt: string
  accessToken: string
  expiresIn: number
}
