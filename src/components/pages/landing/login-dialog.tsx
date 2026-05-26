import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "#/components/ui/button"
import { Input } from "#/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/form"
import { createLoginSchema } from "#/schemas/login.schema"
import type { Login } from "#/schemas/login.schema"
import { useLogin } from "#/hooks/use-login"
import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { cn } from "#/lib/utils"
import { useLandingI18n } from "./landing-i18n"

type LoginDialogProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { direction, isRtl, text } = useLandingI18n()
  const login = useLogin({
    success: text.auth.loginSuccess,
    error: text.auth.loginError,
    direction,
  })
  const dialogOpen = open ?? internalOpen
  const setDialogOpen = onOpenChange ?? setInternalOpen

  const form = useForm<Login>({
    resolver: zodResolver(
      createLoginSchema({
        usernameMin: text.validation.usernameMin,
        passwordMin: text.validation.passwordMin,
      }),
    ),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = (data: Login) => {
    login.mutate(data, {
      onSuccess: () => {
        form.reset()
        setDialogOpen(false)
      },
      onError: (error) => {
        console.error(error)
      },
    })
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{text.auth.login}</Button>
      </DialogTrigger>

      <DialogContent
        dir={direction}
        className={cn(
          isRtl && "text-right [&>button]:left-4 [&>button]:right-auto",
        )}
      >
        <DialogHeader className={cn(isRtl && "sm:text-right text-right")}>
          <DialogTitle>{text.auth.loginTitle}</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mt-1">
            {text.auth.loginDescription}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.auth.username}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      dir={direction}
                      className={cn(isRtl && "text-right")}
                      placeholder={text.auth.usernamePlaceholder}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.auth.password}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        dir={direction}
                        className={cn(isRtl && "pl-10 text-right")}
                        placeholder={text.auth.passwordPlaceholder}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={
                          showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
                        }
                        className={cn(
                          "absolute top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                          isRtl ? "left-1" : "right-1",
                        )}
                        onClick={() => setShowPassword((visible) => !visible)}
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={login.isPending}>
              {login.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                text.auth.login
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
