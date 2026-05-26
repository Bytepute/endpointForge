export type AuthSessionModel = {
  accessToken: string
  expiresIn: number
  tokenType: "Bearer"
}

export type RegisteredUserModel = {
  id: number
  username: string
  createdAt: Date
  session: AuthSessionModel
}
