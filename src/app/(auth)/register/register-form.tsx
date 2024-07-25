"use client"

import { passwordValidation } from "@/auth/validation"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { PasswordStrength } from "@/components/password-strength"

import { registerAction } from "./actions"

const registrationSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must contain at least 3 characters")
      .max(20, "Username must contain at most 20 characters"),
    email: z.string().email(),
    password: passwordValidation,
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  })

export const RegisterForm = () => {
  // const { toast } = useToast();

  const { execute, isPending, error } = useServerAction(registerAction, {
    onError({ err }) {
      // toast({
      // title: "Something went wrong",
      // description: err.message,
      // variant: "destructive",
      // });
      console.log(err)
    },
  })

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  })

  function onSubmit(values: z.infer<typeof registrationSchema>) {
    execute(values)
  }

  return (
    <div className="mx-auto max-w-[400px] space-y-6 py-24">
      <h1 className="text-center text-2xl font-bold">Sign Up</h1>

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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder="Pick a username"
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
          <PasswordStrength password={form.watch("password")} />

          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder="Enter Confirm your Password"
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
            Register
          </Button>
        </form>
      </Form>
    </div>
  )
}
