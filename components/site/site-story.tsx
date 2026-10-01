import { SectionHeading } from './section-heading'

export function SiteStory() {
  return (
    <section id="story" aria-labelledby="story-title" className="scroll-mt-8 px-6 py-24 md:py-32">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-10 text-center">
        <SectionHeading id="story-title" eyebrow="How it began" title="Our Story" />
        <p className="text-xl leading-relaxed text-foreground/85 md:text-2xl">
          We met on a rainy autumn evening in a little bookshop in Trastevere, both reaching for the
          last copy of the same poetry collection. Julian let Amelia have it — on the condition that
          she read him her favourite verse over coffee.
        </p>
        <p className="text-lg italic leading-relaxed text-muted-foreground md:text-xl">
          Seven years, countless verses and one proposal beneath the stars later, we would be honoured
          to have you beside us as we begin our forever.
        </p>
      </div>
    </section>
  )
}
