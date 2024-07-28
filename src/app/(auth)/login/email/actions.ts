"use server"

import { redirect } from "next/navigation"
import { publicAction } from "@/auth/safe-actions"
import { setSession } from "@/auth/session"
import { getUser, verifyPassword } from "@/data-access/users"
import { z } from "zod"

export const loginAction = publicAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8).max(255),
    })
  )
  .handler(async ({ input }) => {
    // TODO rate limit

    const user = await getUser({ email: input.email })

    if (!user) {
      throw new Error("Incorrect email or password")
    }

    if (!user.password) {
      throw new Error("Incorrect email or password")
    }

    const validPassword = await verifyPassword(user.password, input.password)
    console.log(validPassword)

    if (!validPassword) {
      throw new Error("Incorrect email or password")
    }

    // TODO delay to prevent timing attacks

    await setSession(user.id)
    return redirect("/")
  })
