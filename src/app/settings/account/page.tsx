import React, { cache } from "react"
import { getCurrentUser } from "@/auth/session"
import { getProfile } from "@/data-access/profiles"

import { DeleteAccount } from "./delete-account"

const userProfile = cache(getProfile)

export default async function AccountPage() {
  const user = await getCurrentUser()
  const profile = await userProfile({ userId: user?.id })
  if (!profile) return null

  return (
    <section className="flex flex-col gap-4">
      <div>Email</div>
      <div>Auth connections component</div>
      <DeleteAccount profile={profile} />
    </section>
  )
}
