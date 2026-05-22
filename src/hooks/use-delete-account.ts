import { userService } from "#/backend/services/user.service"
import { notificationService } from "#/services/notification.service"
import { useAuthStore } from "#/stores/auth-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

export function useDeleteAccount() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userService.deleteCurrentUser,
    onSuccess: () => {
      useAuthStore.getState().clearAccessToken()
      queryClient.clear()
      void navigate({ to: "/" })
      notificationService.success("Account deleted")
    },
    onError: () => {
      notificationService.error("Failed to delete account")
    },
  })
}
