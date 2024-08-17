import React, { cache } from "react"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/server/auth/session"
import { api } from "@/trpc/server"

import { ChangeEmail } from "./change-email"
import { DeleteAccount } from "./delete-account"
import { Sessions } from "./sessions"

export default async function AccountPage() {
  const currentUser = await getCurrentUser()

  const user = await api.user.getUser({ userId: currentUser?.id })
  const profile = await api.profile.getProfile({ userId: currentUser?.id })

  // TODO maybe a login redirect?
  if (!profile || !currentUser || !user) {
    return redirect("/")
  }

  const sessions = await api.auth.session.getSessions({
    userId: currentUser.id,
  })

  return (
    <section className="flex flex-col gap-4">
      <ChangeEmail user={user} />
      <div>Auth connections component</div>
      <Sessions sessions={sessions} />
      <DeleteAccount profile={profile} />
    </section>
  )
}
