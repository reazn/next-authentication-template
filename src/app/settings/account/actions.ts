"use server";

import { authenticatedAction } from "@/auth/safe-actions";
import { deleteUser } from "@/data-access/users";
import { redirect } from "next/navigation";

export const deleteAccountAction = authenticatedAction
  .createServerAction()
  .handler(async ({ input, ctx }) => {
    await deleteUser(ctx.user.id);
    redirect("/login");
})