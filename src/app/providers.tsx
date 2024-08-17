import { TRPCReactProvider } from "@/trpc/react"

export default function Providers({ children }: { children: React.ReactNode }) {
  return <TRPCReactProvider>{children}</TRPCReactProvider>
}
