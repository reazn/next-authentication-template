import { accounts, profiles, sessions, users } from "@/db/schema"
import type { InferSelectModel } from "drizzle-orm"

export type Profile = InferSelectModel<typeof profiles>
export type User = InferSelectModel<typeof users>
export type Session = InferSelectModel<typeof sessions>
export type Account = InferSelectModel<typeof accounts>
