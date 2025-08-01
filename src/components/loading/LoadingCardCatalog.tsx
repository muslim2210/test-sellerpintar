import { Skeleton } from "@/components/ui/skeleton"

export function LoadingCardCatalog() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[170px] max-w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  )
}
