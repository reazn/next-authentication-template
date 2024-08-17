"use client"

import { useState } from "react"
import { User } from "@/server/db/types"
import { api } from "@/trpc/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const ChangeEmail = ({ user }: { user: User }) => {
  const [email, setEmail] = useState("")

  const changeEmail = api.user.changeEmail.useMutation()

  // TODO form with validation for email

  return (
    <div>
      <Input
        placeholder={user.email || ""}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={() => changeEmail.mutate({ email })}>Save</Button>
    </div>
  )
}
