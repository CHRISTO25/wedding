const PIVOT = 'origin-[100px_90px]'

export function SatinBow({ untie }: { untie: boolean }) {
  const anim = (className: string) => `${PIVOT} ${untie ? className : ''}`

  return (
    <svg
      viewBox="0 0 200 200"
      width="168"
      className="overflow-visible drop-shadow-[0_10px_14px_rgba(50,5,12,0.55)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bowSatinA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5a0c18" />
          <stop offset="22%" stopColor="#a8253a" />
          <stop offset="42%" stopColor="#ffc4cc" />
          <stop offset="55%" stopColor="#d9475c" />
          <stop offset="80%" stopColor="#8e1d2e" />
          <stop offset="100%" stopColor="#3f0710" />
        </linearGradient>
        <linearGradient id="bowSatinB" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f0710" />
          <stop offset="45%" stopColor="#7d1828" />
          <stop offset="100%" stopColor="#2e050c" />
        </linearGradient>
        <linearGradient id="bowKnot" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5a0c18" />
          <stop offset="35%" stopColor="#c9384b" />
          <stop offset="50%" stopColor="#ffd0d6" />
          <stop offset="65%" stopColor="#c9384b" />
          <stop offset="100%" stopColor="#5a0c18" />
        </linearGradient>
        <filter id="satinWeave" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.04" numOctaves="2" seed="4" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0" result="weave" />
          <feComposite in="weave" in2="SourceGraphic" operator="in" result="weaveIn" />
          <feBlend in="SourceGraphic" in2="weaveIn" mode="multiply" />
        </filter>
      </defs>

      <g filter="url(#satinWeave)">
        {/* tails */}
        <g className={anim('animate-inv-tail-l')}>
          <path d="M92 96 C80 130 62 160 40 188 L62 180 L70 198 C86 166 100 132 106 100 Z" fill="url(#bowSatinA)" />
          <path d="M94 110 C84 140 70 164 56 182" stroke="#ffd7dc" strokeOpacity="0.55" strokeWidth="1.4" fill="none" />
        </g>
        <g className={anim('animate-inv-tail-r')}>
          <path d="M108 96 C120 130 138 160 160 188 L138 180 L130 198 C114 166 100 132 94 100 Z" fill="url(#bowSatinA)" />
          <path d="M106 110 C116 140 130 164 144 182" stroke="#ffd7dc" strokeOpacity="0.55" strokeWidth="1.4" fill="none" />
        </g>

        {/* loops */}
        <g className={anim('animate-inv-loop-l')}>
          <path d="M100 90 C70 30 14 26 10 70 C8 112 62 116 100 90 Z" fill="url(#bowSatinA)" />
          <path d="M98 90 C76 54 40 50 32 72 C28 94 64 100 98 90 Z" fill="url(#bowSatinB)" />
          <path d="M22 56 C40 36 70 44 88 76" stroke="#fff" strokeOpacity="0.55" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <path d="M24 92 C40 104 66 104 90 94" stroke="#2e050c" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
        </g>
        <g className={anim('animate-inv-loop-r')}>
          <path d="M100 90 C130 30 186 26 190 70 C192 112 138 116 100 90 Z" fill="url(#bowSatinA)" />
          <path d="M102 90 C124 54 160 50 168 72 C172 94 136 100 102 90 Z" fill="url(#bowSatinB)" />
          <path d="M178 56 C160 36 130 44 112 76" stroke="#fff" strokeOpacity="0.55" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <path d="M176 92 C160 104 134 104 110 94" stroke="#2e050c" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
        </g>

        {/* knot */}
        <g className={anim('animate-inv-knot')}>
          <rect x="82" y="70" width="36" height="42" rx="13" fill="url(#bowKnot)" />
          <path d="M88 76 C94 88 94 96 88 106 M112 76 C106 88 106 96 112 106" stroke="#3f0710" strokeOpacity="0.4" strokeWidth="1.2" fill="none" />
          <ellipse cx="94" cy="78" rx="7" ry="3" fill="#fff" opacity="0.5" />
        </g>
      </g>
    </svg>
  )
}
