import { getCurrentUser } from "@/auth/session"
import { validateRequest } from "@/auth/validate-request"

export default async function Home() {
  const { user } = await validateRequest()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{user?.id}</h1>
    </main>
  )
}
