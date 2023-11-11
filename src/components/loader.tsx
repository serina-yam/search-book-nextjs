import { Loader2 } from 'lucide-react'

export function Loader() {
  return (
    <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-lg text-white outline-0 ring-0 hover:bg-white/25 focus:bg-white/25">
      <Loader2 size={16} color="#ffffff" className="animate-spin" />
    </div>
  )
}
