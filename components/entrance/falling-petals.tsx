const PETALS = Array.from({ length: 34 }, (_, i) => {
  const r = (n: number) => (Math.sin((i + 1) * n) + 1) / 2
  return {
    left: r(12.9898) * 100,
    size: 10 + r(78.233) * 14,
    duration: 5 + r(3.17) * 5,
    delay: r(9.41) * 4,
    drift: (r(5.5) - 0.5) * 200,
    spin: 300 + r(2.2) * 500,
    hue: i % 3,
  }
})

const PETAL_COLORS = [
  'bg-[radial-gradient(circle_at_30%_30%,#ffffff,#ffe4ea_60%,#f4a3ad)]',
  'bg-[radial-gradient(circle_at_30%_30%,#fffaf0,#fbe7c2_60%,#e6c27a)]',
  'bg-[radial-gradient(circle_at_30%_30%,#ffffff,#fdf3f5_70%,#f2c6cd)]',
]

export function FallingPetals() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className={`absolute top-0 block animate-inv-petal rounded-[70%_0_70%_0] opacity-0 shadow-[0_2px_4px_rgba(0,0,0,0.15)] motion-reduce:hidden ${PETAL_COLORS[p.hue]}`}
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 0.75,
              '--petal-duration': `${p.duration}s`,
              '--petal-delay': `${p.delay}s`,
              '--drift': `${p.drift}px`,
              '--spin': `${p.spin}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
