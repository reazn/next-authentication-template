import "server-only"

import { cache } from "react"
import { cookies } from "next/headers"
import { lucia } from "@/server/auth"
import { validateRequest } from "@/server/auth/validate-request"

import { getIp, getUserAgent } from "@/lib/headers"

export const getCurrentUser = cache(async () => {
  const session = await validateRequest()

  if (!session.user) {
    return undefined
  }

  return session.user || undefined
})

export const assertAuthenticated = async () => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not authenticated")
  }
  return user
}

export const setSession = async (userId: string) => {
  const session = await lucia.createSession(userId, {
    userAgent: getUserAgent(),
    ip: getIp(),
  })

  const sessionCookie = lucia.createSessionCookie(session.id)

  console.log(sessionCookie, "session cookie")
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
}
