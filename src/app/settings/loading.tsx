import { Skeleton } from "@/components/ui/skeleton"

export default function AccountLoading() {
  return (
    <section className="flex flex-col gap-4">
      <Skeleton className="h-[130px] w-full rounded-xl" />
      <Skeleton className="h-[180px] w-full rounded-xl" />
      <Skeleton className="h-[130px] w-full rounded-xl" />
      <Skeleton className="h-[210px] w-full rounded-xl" />
      <Skeleton className="h-[170px] w-full rounded-xl" />
    </section>
  )
}
