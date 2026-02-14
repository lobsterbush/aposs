'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'
import { AnimatedCard } from '@/components/animated'
import { Calendar, User } from 'lucide-react'

interface Event {
  id: string
  title: string
  scheduledAt: string
  presenter: string
  status: 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'
  description?: string
}

export default function PresentersPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/public/events')
        const data = await res.json()
        if (data.success) {
          setEvents(data.events || [])
        }
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const pastEvents = events
    .filter(event => event.status === 'COMPLETED' || new Date(event.scheduledAt) < new Date())
    .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime())

  return (
    <>
      <Header />
      <div style={{ marginTop: '80px' }}>
        <PageHero title="Past Presenters" subtitle="Highlights from prior APOSS seminars" />
      </div>
      <main className="min-h-screen bg-[#fafafa] py-16">
        <section className="mx-auto max-w-6xl px-6">
          <AnimatedCard className="mb-10 bg-[#00376c]/5 border-[#00376c]/20">
            <p className="text-sm text-[#00376c] font-semibold">
              This page is automatically populated from the events schedule.
            </p>
          </AnimatedCard>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-12 h-12 border-[3px] border-[#17152b]/20 border-t-[#17152b] rounded-full animate-spin" />
            </div>
          ) : pastEvents.length === 0 ? (
            <AnimatedCard className="text-center py-12">
              <p className="text-[#525252] mb-4">No past presenters to display yet.</p>
              <Link href="/schedule" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#17152b] text-white hover:bg-[#00376c] transition-colors font-semibold no-underline">
                View upcoming schedule
              </Link>
            </AnimatedCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              {pastEvents.map((event, i) => (
                <AnimatedCard key={event.id} delay={i * 0.05}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-[#737373]">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.scheduledAt).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#17152b]">
                      {event.title}
                    </h2>
                    <p className="text-[#404040] flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {event.presenter}
                    </p>
                    {event.description && (
                      <p className="text-[#404040] leading-relaxed">{event.description}</p>
                    )}
                  </div>
                </AnimatedCard>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}
