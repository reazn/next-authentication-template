"use server"

import { redirect } from "next/navigation"
import { deleteSession, getSession, getSessions } from "@/data-access/sessions"
import { deleteUser, getUser } from "@/data-access/users"
import { protectedAction } from "@/server/auth/safe-actions"
import { z } from "zod"

export const deleteUserAction = protectedAction
  .createServerAction()
  .handler(async ({ input, ctx }) => {
    await deleteUser(ctx.user.id)
    redirect("/login")
  })

export const logoutSessionAction = protectedAction
  .createServerAction()
  .input(z.string())
  .handler(async ({ input, ctx }) => {
    const session = await getSession(input)

    if (session?.userId === ctx.user.id) {
      return await deleteSession(input)
    }

    throw new Error("Invalid session")
  })
