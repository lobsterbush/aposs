'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, User } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'
import { AnimatedCard } from '@/components/animated'

interface Event {
  id: string
  title: string
  description?: string
  scheduledAt: string
  presenter: string
  presenterEmail?: string
  status: 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'
}

export default function SchedulePage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/public/events')
      const data = await response.json()
      if (data.success) {
        setEvents(data.events.filter((event: Event) => event.status !== 'CANCELLED'))
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const upcomingEvents = events.filter(event => 
    new Date(event.scheduledAt) > new Date() && event.status === 'SCHEDULED'
  ).sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())

  const pastEvents = events.filter(event => 
    new Date(event.scheduledAt) < new Date() || event.status === 'COMPLETED'
  ).sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime())

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <Header />
        <div className="flex items-center justify-center pt-28 pb-12">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-[3px] border-[#17152b]/20 border-t-[#17152b] mx-auto mb-4"></div>
            <p className="text-[#404040]">Loading schedule...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <div style={{ marginTop: '80px' }}>
        <PageHero title="APOSS Schedule" subtitle="Join us for engaging seminars on Asia Pacific politics" />
      </div>
      <div className="container max-w-6xl py-16">

        {/* Info Note */}
        <AnimatedCard className="mb-6 bg-[#00376c]/5 border-[#00376c]/20">
          <p className="text-sm text-[#404040]">
            Times are shown in your local time zone. Registration is required for all sessions.
          </p>
        </AnimatedCard>

        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#17152b] mb-6 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-[#dc7510]" />
            Upcoming Seminars
          </h2>
          
          {upcomingEvents.length > 0 ? (
            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <AnimatedCard key={event.id}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#17152b] mb-3">{event.title}</h3>
                      <div className="space-y-2 text-sm text-[#404040]">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span><strong>Presenter:</strong> {event.presenter}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span><strong>Date:</strong> {formatDate(event.scheduledAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span><strong>Time:</strong> {formatTime(event.scheduledAt)}</span>
                        </div>
                      </div>
                      {event.description && (
                        <p className="mt-3 text-[#404040]">{event.description}</p>
                      )}
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <span className="inline-flex items-center px-4 py-2 bg-[#f5f5f5] border border-[#e5e5e5] text-sm font-semibold text-[#737373] rounded-lg">
                        Registration required
                      </span>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <AnimatedCard className="text-center py-12">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-[#a3a3a3]" />
              <p className="text-[#525252] mb-2">No upcoming seminars scheduled at the moment.</p>
              <p className="text-[#737373]">Check back soon for new announcements!</p>
            </AnimatedCard>
          )}
        </div>

        {/* Past Events */}
        <div>
          <h2 className="text-3xl font-bold text-[#17152b] mb-6">Past Seminars</h2>
          
          {pastEvents.length > 0 ? (
            <div className="space-y-4">
              {pastEvents.slice(0, 10).map((event) => (
                <AnimatedCard key={event.id}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#17152b] mb-1">{event.title}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm text-[#404040]">
                        <span><strong>Presenter:</strong> {event.presenter}</span>
                        <span><strong>Date:</strong> {formatDate(event.scheduledAt)}</span>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className="inline-flex items-center px-3 py-1 bg-[#f5f5f5] border border-[#e5e5e5] text-xs font-semibold text-[#737373] rounded-lg">
                        Completed
                      </span>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
              {pastEvents.length > 10 && (
                <div className="text-center py-4">
                  <p className="text-[#737373]">
                    Showing 10 most recent seminars. We've hosted {pastEvents.length} seminars in total!
                  </p>
                </div>
              )}
            </div>
          ) : (
            <AnimatedCard className="text-center py-8">
              <p className="text-[#525252]">No past seminars to display yet.</p>
            </AnimatedCard>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-12 card section-dark text-center">
          <h3 className="heading-sm mb-4">Want to Present?</h3>
          <p className="text-white mb-6">
            Share your research with the APOSS community. Submit your proposal today!
          </p>
          <Link href="/submit" className="no-underline inline-flex items-center gap-3 bg-white text-black px-8 py-4 border-[3px] border-white hover:bg-black hover:text-white hover:border-white transition-colors font-bold">
            Submit Your Proposal
          </Link>
        </div>
      </div>
    </div>
  )
}
