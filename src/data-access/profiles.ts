import "server-only"

import { db } from "@/db"
import { profiles, users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const createProfile = async (userId: string, username: string) => {
  const [profile] = await db
    .insert(profiles)
    .values({
      userId,
      username,
    })
    .onConflictDoNothing()
    .returning()

  return profile
}

export const getProfile = async ({
  userId,
  email,
  username,
}: {
  userId?: string
  email?: string
  username?: string
}) => {
  // await new Promise((resolve) => setTimeout(resolve, 10000))
  let profile

  if (userId) {
    profile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, userId),
    })
  }

  if (username) {
    profile = db.query.profiles.findFirst({
      where: eq(profiles.username, username),
    })
  }

  if (email) {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (!user) throw new Error("Profile not found")

    profile = db.query.profiles.findFirst({
      where: eq(profiles.userId, user.id),
    })
  }

  return profile
}

export const checkAvailableUsername = async (username: string) => {
  return await db.query.profiles.findFirst({
    where: eq(profiles.username, username),
  })!!
}
