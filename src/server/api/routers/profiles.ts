import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc"
import { profiles, users } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"

export const profileRouter = createTRPCRouter({
  // createProfile: protectedProcedure
  //   .input(
  //     z.object({
  //       userId: z.string(),
  //       username: z.string(),
  //     })
  //   )
  //   .query(async ({ ctx, input }) => {
  //     const [profile] = await ctx.db
  //       .insert(profiles)
  //       .values({
  //         userId: input.userId,
  //         username: input.username,
  //       })
  //       .onConflictDoNothing()
  //       .returning()

  //     return profile
  //   }),

  getProfile: protectedProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        email: z.string().optional(),
        username: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      let profile

      if (input.userId) {
        profile = await ctx.db.query.profiles.findFirst({
          where: eq(profiles.userId, input.userId),
        })
      }

      if (input.username) {
        profile = ctx.db.query.profiles.findFirst({
          where: eq(profiles.username, input.username),
        })
      }

      if (input.email) {
        const user = await ctx.db.query.users.findFirst({
          where: eq(users.email, input.email),
        })

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Profile not found",
          })
        }

        profile = ctx.db.query.profiles.findFirst({
          where: eq(profiles.userId, user.id),
        })
      }

      if (!profile) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Profile not found" })
      }

      return profile
    }),

  checkUsername: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.profiles.findFirst({
        where: eq(profiles.username, input),
      })!!
    }),
})
