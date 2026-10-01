import type { CSSProperties } from 'react'
import { Feather } from 'lucide-react'
import { cn } from '@/lib/utils'

const seeded = (n: number) => {
  const x = Math.sin(n * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

const SPARKLES = Array.from({ length: 34 }, (_, i) => ({
  left: `${seeded(i) * 100}%`,
  size: 2 + seeded(i + 100) * 5,
  style: {
    '--dur': `${6 + seeded(i + 200) * 6}s`,
    '--delay': `${-seeded(i + 300) * 10}s`,
    '--drift': `${(seeded(i + 400) - 0.5) * 120}px`,
  } as CSSProperties,
}))

const FEATHERS = Array.from({ length: 7 }, (_, i) => ({
  left: `${8 + seeded(i + 500) * 84}%`,
  size: 18 + seeded(i + 600) * 14,
  style: {
    '--dur': `${9 + seeded(i + 700) * 6}s`,
    '--delay': `${-seeded(i + 800) * 12}s`,
    '--drift': `${(seeded(i + 900) - 0.5) * 160}px`,
  } as CSSProperties,
}))

export function AngelicParticles({ intense }: { intense: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-1000',
        intense ? 'opacity-100' : 'opacity-60',
      )}
    >
      {SPARKLES.map((sparkle, i) => (
        <span
          key={`sparkle-${i}`}
          className="sparkle-particle absolute bottom-0 rounded-full bg-white shadow-[0_0_10px_3px_rgb(249_226_160/0.9)]"
          style={{ left: sparkle.left, width: sparkle.size, height: sparkle.size, ...sparkle.style }}
        />
      ))}
      {FEATHERS.map((feather, i) => (
        <Feather
          key={`feather-${i}`}
          strokeWidth={1.2}
          className="feather-particle absolute top-0 text-white drop-shadow-[0_0_6px_rgb(201_162_75/0.8)]"
          style={{ left: feather.left, width: feather.size, height: feather.size, ...feather.style }}
        />
      ))}
    </div>
  )
}
