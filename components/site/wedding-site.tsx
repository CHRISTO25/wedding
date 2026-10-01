import { SiteHero } from './site-hero'
import { SiteStory } from './site-story'
import { SiteDetails } from './site-details'
import { SiteSchedule } from './site-schedule'
import { SiteRsvp } from './site-rsvp'
import { SiteFooter } from './site-footer'

export function WeddingSite({ onReplay }: { onReplay: () => void }) {
  return (
    <>
      <main>
        <SiteHero />
        <SiteStory />
        <SiteDetails />
        <SiteSchedule />
        <SiteRsvp />
      </main>
      <SiteFooter onReplay={onReplay} />
    </>
  )
}
