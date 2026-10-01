'use client'

import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { X } from 'lucide-react'

function InterlockedRings({ size = 120, idPrefix }: { size?: number; idPrefix: string }) {
  const g = `${idPrefix}-gold`
  const h = `${idPrefix}-hi`
  return (
    <svg viewBox="0 0 160 110" width={size} height={(size * 110) / 160} className="overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fffbe6" />
          <stop offset="22%" stopColor="#f7d774" />
          <stop offset="48%" stopColor="#c08a1e" />
          <stop offset="70%" stopColor="#f3c54d" />
          <stop offset="100%" stopColor="#7a4e0c" />
        </linearGradient>
        <linearGradient id={h} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#8a5a10" />
          <stop offset="50%" stopColor="#fff7d1" />
          <stop offset="100%" stopColor="#b07a18" />
        </linearGradient>
      </defs>

      {/* back half of ring M (behind ring A) */}
      <circle cx="98" cy="62" r="34" fill="none" stroke={`url(#${g})`} strokeWidth="8" />
      {/* ring A */}
      <circle cx="62" cy="62" r="34" fill="none" stroke={`url(#${g})`} strokeWidth="8" />
      <circle cx="62" cy="62" r="30" fill="none" stroke={`url(#${h})`} strokeWidth="1.4" opacity="0.8" />
      {/* front arc of ring M over ring A, creating the interlock */}
      <path d="M 70 37 A 34 34 0 0 0 70 87" fill="none" stroke={`url(#${g})`} strokeWidth="8" strokeLinecap="round" />
      <circle cx="98" cy="62" r="30" fill="none" stroke={`url(#${h})`} strokeWidth="1.4" opacity="0.8" />

      {/* diamond on ring M */}
      <polygon points="98,14 108,24 98,32 88,24" fill="#eef8ff" stroke="#bfe3ff" strokeWidth="0.8" />
      <polygon points="98,14 98,32 88,24" fill="#ffffff" opacity="0.9" />
      <polygon points="98,14 108,24 98,32" fill="#9ed2f5" opacity="0.5" />

      <text x="58" y="71" textAnchor="middle" fontStyle="italic" fontWeight="600" fontSize="28" fill="#7a4e0c" className="font-serif">A</text>
      <text x="104" y="71" textAnchor="middle" fontStyle="italic" fontWeight="600" fontSize="28" fill="#7a4e0c" className="font-serif">M</text>

      {/* glints */}
      <g className="origin-[36px_40px] animate-[inv-sparkle-twinkle_2.4s_ease-in-out_infinite] motion-reduce:animate-none">
        <path d="M36 32 L38 40 L46 42 L38 44 L36 52 L34 44 L26 42 L34 40 Z" fill="#fff" />
      </g>
      <g className="origin-[126px_84px] animate-[inv-sparkle-twinkle_2.4s_ease-in-out_1.2s_infinite] motion-reduce:animate-none">
        <path d="M126 78 L127.5 83 L132 84 L127.5 85 L126 90 L124.5 85 L120 84 L124.5 83 Z" fill="#fff" />
      </g>
      <g className="origin-[98px_18px] animate-[inv-sparkle-twinkle_1.8s_ease-in-out_0.6s_infinite] motion-reduce:animate-none">
        <path d="M98 10 L99.5 16 L105 18 L99.5 20 L98 26 L96.5 20 L91 18 L96.5 16 Z" fill="#fff" />
      </g>
    </svg>
  )
}

const POPUP_HALOS = [
  'animate-[inv-halo-ring_1.4s_ease-out_forwards]',
  'animate-[inv-halo-ring_1.4s_ease-out_0.3s_forwards]',
]

export function TopRings() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const celebrate = () => {
    setOpen(true)
    const colors = ['#D4AF37', '#FFF4D6', '#FFFFFF', '#FBBF24', '#F4A3AD']
    confetti({ particleCount: 140, spread: 360, startVelocity: 32, origin: { x: 0.5, y: 0.45 }, colors, zIndex: 9999, scalar: 1.1 })
    setTimeout(
      () => confetti({ particleCount: 60, spread: 100, origin: { x: 0.5, y: 0.5 }, colors, zIndex: 9999, shapes: ['star'] }),
      250,
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={celebrate}
        aria-label="Austin and Merin wedding rings. Tap to celebrate"
        className="relative z-20 mb-4 animate-inv-rings-bob rounded-full p-2 outline-none transition-transform hover:scale-110 focus-visible:ring-4 focus-visible:ring-amber-300/70 active:scale-95 motion-reduce:animate-none"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-amber-200/40 blur-2xl" />
        <span className="block animate-inv-rings-glow motion-reduce:animate-none">
          <InterlockedRings idPrefix="top" size={124} />
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Austin and Merin"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#1a1206]/70 p-6 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[160vmax] w-[160vmax] animate-inv-rays-fast bg-[repeating-conic-gradient(from_0deg,rgba(255,230,160,0.5)_0deg_5deg,transparent_5deg_15deg)] opacity-60 [mask-image:radial-gradient(circle,black_0%,transparent_45%)] motion-reduce:animate-none" />
          {POPUP_HALOS.map((anim) => (
            <div
              key={anim}
              className={`pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 rounded-full border-2 border-amber-300 ${anim}`}
            />
          ))}

          <div
            className="relative w-full max-w-sm animate-inv-pop-in rounded-3xl border-2 border-amber-400/80 bg-gradient-to-b from-[#fffdf8] to-[#f8eed6] px-6 pb-8 pt-6 text-center shadow-[0_0_80px_rgba(251,191,36,0.6)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-full p-1.5 text-amber-800 transition hover:bg-amber-100"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex animate-inv-rings-glow-fast justify-center motion-reduce:animate-none">
              <InterlockedRings idPrefix="pop" size={190} />
            </div>
            <p className="mt-2 animate-[inv-fade-up_0.6s_ease-out_0.3s_both] font-sans text-[11px] font-bold uppercase tracking-[0.4em] text-amber-700">
              Two Rings · One Promise
            </p>
            <p className="mt-2 animate-[inv-fade-up_0.6s_ease-out_0.45s_both] font-script text-5xl text-neutral-900">
              {'Austin & Merin'}
            </p>
            <p className="mt-3 animate-[inv-fade-up_0.6s_ease-out_0.6s_both] font-serif text-sm italic leading-relaxed text-stone-700">
              {'"Therefore what God has joined together, let no one separate."'}
            </p>
            <p className="mt-3 animate-[inv-fade-up_0.6s_ease-out_0.75s_both] font-serif text-sm font-semibold tracking-widest text-amber-900">
              {'07 · 11 · 2026'}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
