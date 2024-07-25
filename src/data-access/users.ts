import "server-only"
import { db } from "@/db"
import { profiles, users } from "@/db/schema"
import { hashPassword } from "@/lib/hash";
import { eq } from "drizzle-orm"
import { verify } from "@node-rs/argon2";
import { getProfile } from "./profiles";

export const createUser = async ({email, username, password}: {email: string, username: string, password?: string}) => {
  const emailExists = await getUser({email});

  if (emailExists) {
    throw new Error("The email you entered is already in use.")
  }

  const usernameExists = await getProfile({username});

  if (usernameExists) {
    throw new Error("That username is already taken.")
  }

  let hash: string | undefined;
  if (password) {
    hash = await hashPassword(password)
  }

  return await db.transaction(async (tx) => {
    const [user] = await tx.insert(users).values({
      email,
      [hash ? "password" : ""]: hash ? hash : undefined,
    }).returning()
  
    await tx.insert(profiles).values({
      userId: user.id,
      username,
    })

    return user
  })
}

export const deleteUser = async (userId: string) => {
  return await db.delete(users).where(eq(users.id, userId)).execute()
}

export const getUser = async ({userId, email}: {userId?: string; email?: string}) => {
  
  if (userId) {
    return await db.query.users.findFirst({
      where: eq(users.id, userId)
    })
  }

  if (email) {
    return await db.query.users.findFirst({
      where: eq(users.email, email)
    })
  }

  return undefined;
}

export const verifyPassword = async (hashedPassword: string, password: string) => {
	return await verify(hashedPassword, password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
};