import { userService } from "#/backend/services/user.service"
import type { UpdateProfileInput } from "#/schemas/profile.schema"
import { notificationService } from "#/services/notification.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { currentUserQueryKey } from "./use-current-user"

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateProfileInput) =>
      userService.updateCurrentUser(input),
    onSuccess: (user) => {
      queryClient.setQueryData(currentUserQueryKey, user)
      notificationService.success("Profile updated successfully")
    },
    onError: () => {
      notificationService.error("Failed to update profile")
    },
  })
}
