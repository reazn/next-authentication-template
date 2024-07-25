import { relations } from "drizzle-orm";
import { pgTable, timestamp, text, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const users = pgTable("user", {
  id: varchar("id", { length: 128 }).$defaultFn(() => createId()).notNull().primaryKey(),
  email: text("email").unique(),
  emailVerified: timestamp("email_verified"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const accounts = pgTable("account", {
  id: varchar('id', { length: 128 }).$defaultFn(() => createId()).notNull().primaryKey(),
  userId: varchar("user_id", { length: 128 }).notNull().references(() => users.id, { onDelete: "cascade"}),
  provider: text("provider").notNull(),
  providerId: text("provider_id").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
})

export const profiles = pgTable("profile", {
  id: varchar('id', { length: 128 }).$defaultFn(() => createId()).notNull().primaryKey(),
  userId: varchar("user_id", { length: 128 }).notNull().references(() => users.id, { onDelete: "cascade"}),
  username: varchar("username", { length: 20 }).notNull().unique(),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const sessions = pgTable("session", {
  id: varchar("id", { length: 128 }).notNull().primaryKey(),
  userId: varchar("user_id", { length: 128 }).$defaultFn(() => createId()).notNull().references(() => users.id, { onDelete: "cascade"}),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  userAgent: text("user_agent"),
  ip: text("ip"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const usersRelations = relations(users, ({ one }) => ({
  profiles: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
}));