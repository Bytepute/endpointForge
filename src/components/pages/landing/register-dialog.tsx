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

import { RegisterSchema } from "#/schemas/register.schema"
import type { Register } from "#/schemas/register.schema"
import { useRegister } from "#/hooks/use-register"
import { useNavigate } from "@tanstack/react-router"

export default function RegisterDialog() {
  const [open, setOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const register = useRegister()
  const navigate = useNavigate()

  const form = useForm<Register>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = (data: Register) => {
    register.mutate(data, {
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
        <Button>ثبت نام</Button>
      </DialogTrigger>

      <DialogContent
        dir="rtl"
        className="text-right [&>button]:left-4 [&>button]:right-auto"
      >
        <DialogHeader className="sm:text-right text-right">
          <DialogTitle>ساخت حساب</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mt-1">
            لطفاً اطلاعات خود را برای ایجاد حساب وارد کنید
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
                    <Input {...field} dir="rtl" className="text-right" />
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

            <Button
              type="submit"
              className="w-full"
              disabled={register.isPending}
            >
              {register.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "ثبت نام"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
