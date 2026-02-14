import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'
import { Calendar, User } from 'lucide-react'

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Dev fallback when DB is unavailable
  const sample = {
    id: 'sample',
    title: 'Sample Seminar: Comparative Politics in Urban Asia',
    description: 'This is a sample event used for development when no database is configured.',
    scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    presenter: 'Dr. Sample Researcher',
    presenterEmail: 'sample@example.org',
    status: 'SCHEDULED' as const,
  }
  const useSample = process.env.NODE_ENV === 'development'

  let event:
    | { id: string; title: string; description: string | null; scheduledAt: Date; presenter: string; presenterEmail?: string | null; status: 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED' }
    | null = null

  if (process.env.DATABASE_URL) {
    try {
      event = await prisma.event.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          description: true,
          scheduledAt: true,
          presenter: true,
          presenterEmail: true,
          status: true,
        },
      })
    } catch {
      event = useSample && id === 'sample' ? sample : null
    }
  } else {
    event = useSample && id === 'sample' ? sample : null
  }

  if (!event) return notFound()

  const date = new Date(event.scheduledAt)
  const dateStr = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PageHero title={event.title} subtitle={`${dateStr} · ${timeStr}`} />
      <main className="mx-auto max-w-3xl px-6 pt-8 pb-12">
        <div className="text-gray-700 space-y-1 mb-6">
          <div className="flex items-center"><User className="w-4 h-4 mr-2 text-[#00376c]" /> {event.presenter}</div>
          <div className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-[#00376c]" /> {dateStr} at {timeStr}</div>
          <div>Status: {event.status}</div>
        </div>
        {event.description && (
          <p className="text-gray-800 leading-relaxed mb-6">{event.description}</p>
        )}
        <div className="inline-flex items-center px-4 py-2 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5] text-sm font-semibold text-[#737373]">
          Registration required for Zoom access
        </div>
      </main>
    </div>
  )
}
