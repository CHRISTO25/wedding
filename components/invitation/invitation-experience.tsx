'use client'

import { useEffect, useState } from 'react'
import { RibbonCard } from './ribbon-card'
import { HeavenlyDoors } from './heavenly-doors'
import { WeddingSite } from '@/components/site/wedding-site'

type Stage = 'card' | 'untying' | 'leaving' | 'doors' | 'opening' | 'radiant' | 'site'

const NEXT_STAGE: Partial<Record<Stage, { next: Stage; after: number }>> = {
  untying: { next: 'leaving', after: 1500 },
  leaving: { next: 'doors', after: 900 },
  doors: { next: 'opening', after: 1300 },
  opening: { next: 'radiant', after: 2300 },
  radiant: { next: 'site', after: 1100 },
}

export function InvitationExperience() {
  const [stage, setStage] = useState<Stage>('card')

  useEffect(() => {
    const step = NEXT_STAGE[stage]
    if (!step) return
    const timer = window.setTimeout(() => setStage(step.next), step.after)
    return () => window.clearTimeout(timer)
  }, [stage])

  const showCard = stage === 'card' || stage === 'untying' || stage === 'leaving'
  const showDoors = stage === 'doors' || stage === 'opening' || stage === 'radiant'

  if (stage === 'site') {
    return (
      <>
        <WeddingSite onReplay={() => setStage('card')} />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 bg-white animate-white-out"
        />
      </>
    )
  }

  return (
    <main className="fixed inset-0 overflow-hidden bg-ivory">
      {showCard && (
        <RibbonCard
          untied={stage !== 'card'}
          leaving={stage === 'leaving'}
          onUntie={() => setStage('untying')}
        />
      )}
      {showDoors && <HeavenlyDoors phase={stage === 'doors' ? 'closed' : stage} />}

      <button
        type="button"
        onClick={() => setStage('site')}
        className="absolute right-5 top-5 z-50 rounded-full border border-gold/50 bg-white/60 px-4 py-1.5 text-sm tracking-[0.2em] text-gold-deep uppercase backdrop-blur-sm transition-colors hover:bg-white"
      >
        Skip
      </button>
    </main>
  )
}
