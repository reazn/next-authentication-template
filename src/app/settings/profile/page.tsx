import React, { cache } from "react"
// import { getProfile } from "@/data-access/profiles"
import { getCurrentUser } from "@/server/auth/session"

// const userProfile = cache(getProfile)

export default async function ProfilePage() {
  // const user = await getCurrentUser()
  // const profile = await userProfile({ userId: user?.id })
  // if (!profile) return null

  return (
    <section className="flex flex-col gap-4">
      <div>Name</div>
      <div>username</div>
      <div>profile image</div>
    </section>
  )
}
