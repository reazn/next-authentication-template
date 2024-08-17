import { loginRouter } from "@/server/api/routers/auth/login"
import { sessionRouter } from "@/server/api/routers/auth/sessions"
import { profileRouter } from "@/server/api/routers/profiles"
import { userRouter } from "@/server/api/routers/users"
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc"

export const appRouter = createTRPCRouter({
  user: userRouter,
  profile: profileRouter,
  auth: {
    login: loginRouter,
    session: sessionRouter,
  },
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
