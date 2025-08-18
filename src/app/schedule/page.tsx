'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowLeft, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'

interface Event {
  id: string
  title: string
  description?: string
  scheduledAt: string
  presenter: string
  presenterEmail?: string
  zoomJoinUrl?: string
  status: 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'
}

export default function SchedulePage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
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
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center pt-28 pb-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading schedule...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">APOSS Schedule</h1>
          <p className="text-white/90 text-lg max-w-3xl">
            Join us for engaging seminars on Asian politics. All seminars are conducted online via Zoom.
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
            <Calendar className="w-4 h-4 mr-2" />
            Upcoming and past events
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-blue-600" />
            Upcoming Seminars
          </h2>
          
          {upcomingEvents.length > 0 ? (
            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-blue-500" />
                          <span><strong>Presenter:</strong> {event.presenter}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                          <span><strong>Date:</strong> {formatDate(event.scheduledAt)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-blue-500" />
                          <span><strong>Time:</strong> {formatTime(event.scheduledAt)}</span>
                        </div>
                      </div>
                      {event.description && (
                        <p className="mt-3 text-gray-700">{event.description}</p>
                      )}
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      {event.zoomJoinUrl ? (
                        <Button asChild>
                          <a href={event.zoomJoinUrl} target="_blank" rel="noopener noreferrer">
                            Join Meeting
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      ) : (
                        <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          Meeting Link TBA
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">No upcoming seminars scheduled at the moment.</p>
              <p className="text-gray-500 mt-2">Check back soon for new announcements!</p>
            </div>
          )}
        </div>

        {/* Past Events */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Seminars</h2>
          
          {pastEvents.length > 0 ? (
            <div className="space-y-4">
              {pastEvents.slice(0, 10).map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{event.title}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-600">
                        <span><strong>Presenter:</strong> {event.presenter}</span>
                        <span><strong>Date:</strong> {formatDate(event.scheduledAt)}</span>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {pastEvents.length > 10 && (
                <div className="text-center py-4">
                  <p className="text-gray-500">
                    Showing 10 most recent seminars. We've hosted {pastEvents.length} seminars in total!
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm">
              <p className="text-gray-600">No past seminars to display yet.</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-blue-600 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Want to Present?</h3>
          <p className="text-blue-100 mb-6">
            Share your research with the APOSS community. Submit your proposal today!
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/submit">Submit Your Proposal</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
