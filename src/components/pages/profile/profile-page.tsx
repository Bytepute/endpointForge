import { Button } from "#/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/form"
import { ConfirmDialog } from "#/components/pages/shared/confirm-dialog"
import { Input } from "#/components/ui/input"
import { Skeleton } from "#/components/ui/skeleton"
import { useCurrentUser } from "#/hooks/use-current-user"
import { useDeleteAccount } from "#/hooks/use-delete-account"
import { useLogout } from "#/hooks/use-logout"
import { useUpdateProfile } from "#/hooks/use-update-profile"
import { UpdateProfileInputSchema } from "#/schemas/profile.schema"
import { useAuthStore } from "#/stores/auth-store"
import type { UpdateProfileInput } from "#/schemas/profile.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "@tanstack/react-router"
import { ArrowLeft, Loader2, LogOut, Trash2, UserRound } from "lucide-react"
import { useForm } from "react-hook-form"

function ProfileSkeleton() {
  return (
    <div className="space-y-5 rounded-lg border p-6">
      <Skeleton className="size-16 rounded-md" />
      <Skeleton className="h-7 w-48" />
      <Skeleton className="h-4 w-72 max-w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  )
}

export default function ProfilePage() {
  const user = useCurrentUser()
  const updateProfile = useUpdateProfile()
  const logout = useLogout()
  const deleteAccount = useDeleteAccount()
  const accessToken = useAuthStore((state) => state.accessToken)
  const isAuthReady = useAuthStore((state) => state.isAuthReady)

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(UpdateProfileInputSchema),
    values: {
      username: user.data?.username ?? "",
    },
  })

  if (!isAuthReady || user.isLoading) {
    return <ProfileSkeleton />
  }

  if (!accessToken) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-sm text-muted-foreground">
        Sign in to view your profile.
      </div>
    )
  }

  if (user.isError || !user.data) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-sm text-muted-foreground">
        Failed to load your profile.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" className="-ml-3 w-fit">
        <Link to="/projects">
          <ArrowLeft className="size-4" />
          Back to projects
        </Link>
      </Button>

      <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-lg border bg-muted">
          <UserRound className="size-8 text-muted-foreground" />
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-3xl font-bold">{user.data.username}</h2>
          <p className="text-sm text-muted-foreground">
            Manage the username shown across Endpoint Forge.
          </p>
        </div>
      </div>

      <Card className="max-w-xl rounded-lg">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Usernames may contain letters, numbers, and underscores.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit((input) =>
                updateProfile.mutate(input),
              )}
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input autoComplete="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={updateProfile.isPending}>
                {updateProfile.isPending && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                Save changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <section className="max-w-xl space-y-4 border-t pt-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Session</h3>
          <p className="text-sm text-muted-foreground">
            Sign out on this device without deleting your account.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          disabled={logout.isPending}
          onClick={() => logout.mutate()}
        >
          {logout.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <LogOut className="size-4" />
          )}
          Logout
        </Button>
      </section>

      <section className="max-w-xl space-y-4 border-t pt-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Delete account</h3>
          <p className="text-sm text-muted-foreground">
            Remove your account and sign out of Endpoint Forge permanently.
          </p>
        </div>
        <ConfirmDialog
          title="Delete your account?"
          description="This permanently deletes your account. This action cannot be undone."
          confirmText="Delete account"
          loading={deleteAccount.isPending}
          onConfirm={() => deleteAccount.mutate()}
          trigger={
            <Button variant="destructive">
              <Trash2 className="size-4" />
              Delete account
            </Button>
          }
        />
      </section>
    </div>
  )
}
