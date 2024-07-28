"use server"

import { redirect } from "next/navigation"
import { publicAction } from "@/auth/safe-actions"
import { setSession } from "@/auth/session"
import { passwordValidation } from "@/auth/validation"
import { createUser } from "@/data-access/users"
import { z } from "zod"

export const registerAction = publicAction
  .createServerAction()
  .input(
    z.object({
      username: z.string().min(3).max(20),
      email: z.string().email(),
      password: passwordValidation,
    })
  )
  .handler(async ({ input }) => {
    // TODO rate limit

    const user = await createUser({
      email: input.email,
      username: input.username,
      password: input.password,
    })

    // TODO delay to prevent timing attacks

    await setSession(user.id)
    return redirect("/")
  })
