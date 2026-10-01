export function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <p className="text-xs tracking-[0.4em] text-gold-deep uppercase">{eyebrow}</p>
      <h2 id={id} className="font-script text-5xl gold-text md:text-6xl">
        {title}
      </h2>
      <div aria-hidden="true" className="flex items-center gap-3">
        <span className="h-px w-12 bg-gold/60" />
        <span className="size-1.5 rotate-45 bg-gold" />
        <span className="h-px w-12 bg-gold/60" />
      </div>
    </div>
  )
}
