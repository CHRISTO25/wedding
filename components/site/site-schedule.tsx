import { SectionHeading } from './section-heading'

const MOMENTS = [
  { time: '3:30 PM', title: 'Guests arrive', note: 'Welcome refreshments in the cloister garden' },
  { time: '4:00 PM', title: 'Ceremony', note: 'Vows exchanged at Santa Sabina' },
  { time: '5:30 PM', title: 'Golden hour aperitivo', note: 'Prosecco on the terrace of Villa Aurelia' },
  { time: '7:00 PM', title: 'Dinner', note: 'A candlelit feast beneath the olive trees' },
  { time: '9:30 PM', title: 'First dance & celebration', note: 'Dancing until the stars fade' },
]

export function SiteSchedule() {
  return (
    <section aria-labelledby="schedule-title" className="px-6 py-24 md:py-32">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-14">
        <SectionHeading id="schedule-title" eyebrow="The day" title="Order of Events" />
        <ol className="relative w-full border-l border-gold/50 pl-8 md:pl-10">
          {MOMENTS.map((moment) => (
            <li key={moment.title} className="relative pb-10 last:pb-0">
              <span
                aria-hidden="true"
                className="gold-surface absolute -left-[calc(2rem+7px)] top-1.5 size-3.5 rotate-45 md:-left-[calc(2.5rem+7px)]"
              />
              <p className="text-sm tracking-[0.3em] text-gold-deep uppercase">{moment.time}</p>
              <h3 className="mt-1 text-2xl font-medium">{moment.title}</h3>
              <p className="text-lg italic text-muted-foreground">{moment.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
