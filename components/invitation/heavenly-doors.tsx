import Image from 'next/image'
import { Sparkle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AngelicParticles } from './angelic-particles'

type DoorPhase = 'closed' | 'opening' | 'radiant'

export function HeavenlyDoors({ phase }: { phase: DoorPhase }) {
  const isOpen = phase !== 'closed'

  return (
    <div className="absolute inset-0 animate-in fade-in duration-1000">
      <Image
        src="/images/heaven-clouds.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className={cn(
          'object-cover transition-all duration-[2400ms]',
          isOpen ? 'scale-110 opacity-90' : 'scale-100 opacity-70',
        )}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(251_247_238/0.85)_100%)]" />

      <div
        aria-hidden="true"
        className={cn(
          'absolute left-1/2 top-1/2 size-[220vmax] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-[2000ms]',
          isOpen ? 'opacity-100' : 'opacity-30',
        )}
      >
        <div className="light-rays size-full animate-rays" />
      </div>

      <AngelicParticles intense={isOpen} />

      <div className="relative flex h-full flex-col items-center justify-center gap-6 px-6">
        <p
          className={cn(
            'font-script text-4xl gold-text animate-shimmer transition-all duration-1000 md:text-5xl',
            isOpen ? '-translate-y-2 opacity-0' : 'opacity-100',
          )}
        >
          Welcome
        </p>

        <div className="relative h-[min(68vh,600px)] aspect-[5/8] max-w-[86vw]">
          <div className="gold-surface absolute inset-0 rounded-t-full p-[10px] shadow-[0_40px_80px_-30px_rgb(90_65_20/0.6)]">
            <div className="absolute inset-[4px] rounded-t-full border border-white/60" />
            <div className="relative h-full w-full overflow-hidden rounded-t-full [perspective:1600px]">
              <div className="heaven-light absolute inset-0" />
              <div
                aria-hidden="true"
                className={cn(
                  'absolute inset-0 bg-white transition-opacity duration-[2400ms]',
                  isOpen ? 'opacity-70' : 'opacity-0',
                )}
              />
              <DoorPanel side="left" open={isOpen} />
              <DoorPanel side="right" open={isOpen} />
            </div>
          </div>

          <div className="gold-surface absolute -top-4 left-1/2 flex size-9 -translate-x-1/2 rotate-45 items-center justify-center shadow-md">
            <Sparkle aria-hidden="true" className="size-4 -rotate-45 fill-white text-white" />
          </div>

          <div className="gold-surface absolute -bottom-3 left-1/2 h-3 w-[118%] -translate-x-1/2 rounded-sm shadow-md" />
        </div>
      </div>

      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 bg-white transition-opacity duration-[1100ms] ease-in',
          phase === 'radiant' ? 'opacity-100' : 'opacity-0',
        )}
      />
      <p className="sr-only" aria-live="polite">
        {isOpen ? 'The doors are opening' : 'Golden doors appear'}
      </p>
    </div>
  )
}

function DoorPanel({ side, open }: { side: 'left' | 'right'; open: boolean }) {
  const isLeft = side === 'left'

  return (
    <div
      className={cn(
        'door-panel absolute inset-y-0 w-1/2',
        isLeft ? 'left-0 origin-left border-r border-gold/60' : 'right-0 origin-right border-l border-gold/60',
        open && 'brightness-110',
      )}
      style={{ transform: open ? `rotateY(${isLeft ? 96 : -96}deg)` : 'rotateY(0deg)' }}
    >
      <div className="absolute inset-x-[18%] top-[24%] h-[34%] rounded-t-full border-2 border-gold/70 shadow-[inset_0_0_0_4px_rgb(255_255_255),inset_0_0_0_5px_rgb(201_162_75/0.4)]" />
      <div className="absolute inset-x-[18%] top-[63%] h-[26%] rounded-[3px] border-2 border-gold/70 shadow-[inset_0_0_0_4px_rgb(255_255_255),inset_0_0_0_5px_rgb(201_162_75/0.4)]" />
      <div
        className={cn(
          'gold-surface absolute top-[52%] h-[9%] w-[6%] rounded-full shadow-sm',
          isLeft ? 'right-[8%]' : 'left-[8%]',
        )}
      />
    </div>
  )
}
