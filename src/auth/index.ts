import { Lucia } from "lucia"
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"
import { db } from "@/db"
import { sessions, users } from "@/db/schema"
import { env } from "@/env"

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      id: string;
    };
  }
  interface DatabaseSessionAttributes {
    user_agent: string;
    ip: string;
  }
}

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    }
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
