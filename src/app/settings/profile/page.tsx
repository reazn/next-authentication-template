import React, { cache } from "react"
import { getCurrentUser } from "@/auth/session"
import { getProfile } from "@/data-access/profiles"

const userProfile = cache(getProfile)

export default async function ProfilePage() {
  const user = await getCurrentUser()
  const profile = await userProfile({ userId: user?.id })
  if (!profile) return null

  return (
    <section className="flex flex-col gap-4">
      <div>Name</div>
      <div>username</div>
      <div>profile image</div>
    </section>
  )
}
