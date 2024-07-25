"use client"

import { passwordValidation } from "@/auth/validation"
import { zodResolver } from "@hookform/resolvers/zod"
// import { LoaderButton } from "@/components/loader-button";
// import { useToast } from "@/components/ui/use-toast";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useServerAction } from "zsa-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { loginAction } from "./email/actions"

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const LoginForm = () => {
  // const { toast } = useToast();

  const { execute, isPending, error } = useServerAction(loginAction, {
    onError({ err }) {
      // toast({
      // title: "Something went wrong",
      // description: err.message,
      // variant: "destructive",
      // });
      console.log(err)
    },
  })

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    execute(values)
  }

  return (
    <div className="mx-auto max-w-[400px] space-y-6 py-24">
      <h1 className="text-center text-2xl font-bold">Login</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder="Enter your email"
                    type="email"
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder="Enter your password"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TODO - remove */}
          {error && (
            <span>
              {error.code} - {error.message}
            </span>
          )}

          <Button className="w-full" type="submit" loading={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </div>
  )
}
