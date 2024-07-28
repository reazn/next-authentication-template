import { redirect } from "next/navigation"
import { getCurrentUser } from "@/auth/session"

import { Header } from "@/components/header"

import { Tabs } from "./tabs"

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  return (
    <>
      <Header />
      <div className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 text-2xl font-medium">
          Account Settings
        </div>
        <hr />
        <div className="m-8 mx-auto flex max-w-6xl gap-4 px-4">
          <div className="relative basis-[20%]">
            <Tabs />
          </div>
          <section className="flex flex-1 flex-col">{children}</section>
        </div>
      </div>
    </>
  )
}
