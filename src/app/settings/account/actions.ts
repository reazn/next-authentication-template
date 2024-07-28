"use server"

import { redirect } from "next/navigation"
import { protectedAction } from "@/auth/safe-actions"
import { deleteUser } from "@/data-access/users"

export const deleteAccountAction = protectedAction
  .createServerAction()
  .handler(async ({ input, ctx }) => {
    await deleteUser(ctx.user.id)
    redirect("/login")
  })
