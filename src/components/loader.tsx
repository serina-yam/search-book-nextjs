import { Loader2 } from 'lucide-react'

export function Loader() {
  return (
    <div className="text-white rounded-lg hover:bg-white/25 focus:bg-white/25 w-8 h-8 aspect-square flex items-center justify-center ring-0 outline-0">
      <Loader2 size={16} color="#ffffff" className="animate-spin" />
    </div>
  )
}
