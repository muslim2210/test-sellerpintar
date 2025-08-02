// components/LoadingSpinner.tsx
export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col gap-4 items-center justify-center bg-black/50">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#1E3A8A] border-t-transparent"></div>
      <h5 className="font-semibold text-white">Loading ...</h5>
    </div>
  )
}
