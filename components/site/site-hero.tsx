import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { Countdown } from './countdown'

export function SiteHero() {
  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6 py-24">
      <Image
        src="/images/wedding-hero.png"
        alt="A white rose ceremony arch glowing in golden afternoon light"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(251_247_238/0.82)_0%,rgb(251_247_238/0.55)_55%,rgb(251_247_238/0.9)_100%)]" />

      <div className="relative flex max-w-2xl flex-col items-center gap-6 text-center animate-fade-up">
        <p className="text-xs tracking-[0.45em] text-gold-deep uppercase md:text-sm">We are getting married</p>
        <h1 id="hero-title" className="font-script text-7xl leading-none gold-text animate-shimmer md:text-9xl">
          Amelia <span className="text-5xl md:text-7xl">&amp;</span> Julian
        </h1>
        <p className="text-xl italic text-foreground/80 md:text-2xl">Saturday, the twelfth of June, 2027</p>
        <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase">Villa Aurelia · Rome, Italy</p>
        <Countdown target="2027-06-12T16:00:00+02:00" />
      </div>

      <a
        href="#story"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs tracking-[0.3em] text-gold-deep uppercase"
      >
        Scroll
        <ChevronDown aria-hidden="true" className="size-4 animate-bounce" />
      </a>
    </section>
  )
}
