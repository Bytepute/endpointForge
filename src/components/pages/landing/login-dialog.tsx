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
import { LoginSchema } from "#/schemas/login.schema"
import type { Login } from "#/schemas/login.schema"
import { useLogin } from "#/hooks/use-login"
import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"

export default function LoginDialog() {
  const [open, setOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const login = useLogin()
  const navigate = useNavigate()

  const form = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = (data: Login) => {
    login.mutate(data, {
      onSuccess: () => {
        form.reset()
        setOpen(false)
        navigate({ to: "/projects" })
      },
      onError: (error) => {
        console.error(error)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">ورود</Button>
      </DialogTrigger>

      <DialogContent
        dir="rtl"
        className="text-right [&>button]:left-4 [&>button]:right-auto"
      >
        <DialogHeader className="sm:text-right text-right">
          <DialogTitle>ورود به حساب</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mt-1">
            لطفاً اطلاعات حساب خود را وارد کنید
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام کاربری</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      dir="rtl"
                      className="text-right"
                      placeholder="نام کاربری"
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
                  <FormLabel>رمز عبور</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        dir="rtl"
                        className="pl-10 text-right"
                        placeholder="رمز عبور"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={
                          showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
                        }
                        className="absolute left-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
              {login.isPending ? <Loader2 className="animate-spin" /> : "ورود"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
