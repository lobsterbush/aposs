import { prisma } from '@/lib/db'
import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'

export const dynamic = 'force-dynamic'

import EventsFiltersAndList from './EventsFiltersAndList'

export default async function EventsIndexPage() {
  type PublicEvent = { id: string; title: string; scheduledAt: Date; presenter: string; status: 'SCHEDULED' | 'COMPLETED' }
  let events: PublicEvent[] = []

  const sample: PublicEvent[] = [{
    id: 'sample',
    title: 'Sample Seminar: Comparative Politics in Urban Asia',
    scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    presenter: 'Dr. Sample Researcher',
    status: 'SCHEDULED',
  }]

  if (process.env.DATABASE_URL) {
    try {
      const rows = await prisma.event.findMany({
        where: { status: { in: ['SCHEDULED', 'COMPLETED'] } },
        orderBy: { scheduledAt: 'asc' },
        select: { id: true, title: true, scheduledAt: true, presenter: true, status: true },
      })
      events = rows
        .filter(r => r.status === 'SCHEDULED' || r.status === 'COMPLETED')
        .map(r => ({ id: r.id, title: r.title, scheduledAt: r.scheduledAt as Date, presenter: r.presenter, status: r.status as 'SCHEDULED' | 'COMPLETED' }))
    } catch {
      events = sample
    }
  } else {
    events = sample
  }

  // Add sample tags and serialize dates for client
  const initial = events.map(e => ({
    ...e,
    scheduledAt: e.scheduledAt.toISOString(),
    tags: ['Comparative', 'Governance', 'East Asia'],
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PageHero title="Events" subtitle="Upcoming and past APOSS seminars" />
      <main className="mx-auto max-w-4xl px-6 pt-8 pb-12">
        <EventsFiltersAndList initialEvents={initial} />
      </main>
    </div>
  )
}
