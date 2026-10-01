'use client'

import { useEffect, useState } from 'react'

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now())
  return [
    { label: 'Days', value: Math.floor(diff / 86_400_000) },
    { label: 'Hours', value: Math.floor((diff / 3_600_000) % 24) },
    { label: 'Minutes', value: Math.floor((diff / 60_000) % 60) },
    { label: 'Seconds', value: Math.floor((diff / 1000) % 60) },
  ]
}

export function Countdown({ target }: { target: string }) {
  const targetTime = new Date(target).getTime()
  const [units, setUnits] = useState(() => getRemaining(targetTime))

  useEffect(() => {
    const interval = window.setInterval(() => setUnits(getRemaining(targetTime)), 1000)
    return () => window.clearInterval(interval)
  }, [targetTime])

  return (
    <dl className="mt-4 grid grid-cols-4 gap-3 md:gap-5" aria-label="Countdown to the wedding">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex min-w-16 flex-col items-center rounded-sm border border-gold/50 bg-white/70 px-3 py-3 backdrop-blur-sm md:min-w-20"
        >
          <dd className="text-3xl font-medium tabular-nums text-foreground md:text-4xl">
            {String(unit.value).padStart(2, '0')}
          </dd>
          <dt className="order-last text-[0.6rem] tracking-[0.3em] text-gold-deep uppercase">{unit.label}</dt>
        </div>
      ))}
    </dl>
  )
}
