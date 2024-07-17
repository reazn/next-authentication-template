import { db } from "@/db"
import { users } from "@/db/schema"
import { hashPassword } from "@/lib/hash";
import { eq } from "drizzle-orm"

export const createUser = async ({email, username, password}: {email: string, username?: string, password?: string}) => {
  const exists = await getUserByEmail(email);

  if (exists) {
    throw new Error("The email you entered is already in use.")
  }

  if (!username) {
    username = email.split("@")[0]
  }

  // TODO check if username is taken

  let hash;
  if (password) {
    hash = await hashPassword(password)
  }

  const [user] = await db.insert(users).values({
    email,
    username, 
    [hash ? "password" : ""]: hash ? hash : undefined,
  }).returning()

  return user;
}

export const getUserByEmail = async (email: string) => {
  return await db.query.users.findFirst({
    where: eq(users.email, email)
  })
}