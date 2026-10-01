'use client'

import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { SatinBow } from './satin-bow'
import { FallingPetals } from './falling-petals'

type Stage = 'idle' | 'untying' | 'doors' | 'ambiance' | 'turn' | 'finale' | 'exit'

const ORDER: Stage[] = ['idle', 'untying', 'doors', 'ambiance', 'turn', 'finale', 'exit']
const TIMELINE: [Stage, number][] = [
  ['doors', 1500],
  ['ambiance', 2600],
  ['turn', 5000],
  ['finale', 7000],
  ['exit', 8200],
]
const COMPLETE_AT = 9100

const FOIL_TEXT =
  'animate-inv-foil bg-[linear-gradient(110deg,#6b4a12_0%,#b8892c_30%,#f7e1a1_45%,#b8892c_60%,#6b4a12_100%)] bg-[length:200%_100%] bg-clip-text font-script text-[2.9rem] leading-[1.05] text-transparent motion-reduce:animate-none sm:text-[3.4rem]'

const FINALE_HALOS = [
  'animate-inv-halo',
  'animate-[inv-halo-ring_1.6s_ease-out_0.25s_forwards]',
  'animate-[inv-halo-ring_1.6s_ease-out_0.5s_forwards]',
]

function RibbonHalf({ side, untied }: { side: 'left' | 'right'; untied: boolean }) {
  const position = side === 'left' ? 'left-0' : 'right-0'
  const pulled = side === 'left' ? '-translate-x-[110%] rotate-3' : 'translate-x-[110%] -rotate-3'

  return (
    <div
      className={`absolute top-[60%] h-11 w-1/2 -translate-y-1/2 overflow-hidden bg-[linear-gradient(180deg,#4a0a14_0%,#8e1d2e_14%,#c9384b_30%,#ffc2ca_46%,#e0566a_58%,#9d2335_78%,#4a0a14_100%)] shadow-[0_6px_14px_rgba(60,5,15,0.45),inset_0_1px_0_rgba(255,255,255,0.25)] transition-transform duration-[1100ms] ease-[cubic-bezier(0.6,0,0.3,1)] ${position} ${
        untied ? pulled : ''
      }`}
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.25)_0_1px,transparent_1px_3px)] opacity-30 mix-blend-multiply" />
      <div className="absolute inset-0 animate-inv-sheen bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.55)_50%,transparent_65%)] bg-[length:200%_100%] motion-reduce:animate-none" />
      <div className="absolute inset-x-0 bottom-[5px] top-[5px] border-y border-dashed border-[#f6d6a0]/60" />
    </div>
  )
}

function DoorPanel({ side, open }: { side: 'left' | 'right'; open: boolean }) {
  const isLeft = side === 'left'
  return (
    <div
      className={`absolute top-0 h-full w-1/2 overflow-hidden transition-transform duration-1000 ease-[cubic-bezier(0.7,0,0.3,1)] ${
        isLeft
          ? 'left-0 origin-left shadow-[inset_-10px_0_20px_rgba(0,0,0,0.25),20px_0_40px_rgba(0,0,0,0.6)]'
          : 'right-0 origin-right shadow-[inset_10px_0_20px_rgba(0,0,0,0.25),-20px_0_40px_rgba(0,0,0,0.6)]'
      } ${open ? (isLeft ? '-rotate-y-104' : 'rotate-y-104') : 'rotate-y-0'}`}
    >
      <img
        src="/images/door-panel.png"
        alt=""
        className={`h-full w-full object-cover ${isLeft ? 'scale-103' : '-scale-x-103 scale-y-103'}`}
      />
      <div
        className={`absolute inset-y-0 w-2 bg-gradient-to-b from-[#fff2b8] via-[#c9972e] to-[#7a5513] ${
          isLeft ? 'right-0' : 'left-0'
        }`}
      />
      <div
        className={`absolute inset-0 via-transparent from-black/25 to-white/10 ${
          isLeft ? 'bg-gradient-to-r' : 'bg-gradient-to-l'
        }`}
      />
    </div>
  )
}

export function CinematicEntrance({
  onStart,
  onComplete,
}: {
  onStart?: () => void
  onComplete?: () => void
}) {
  const [stage, setStage] = useState<Stage>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [])

  const fireMarriageConfetti = () => {
    const colors = ['#D4AF37', '#FFF4D6', '#FFFFFF', '#F4A3AD', '#FBBF24']
    const heart = confetti.shapeFromText ? confetti.shapeFromText({ text: '❤', scalar: 2 }) : undefined
    const base = { colors, ticks: 260, gravity: 0.7, scalar: 1.1, zIndex: 9999 }
    confetti({ ...base, particleCount: 120, angle: 60, spread: 70, origin: { x: 0, y: 0.75 } })
    confetti({ ...base, particleCount: 120, angle: 120, spread: 70, origin: { x: 1, y: 0.75 } })
    if (heart) {
      confetti({ ...base, shapes: [heart], particleCount: 40, spread: 160, startVelocity: 35, origin: { x: 0.5, y: 0.45 }, scalar: 2 })
    }
  }

  const begin = () => {
    if (stage !== 'idle') return
    onStart?.()
    setStage('untying')
    timers.current = [
      ...TIMELINE.map(([next, at]) =>
        setTimeout(() => {
          setStage(next)
          if (next === 'finale') fireMarriageConfetti()
        }, at),
      ),
      setTimeout(() => onComplete?.(), COMPLETE_AT),
    ]
  }

  const skip = () => {
    timers.current.forEach(clearTimeout)
    onComplete?.()
  }

  const reached = (s: Stage) => ORDER.indexOf(stage) >= ORDER.indexOf(s)
  const untied = reached('untying')
  const doorsOpen = reached('doors')
  const inAmbiance = reached('ambiance')
  const turned = reached('turn')
  const finale = reached('finale')
  const exiting = stage === 'exit'
  const cardVisible = stage === 'idle' || stage === 'untying'

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-[#0d0a06] transition-opacity duration-[900ms] ${
        exiting ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      aria-live="polite"
    >
      {/* ---------- Marriage ambiance (behind the doors) ---------- */}
      <div className="absolute inset-0" aria-hidden={!doorsOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/couple-back.png"
            alt="Bride and groom standing at the floral altar, facing away"
            className={`absolute inset-0 h-full w-full object-cover transition-[opacity,filter] duration-[1600ms] ease-in-out motion-reduce:animate-none ${
              doorsOpen ? 'animate-inv-ken-burns' : ''
            } ${turned ? 'opacity-0 blur-[10px] brightness-140' : 'opacity-100 blur-0 brightness-100'}`}
          />
          <img
            src="/images/couple-front.png"
            alt="Bride and groom turning around, smiling and holding hands"
            className={`absolute inset-0 h-full w-full object-cover transition-[opacity,filter,scale] duration-[1600ms] ease-in-out ${
              turned ? 'scale-104 opacity-100 blur-0 brightness-100' : 'scale-114 opacity-0 blur-[10px] brightness-140'
            }`}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(20,12,4,0.65)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1a1206]/85 to-transparent" />
        </div>

        {inAmbiance && <FallingPetals />}

        <div
          className={`absolute inset-x-0 bottom-[9%] px-6 text-center transition-opacity duration-700 ${
            turned ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {turned && (
            <>
              <p className="animate-[inv-names-rise_1.2s_ease-out_both] font-serif text-xs uppercase tracking-[0.5em] text-[#f6e3b4] sm:text-sm">
                The Wedding Of
              </p>
              <h2 className="mt-2 animate-[inv-names-rise_1.6s_ease-out_0.3s_both] font-script text-6xl text-white drop-shadow-[0_4px_24px_rgba(212,175,55,0.8)] sm:text-8xl">
                {'Austin & Merin'}
              </h2>
              <p className="mt-3 animate-[inv-names-rise_1.4s_ease-out_0.7s_both] font-serif text-sm italic tracking-widest text-[#f6e3b4]">
                {'07 · 11 · 2026'}
              </p>
            </>
          )}
        </div>

        {finale && (
          <>
            <div className="pointer-events-none absolute inset-0 animate-inv-flash bg-[radial-gradient(circle_at_center,#fffdf5_0%,#fff3cf_45%,rgba(255,236,170,0.6)_100%)]" />
            {FINALE_HALOS.map((anim) => (
              <div
                key={anim}
                className={`pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 rounded-full border-[3px] border-[#D4AF37] ${anim}`}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="animate-[inv-names-rise_0.9s_ease-out_both] font-serif text-xs uppercase tracking-[0.5em] text-[#8a6417]">
                Two Hearts · One Covenant
              </p>
              <p className="mt-2 animate-[inv-names-rise_1s_ease-out_0.15s_both] font-script text-6xl text-[#5c3d0e] sm:text-7xl">
                Welcome
              </p>
            </div>
          </>
        )}
      </div>

      {/* ---------- Light pouring through the doors ---------- */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${
          doorsOpen && !inAmbiance ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,#fffef8_0%,#fff1c9_35%,rgba(255,226,150,0.25)_70%,transparent_100%)] ${
            doorsOpen ? 'animate-inv-light-burst' : ''
          }`}
        />
        <div className="absolute left-1/2 top-1/2 h-[220vmax] w-[220vmax] animate-inv-rays bg-[repeating-conic-gradient(from_0deg,rgba(255,240,200,0.55)_0deg_4deg,transparent_4deg_14deg)] opacity-50 [mask-image:radial-gradient(circle,black_0%,transparent_55%)] motion-reduce:animate-none" />
      </div>

      {/* ---------- Full-screen white & gold doors ---------- */}
      <div
        className={`absolute inset-0 perspective-[2200px] transition-opacity duration-500 ${
          inAmbiance ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      >
        <DoorPanel side="left" open={doorsOpen} />
        <DoorPanel side="right" open={doorsOpen} />
        <div
          className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,250,235,0.15)_0%,rgba(40,28,10,0.35)_100%)] transition-opacity duration-700 ${
            untied ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* ---------- The invitation card ---------- */}
      <div
        className={`absolute inset-0 z-10 flex items-center justify-center p-4 perspective-[1400px] transition-all duration-700 ease-in ${
          cardVisible ? 'opacity-100' : 'pointer-events-none -translate-y-10 scale-90 opacity-0'
        }`}
      >
        <div className={`relative transform-3d motion-reduce:animate-none ${untied ? '' : 'animate-inv-card-float'}`}>
          <button
            type="button"
            onClick={begin}
            disabled={untied}
            aria-label="Untie the ribbon to open the wedding invitation of Austin and Merin"
            className="relative block aspect-[705/995] max-h-[86vh] w-[min(86vw,380px)] cursor-pointer select-none overflow-hidden rounded-[6px] bg-[url(/images/card-paper.png)] bg-[length:109%_138%] bg-[position:48%_50%] text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_3px_rgba(0,0,0,0.25),0_18px_30px_rgba(0,0,0,0.45),0_50px_90px_rgba(0,0,0,0.55)] outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF37]/70"
          >
            {/* paper lighting */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.55),transparent_55%),linear-gradient(180deg,transparent_70%,rgba(120,90,40,0.12))]" />

            {/* lettering */}
            <div className="relative flex h-full flex-col items-center px-[14%] pt-[17%] text-center">
              <p className="font-serif text-[10px] font-semibold uppercase tracking-[0.42em] text-[#8a6417] sm:text-[11px]">
                Together with their families
              </p>
              <div className="my-3 h-px w-16 bg-gradient-to-r from-transparent via-[#c9972e] to-transparent" />
              <h1 className={FOIL_TEXT}>Austin</h1>
              <span className="font-serif text-xl italic text-[#a07a25]">{'&'}</span>
              <h1 className={FOIL_TEXT}>Merin</h1>
            </div>

            {/* bottom details (below ribbon) */}
            <div className="pointer-events-none absolute inset-x-0 bottom-[15%] text-center">
              <p className="font-serif text-[10px] uppercase tracking-[0.35em] text-[#5a4320]">
                Request the honour of your presence
              </p>
              <p className="mt-1 font-serif text-base italic text-[#7a5513]">{'Saturday · 07 · 11 · 2026'}</p>
            </div>

            {/* ribbon wrapped around the card, split at the knot */}
            <RibbonHalf side="left" untied={untied} />
            <RibbonHalf side="right" untied={untied} />

            {/* satin bow */}
            <div
              className={`absolute left-1/2 top-[60%] z-10 motion-reduce:animate-none ${
                untied ? 'animate-inv-bow-untie' : 'animate-inv-bow-breathe'
              }`}
            >
              <SatinBow untie={untied} />
            </div>

            {/* edge thickness */}
            <div className="pointer-events-none absolute inset-0 rounded-[6px] ring-1 ring-inset ring-[#b8892c]/25" />
          </button>

          <p
            className={`mt-6 text-center font-serif text-xs uppercase tracking-[0.4em] text-[#f6e3b4] transition-opacity motion-reduce:animate-none ${
              untied ? 'opacity-0' : 'animate-inv-tap-hint'
            }`}
          >
            Touch the ribbon to untie
          </p>
        </div>
      </div>

      {inAmbiance && !exiting && (
        <button
          type="button"
          onClick={skip}
          className="absolute right-4 top-4 z-20 rounded-full border border-[#f6e3b4]/60 bg-black/30 px-4 py-1.5 font-serif text-xs uppercase tracking-[0.3em] text-[#f6e3b4] backdrop-blur-sm transition hover:bg-black/50"
        >
          Skip
        </button>
      )}
    </div>
  )
}
