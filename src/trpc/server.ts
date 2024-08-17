import "server-only"

import { cache } from "react"
import { headers } from "next/headers"
import { createCaller, type AppRouter } from "@/server/api/root"
import { createTRPCContext } from "@/server/api/trpc"
import { createQueryClient } from "@/trpc/query-client"
import { createHydrationHelpers } from "@trpc/react-query/rsc"

const createContext = cache(() => {
  const heads = new Headers(headers())
  heads.set("x-trpc-source", "rsc")

  return createTRPCContext({
    headers: heads,
  })
})

const getQueryClient = cache(createQueryClient)
const caller = createCaller(createContext)

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient
)
