import { cn } from '@/lib/utils'

const partTransition = 'transition-all duration-[1000ms] ease-[cubic-bezier(0.6,0.05,0.3,1)] [transform-box:fill-box]'

export function RibbonBow({ untied }: { untied: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 150"
      className={cn(
        'absolute left-1/2 top-1/2 w-[180px] overflow-visible drop-shadow-[0_8px_12px_rgb(90_65_20/0.35)]',
        untied ? '-translate-x-1/2 -translate-y-1/2' : 'animate-bow-breathe',
      )}
    >
      <defs>
        <linearGradient id="satin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7d5f24" />
          <stop offset="25%" stopColor="#d4b062" />
          <stop offset="45%" stopColor="#f8e9b8" />
          <stop offset="65%" stopColor="#c9a24b" />
          <stop offset="100%" stopColor="#8a6a2a" />
        </linearGradient>
        <linearGradient id="satin-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b8913f" />
          <stop offset="100%" stopColor="#6e521d" />
        </linearGradient>
      </defs>

      <g
        className={cn(partTransition, '[transform-origin:right_center]', untied && 'opacity-0')}
        style={untied ? { transform: 'translate(-70px, 40px) rotate(-70deg)' } : undefined}
      >
        <path d="M96 78 L58 140 L70 132 L78 146 L106 82 Z" fill="url(#satin-dark)" />
      </g>
      <g
        className={cn(partTransition, '[transform-origin:left_center]', untied && 'opacity-0')}
        style={untied ? { transform: 'translate(70px, 40px) rotate(70deg)' } : undefined}
      >
        <path d="M104 78 L142 140 L130 132 L122 146 L94 82 Z" fill="url(#satin-dark)" />
      </g>

      <g
        className={cn(partTransition, '[transform-origin:right_center]', untied && 'opacity-0')}
        style={untied ? { transform: 'translate(-80px, -30px) rotate(-55deg) scale(0.7)' } : undefined}
      >
        <path d="M100 72 C72 18 8 16 16 62 C22 98 72 92 100 72 Z" fill="url(#satin)" />
        <path d="M100 72 C78 44 40 40 34 62" fill="none" stroke="#7d5f24" strokeOpacity="0.45" strokeWidth="2" />
      </g>
      <g
        className={cn(partTransition, '[transform-origin:left_center]', untied && 'opacity-0')}
        style={untied ? { transform: 'translate(80px, -30px) rotate(55deg) scale(0.7)' } : undefined}
      >
        <path d="M100 72 C128 18 192 16 184 62 C178 98 128 92 100 72 Z" fill="url(#satin)" />
        <path d="M100 72 C122 44 160 40 166 62" fill="none" stroke="#7d5f24" strokeOpacity="0.45" strokeWidth="2" />
      </g>

      <g
        className={cn(partTransition, '[transform-origin:center]', untied && 'opacity-0')}
        style={untied ? { transform: 'scale(0) rotate(90deg)' } : undefined}
      >
        <rect x="86" y="58" width="28" height="30" rx="9" fill="url(#satin)" stroke="#7d5f24" strokeOpacity="0.5" />
        <path d="M92 64 Q100 73 108 64" fill="none" stroke="#fff6d6" strokeOpacity="0.8" strokeWidth="1.5" />
      </g>
    </svg>
  )
}
