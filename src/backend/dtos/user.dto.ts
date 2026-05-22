export type CurrentUserResponseDTO = {
  id?: number
  userId?: number
  userName: string
  createdAt: string
}

export type UpdateCurrentUserRequestDTO = {
  userName: string
}
