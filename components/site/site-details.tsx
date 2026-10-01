import { Church, GlassWater, MapPin } from 'lucide-react'
import { SectionHeading } from './section-heading'

const EVENTS = [
  {
    icon: Church,
    title: 'The Ceremony',
    time: '4:00 PM',
    place: 'Basilica di Santa Sabina',
    address: 'Piazza Pietro d’Illiria, 1, Rome',
  },
  {
    icon: GlassWater,
    title: 'The Reception',
    time: '6:30 PM',
    place: 'Villa Aurelia',
    address: 'Largo di Porta S. Pancrazio, 1, Rome',
  },
]

export function SiteDetails() {
  return (
    <section aria-labelledby="details-title" className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-14">
        <SectionHeading id="details-title" eyebrow="Saturday · June 12, 2027" title="The Celebration" />
        <div className="grid w-full gap-6 md:grid-cols-2">
          {EVENTS.map((event) => (
            <article
              key={event.title}
              className="relative flex flex-col items-center gap-4 rounded-sm border border-gold/40 bg-ivory px-8 py-12 text-center"
            >
              <div aria-hidden="true" className="absolute inset-2 rounded-[2px] border border-gold/20" />
              <span className="gold-surface flex size-14 items-center justify-center rounded-full text-white shadow-md">
                <event.icon aria-hidden="true" className="size-6" />
              </span>
              <h3 className="text-3xl font-medium">{event.title}</h3>
              <p className="text-sm tracking-[0.35em] text-gold-deep uppercase">{event.time}</p>
              <div className="flex flex-col gap-1">
                <p className="text-xl italic">{event.place}</p>
                <p className="text-muted-foreground">{event.address}</p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${event.place}, ${event.address}`)}`}
                target="_blank"
                rel="noreferrer"
                className="relative mt-2 inline-flex items-center gap-2 text-sm tracking-[0.25em] text-gold-deep uppercase underline-offset-4 hover:underline"
              >
                <MapPin aria-hidden="true" className="size-4" />
                View map
              </a>
            </article>
          ))}
        </div>
        <p className="text-center text-lg italic text-muted-foreground">
          Dress code: Black tie · Ivory &amp; gold encouraged
        </p>
      </div>
    </section>
  )
}
