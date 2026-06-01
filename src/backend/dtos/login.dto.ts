export type LoginRequestDTO = {
  userName: string
  password: string
}

export type LoginResponseDTO = {
  username: string
  accessToken: string
  expiresIn: number
  tokenType: "Bearer"
}

export type TokenPairResponseDTO = LoginResponseDTO
