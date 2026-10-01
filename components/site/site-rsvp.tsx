import { SectionHeading } from './section-heading'

export function SiteRsvp() {
  return (
    <section aria-labelledby="rsvp-title" className="bg-white px-6 py-24 md:py-32">
      <div className="relative mx-auto flex max-w-xl flex-col items-center gap-8 rounded-sm border border-gold/50 bg-ivory px-8 py-16 text-center">
        <div aria-hidden="true" className="absolute inset-2 rounded-[2px] border border-gold/25" />
        <SectionHeading id="rsvp-title" eyebrow="Kindly reply" title="RSVP" />
        <p className="relative text-xl leading-relaxed text-foreground/85">
          {"We'd be delighted to celebrate with you. Please let us know by "}
          <span className="font-medium">April 1, 2027</span>.
        </p>
        <a
          href="mailto:rsvp@ameliaandjulian.com?subject=RSVP%20%E2%80%94%20Amelia%20%26%20Julian"
          className="gold-surface relative rounded-full px-10 py-3.5 text-sm font-medium tracking-[0.35em] text-white uppercase shadow-[0_10px_30px_-10px_rgb(138_106_42/0.7)] transition-transform hover:scale-105 [text-shadow:0_1px_2px_rgb(90_65_20/0.5)]"
        >
          Respond
        </a>
      </div>
    </section>
  )
}
