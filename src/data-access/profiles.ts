import "server-only"
import { db } from "@/db"
import { profiles, users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const createProfile = async (userId: string, username: string) => {
  const [profile] = await db.insert(profiles).values({
    userId,
    username,
  }).onConflictDoNothing().returning()

  return profile;
}

export const getProfile = async ({userId, email, username}: {userId?: string; email?: string; username?: string}) => {
  if (userId) {
    return await db.query.profiles.findFirst({
      where: eq(profiles.userId, userId)
    })
  }

  if (username) {
    return await db.query.profiles.findFirst({
      where: eq(profiles.username, username)
    })
  }

  if (email) {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    if (!user) return undefined;
    
    return await db.query.profiles.findFirst({
      where: eq(profiles.userId, user.id)
    })
  }
  
  throw new Error("Profile not found");
}

export const checkAvailableUsername = async (username: string) => {
  return await db.query.profiles.findFirst({
    where: eq(profiles.username, username)
  })!!;
}