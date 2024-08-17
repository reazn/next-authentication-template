"use client"

import { Session } from "@/server/db/types"
import { api } from "@/trpc/react"
import { format } from "date-fns"
import { LogOutIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export const Sessions = ({ sessions }: { sessions: Session[] }) => {
  // const { data: sessions } = api.auth.session.getSessions.useQuery({
  // userId: profile.userId,
  // })

  return (
    <table>
      <thead>
        <tr>
          <th>Expires at</th>
          <th>IP Address</th>
          <th>Device</th>
          {/* <th>Location</th> */}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sessions?.map((session) => (
          <tr key={session.id}>
            <td>{format(session.expiresAt, "MMM d, yyyy, h:mm a")}</td>
            <td>{session.ip}</td>
            <td>{session.userAgent}</td>
            <td>
              <Button
                variant="secondary"
                size="icon"
                className="hover:text-destructive"
                type="submit"
              >
                <LogOutIcon className="h-4 w-4" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
