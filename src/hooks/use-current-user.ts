import { userService } from "#/backend/services/user.service"
import { useAuthStore } from "#/stores/auth-store"
import { useQuery } from "@tanstack/react-query"

export const currentUserQueryKey = ["current-user"]

export function useCurrentUser() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const isAuthReady = useAuthStore((state) => state.isAuthReady)

  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: userService.getCurrentUser,
    enabled: isAuthReady && Boolean(accessToken),
    retry: false,
  })
}
