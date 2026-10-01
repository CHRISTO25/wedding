import { RotateCcw } from 'lucide-react'

export function SiteFooter({ onReplay }: { onReplay: () => void }) {
  return (
    <footer className="flex flex-col items-center gap-4 px-6 py-16 text-center">
      <p className="font-script text-4xl gold-text">A &amp; J</p>
      <p className="text-sm tracking-[0.35em] text-muted-foreground uppercase">06 · 12 · 2027</p>
      <button
        type="button"
        onClick={onReplay}
        className="mt-2 inline-flex items-center gap-2 text-sm tracking-[0.25em] text-gold-deep uppercase underline-offset-4 hover:underline"
      >
        <RotateCcw aria-hidden="true" className="size-4" />
        Replay invitation
      </button>
    </footer>
  )
}
