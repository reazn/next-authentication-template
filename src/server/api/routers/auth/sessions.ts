import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc"
import { sessions } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"

export const sessionRouter = createTRPCRouter({
  getSession: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      // TODO user check
      if (ctx.session.session.id !== input.sessionId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to perform this action.",
        })
      }
      return await ctx.db.query.sessions
        .findFirst({
          where: eq(sessions.id, input.sessionId),
        })
        .execute()
    }),

  getSessions: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (ctx.session.user.id !== input.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to perform this action.",
        })
      }

      return await ctx.db.query.sessions
        .findMany({
          where: eq(sessions.userId, input.userId),
        })
        .execute()
    }),

  deleteSession: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ ctx, input }) => {
      // TODO user check

      return await ctx.db
        .delete(sessions)
        .where(eq(sessions.id, input.sessionId))
        .execute()
    }),
})
