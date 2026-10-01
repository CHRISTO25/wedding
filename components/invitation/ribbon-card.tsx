import { cn } from '@/lib/utils'
import { RibbonBow } from './ribbon-bow'

type RibbonCardProps = {
  untied: boolean
  leaving: boolean
  onUntie: () => void
}

const bandTransition = 'transition-all duration-[1100ms] ease-[cubic-bezier(0.6,0.05,0.3,1)]'

export function RibbonCard({ untied, leaving, onUntie }: RibbonCardProps) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-8 px-6">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 size-[min(120vw,760px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(233_200_122/0.35)_0%,transparent_65%)] animate-glow"
      />

      <button
        type="button"
        onClick={onUntie}
        disabled={untied}
        aria-label="Untie the ribbon to open the invitation"
        className={cn(
          'group relative aspect-[5/7] w-[min(84vw,380px)] cursor-pointer rounded-sm outline-offset-8 transition-all duration-[900ms] ease-out disabled:cursor-default',
          untied && 'shadow-[0_0_80px_rgb(233_200_122/0.6)]',
          leaving && 'scale-110 opacity-0 blur-sm',
        )}
      >
        <InvitationFace />

        <span
          aria-hidden="true"
          className={cn(
            'satin-v absolute left-1/2 top-0 h-1/2 w-10 -translate-x-1/2',
            bandTransition,
            untied && '-translate-y-[130%] opacity-0',
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            'satin-v absolute bottom-0 left-1/2 h-1/2 w-10 -translate-x-1/2',
            bandTransition,
            untied && 'translate-y-[130%] opacity-0',
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            'satin-h absolute left-0 top-1/2 h-10 w-1/2 -translate-y-1/2',
            bandTransition,
            untied && '-translate-x-[130%] opacity-0',
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            'satin-h absolute right-0 top-1/2 h-10 w-1/2 -translate-y-1/2',
            bandTransition,
            untied && 'translate-x-[130%] opacity-0',
          )}
        />

        <RibbonBow untied={untied} />
      </button>

      <p
        className={cn(
          'relative text-center text-sm tracking-[0.35em] text-gold-deep uppercase transition-opacity duration-500',
          untied ? 'opacity-0' : 'animate-pulse',
        )}
      >
        Touch the ribbon to untie
      </p>
    </div>
  )
}

function InvitationFace() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-sm bg-[linear-gradient(160deg,#ffffff_0%,#fbf7ee_60%,#f3ead6_100%)] shadow-[0_30px_60px_-20px_rgb(90_65_20/0.45)]">
      <div className="absolute inset-3 rounded-[2px] border border-gold/70" />
      <div className="absolute inset-5 rounded-[2px] border border-gold/40" />
      {(['left-4 top-4', 'right-4 top-4 rotate-90', 'right-4 bottom-4 rotate-180', 'left-4 bottom-4 -rotate-90'] as const).map(
        (position) => (
          <CornerFlourish key={position} className={position} />
        ),
      )}

      <div className="relative flex h-full flex-col items-center justify-between px-8 py-12 text-center">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[0.65rem] tracking-[0.4em] text-muted-foreground uppercase">
            Together with their families
          </p>
          <h1 className="font-script text-5xl leading-tight text-balance gold-text animate-shimmer md:text-6xl">
            Amelia
            <span className="block text-3xl md:text-4xl">&amp;</span>
            Julian
          </h1>
        </div>

        <p className="max-w-[16rem] text-base italic leading-relaxed text-foreground/80">
          request the honour of your presence at the celebration of their marriage
        </p>

        <div className="flex flex-col items-center gap-1">
          <p className="text-xs tracking-[0.35em] text-gold-deep uppercase">Saturday</p>
          <p className="text-2xl font-medium tracking-wide">June 12, 2027</p>
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Villa Aurelia · Rome</p>
        </div>
      </div>
    </div>
  )
}

function CornerFlourish({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className={cn('absolute size-8 text-gold', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M2 38 V10 Q2 2 10 2 H38" />
      <path d="M8 38 V14 Q8 8 14 8 H38" opacity="0.6" />
      <circle cx="10" cy="10" r="2" fill="currentColor" stroke="none" />
    </svg>
  )
}
