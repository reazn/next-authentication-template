"use server"

import { z } from "zod";
import { unauthenticatedAction } from "@/auth/safe-actions";
import { setSession } from "@/auth/session";
import { redirect } from "next/navigation";
import { createUser } from "@/data-access/users";

export const signUpAction = unauthenticatedAction
.createServerAction()
.input(
	z.object({
		username: z.string().min(3).max(20).optional().or(z.literal("")),
		email: z.string().email(),
		password: z.string().min(8).max(255),
	})
)
.handler(async ({ input }) => {
	// TODO rate limit
	// TODO register function instead WITH validation

	const user = await createUser({
		username: input.username,
		email: input.email,
		password: input.password,
	})

	await setSession(user.id)
	return redirect("/")
})
