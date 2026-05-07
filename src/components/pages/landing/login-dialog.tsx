import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "#/components/ui/button"
import { Input } from "#/components/ui/input"
import {
  Dialog,
  DialogContent,
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
import { LoginSchema, type Login } from "#/schemas/auth.schema"
import { useLogin } from "#/hooks/use-login"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export default function LoginDialog() {
  const [open, setOpen] = useState(false)
  const login = useLogin()

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
                    <Input
                      {...field}
                      type="password"
                      dir="rtl"
                      className="text-right"
                      placeholder="رمز عبور"
                    />
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
