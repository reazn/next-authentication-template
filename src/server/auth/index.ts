import { db } from "@/server/db"
import { sessions, users } from "@/server/db/schema"
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"
import { Lucia } from "lucia"

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseSessionAttributes: DatabaseSessionAttributes
  }
  interface DatabaseSessionAttributes {
    id: string
    user_agent: string
    ip: string
  }
}

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attribute) => {
    return {
      id: attribute.id,
    }
  },
  getSessionAttributes: (attribute) => {
    // TODO Don't return
    return {
      userAgent: attribute.user_agent,
      ip: attribute.ip,
    }
  },
})
