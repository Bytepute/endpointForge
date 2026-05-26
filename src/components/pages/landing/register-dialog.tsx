import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"

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

import { createRegisterSchema } from "#/schemas/register.schema"
import type { Register } from "#/schemas/register.schema"
import { useRegister } from "#/hooks/use-register"
import { cn } from "#/lib/utils"
import { useLandingI18n } from "./landing-i18n"

type RegisterDialogProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function RegisterDialog({
  open,
  onOpenChange,
}: RegisterDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { direction, isRtl, text } = useLandingI18n()
  const register = useRegister({
    success: text.auth.registerSuccess,
    error: text.auth.registerError,
    direction,
  })
  const dialogOpen = open ?? internalOpen
  const setDialogOpen = onOpenChange ?? setInternalOpen

  const form = useForm<Register>({
    resolver: zodResolver(
      createRegisterSchema({
        usernameMin: text.validation.registerUsernameMin,
        invalidEmail: text.validation.invalidEmail,
        passwordMin: text.validation.passwordMin,
        passwordMismatch: text.validation.passwordMismatch,
      }),
    ),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = (data: Register) => {
    register.mutate(data, {
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
        <Button>{text.auth.register}</Button>
      </DialogTrigger>

      <DialogContent
        dir={direction}
        className={cn(
          isRtl && "text-right [&>button]:left-4 [&>button]:right-auto",
        )}
      >
        <DialogHeader className={cn(isRtl && "sm:text-right text-right")}>
          <DialogTitle>{text.auth.registerTitle}</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mt-1">
            {text.auth.registerDescription}
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.auth.email}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      dir={direction}
                      className={cn(isRtl && "text-right")}
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
                        className={cn(isRtl && "text-right")}
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

            <Button
              type="submit"
              className="w-full"
              disabled={register.isPending}
            >
              {register.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                text.auth.register
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
