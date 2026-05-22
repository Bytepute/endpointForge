import { authApi } from "#/backend/api/auth-api"
import { notificationService } from "#/services/notification.service"
import { useAuthStore } from "#/stores/auth-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      useAuthStore.getState().clearAccessToken()
      queryClient.clear()
      void navigate({ to: "/" })
    },
    onSuccess: () => {
      notificationService.success("Logged out")
    },
    onError: () => {
      notificationService.error("Could not end the server session")
    },
  })
}
