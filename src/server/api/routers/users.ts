import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc"
import { profiles, users, usersRelations } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { hashPassword } from "@/lib/hash"

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        username: z.string(),
        password: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const emailExists = await ctx.db.query.users.findFirst({
        where: eq(users.email, input.email),
      })

      if (emailExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "The email you entered is already in use.",
        })
      }

      // TODO get profile
      const usernameExists = await getProfile({ username })

      if (usernameExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "That username is already taken.",
        })
      }

      let hash: string | undefined

      if (input.password) {
        hash = await hashPassword(input.password)
      }

      return await ctx.db.transaction(async (tx) => {
        const [user] = await tx
          .insert(users)
          .values({
            email: input.email,
            [hash ? "password" : ""]: hash ? hash : undefined,
          })
          .returning()

        await tx.insert(profiles).values({
          userId: user.id,
          username: input.username,
        })

        return user
      })
    }),

  getUser: protectedProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        email: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      // TODO dont return password etc
      if (input.userId) {
        return await ctx.db.query.users.findFirst({
          where: eq(users.id, input.userId),
        })
      }

      if (input.email) {
        return await ctx.db.query.users.findFirst({
          where: eq(users.email, input.email),
        })
      }

      return undefined
    }),

  deleteUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // TODO allow "admins" to delete accounts
      if (ctx.session.user.id !== input.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to perform this action.",
        })
      }
      return await ctx.db
        .delete(users)
        .where(eq(users.id, input.userId))
        .execute()
    }),

  changeEmail: protectedProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      // TODO check for already used emails
      return await ctx.db
        .update(users)
        .set({ email: input.email })
        .where(eq(users.id, ctx.session.user.id))
    }),
})
