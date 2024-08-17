import { redirect } from "next/navigation"
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc"
import { setSession } from "@/server/auth/session"
import { sessions, users } from "@/server/db/schema"
import { api } from "@/trpc/server"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { verifyPassword } from "@/lib/hash"

export const loginRouter = createTRPCRouter({
  test: publicProcedure
    .input(z.object({ message: z.string() }))
    .query(async ({ ctx, input }) => {
      return input.message
    }),

  email: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8).max(255),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // TODO rate limit

      const user = await ctx.db.query.users.findFirst({
        where: eq(users.email, input.email),
      })

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Incorrect email or password",
        })
      }

      if (!user.password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Incorrect email or password",
        })
      }

      const validPassword = await verifyPassword(user.password, input.password)

      if (!validPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Incorrect email or password",
        })
      }

      // TODO delay to prevent timing attacks

      return await setSession(user.id)
    }),
})
