import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

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

import { RegisterSchema, type Register } from "#/schemas/register.schema"
import { useRegister } from "#/hooks/use-register"

export default function RegisterDialog() {
  const [open, setOpen] = useState(false)
  const register = useRegister()

  const form = useForm<Register>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data: Register) => {
    register.mutate(data, {
      onSuccess: () => {
        form.reset()
        setOpen(false)
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ایمیل</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      dir="rtl"
                      className="text-right"
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
                    <Input
                      {...field}
                      type="password"
                      dir="rtl"
                      className="text-right"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تکرار رمز عبور</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      dir="rtl"
                      className="text-right"
                    />
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
