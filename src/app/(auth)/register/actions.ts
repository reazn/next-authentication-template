"use server"

import { z } from "zod";
import { unauthenticatedAction } from "@/auth/safe-actions";
import { setSession } from "@/auth/session";
import { redirect } from "next/navigation";
import { createUser } from "@/data-access/users";
import { passwordValidation } from "@/auth/validation";

export const registerAction = unauthenticatedAction
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
