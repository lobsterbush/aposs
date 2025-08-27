'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FileText, CheckCircle, X, Eye, CalendarDays, Video } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface Submission {
  id: string
  title: string
  authorName: string
  authorEmail: string
  authorAffiliation: string
  status: 'PENDING' | 'UNDER_REVIEW' | 'ACCEPTED' | 'SCHEDULED' | 'PRESENTED' | 'REJECTED'
  submittedAt: string
  reviewedAt?: string
  scheduledAt?: string
}

interface Event {
  id: string
  title: string
  scheduledAt: string
  presenter: string
  zoomMeetingId?: string
  zoomJoinUrl?: string
  status: 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'submissions' | 'calendar' | 'events'>('submissions')
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])
  const { status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      fetchSubmissions()
      fetchEvents()
    }
  }, [status])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/submissions')
      const data = await response.json()
      if (data.success) {
        setSubmissions(data.submissions)
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      if (data.success) {
        setEvents(data.events)
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  const updateSubmissionStatus = async (submissionId: string, status: string) => {
    try {
      const response = await fetch(`/api/submissions/${submissionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      
      if (response.ok) {
        fetchSubmissions()
      }
    } catch (error) {
      console.error('Error updating submission:', error)
    }
  }

  const scheduleSubmission = async (submissionId: string, scheduledDateTime: string) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId,
          scheduledAt: scheduledDateTime
        })
      })
      
      if (response.ok) {
        fetchSubmissions()
        fetchEvents()
        updateSubmissionStatus(submissionId, 'SCHEDULED')
      }
    } catch (error) {
      console.error('Error scheduling submission:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'UNDER_REVIEW': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'ACCEPTED': return 'bg-green-100 text-green-800 border-green-200'
      case 'SCHEDULED': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'PRESENTED': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading && status === 'authenticated') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00376c] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#00376c]/20 border-t-[#00376c] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication…</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="mx-auto max-w-md px-6 pt-28 pb-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600 mb-6">Please sign in to access the admin dashboard.</p>
            <Button asChild>
              <Link href="/login?callbackUrl=%2Fadmin" className="no-underline text-white">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-1">
            APOSS Admin Dashboard
          </h1>
          <p className="text-slate-600">
            Manage submissions, schedule seminars, and organize events.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'submissions'
                ? 'border-[#00376c] text-[#00376c]'
                : 'border-transparent text-gray-500 hover:text-[#17152b] hover:border-gray-300'
            }`}
          >
            <FileText className="w-5 h-5 inline-block mr-2" />
            Submissions ({submissions.length})
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'calendar'
                ? 'border-[#00376c] text-[#00376c]'
                : 'border-transparent text-gray-500 hover:text-[#17152b] hover:border-gray-300'
            }`}
          >
            <CalendarDays className="w-5 h-5 inline-block mr-2" />
            Calendar
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'events'
                ? 'border-[#00376c] text-[#00376c]'
                : 'border-transparent text-gray-500 hover:text-[#17152b] hover:border-gray-300'
            }`}
          >
            <Video className="w-5 h-5 inline-block mr-2" />
            Events ({events.length})
          </button>
        </nav>

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Submissions</h2>
                <p className="mt-1 text-sm text-gray-600">How to schedule: 1) Click Review, 2) Click Accept, 3) Pick a date/time; we'll create the event and update the schedule automatically.</p>
              </div>
              <div className="divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <div key={submission.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{submission.title}</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><strong>Author:</strong> {submission.authorName}</p>
                          <p><strong>Email:</strong> {submission.authorEmail}</p>
                          <p><strong>Affiliation:</strong> {submission.authorAffiliation}</p>
                          <p><strong>Submitted:</strong> {new Date(submission.submittedAt).toLocaleDateString()}</p>
                        </div>
                        <div className="mt-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(submission.status)}`}>
                            {submission.status}
                          </span>
                        </div>
                      </div>
                      <div className="ml-6 flex flex-col space-y-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateSubmissionStatus(submission.id, 'UNDER_REVIEW')}
                          disabled={submission.status !== 'PENDING'}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => updateSubmissionStatus(submission.id, 'ACCEPTED')}
                          disabled={submission.status !== 'UNDER_REVIEW'}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => updateSubmissionStatus(submission.id, 'REJECTED')}
                          disabled={submission.status === 'SCHEDULED' || submission.status === 'PRESENTED'}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        {(submission.status === 'ACCEPTED' || submission.status === 'UNDER_REVIEW') && (
                          <div className="mt-4 p-3 bg-[#00376c]/5 rounded-lg">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Date & Time</label>
                            <p className="text-xs text-gray-600 mb-2">Times use your local timezone. On selection we'll accept (if needed) and schedule instantly.</p>
                            <Input
                              type="datetime-local"
                              onChange={(e) => {
                                if (e.target.value) {
                                  if (submission.status !== 'ACCEPTED') {
                                    updateSubmissionStatus(submission.id, 'ACCEPTED')
                                  }
                                  scheduleSubmission(submission.id, e.target.value)
                                }
                              }}
                              className="text-sm"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {submissions.length === 0 && (
                  <div className="p-12 text-center text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>No submissions yet. Submissions will appear here when researchers submit their proposals.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Seminar Calendar</h2>
              
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 border-b">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Simple calendar grid - would implement full calendar here */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }, (_, i) => {
                  const date = new Date()
                  date.setDate(date.getDate() - date.getDay() + i)
                  const hasEvent = events.some(event => 
                    new Date(event.scheduledAt).toDateString() === date.toDateString()
                  )
                  
                  return (
                    <div
                      key={i}
                      className={`p-3 text-center text-sm border border-gray-200 hover:bg-gray-50 cursor-pointer ${
                        hasEvent ? 'bg-[#00376c]/10 text-[#00376c]' : ''
                      }`}
                      onClick={() => setSelectedDate(date.toISOString().split('T')[0])}
                    >
                      {date.getDate()}
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-6">
                <h3 className="text-md font-medium text-gray-900 mb-3">
                  Events for {new Date(selectedDate).toLocaleDateString()}
                </h3>
                <div className="space-y-2">
                  {events
                    .filter(event => event.scheduledAt.split('T')[0] === selectedDate)
                    .map(event => (
                      <div key={event.id} className="p-3 bg-[#00376c]/5 rounded-lg">
                        <p className="font-medium text-[#17152b]">{event.title}</p>
                        <p className="text-sm text-[#00376c]">Presenter: {event.presenter}</p>
                        <p className="text-sm text-[#00376c]">
                          {new Date(event.scheduledAt).toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                  {events.filter(event => event.scheduledAt.split('T')[0] === selectedDate).length === 0 && (
                    <p className="text-gray-500 text-sm">No events scheduled for this date.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Scheduled Events</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {events.map((event) => (
                  <div key={event.id} className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{event.title}</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><strong>Presenter:</strong> {event.presenter}</p>
                          <p><strong>Date & Time:</strong> {new Date(event.scheduledAt).toLocaleString()}</p>
                          {event.zoomJoinUrl && (
                            <p><strong>Zoom Link:</strong>
                              <a href={event.zoomJoinUrl} target="_blank" rel="noopener noreferrer" className="text-[#00376c] hover:text-[#17152b] ml-1">
                                Join Meeting
                              </a>
                            </p>
                          )}
                        </div>
                        <div className="mt-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </div>
                      </div>
                      {/* Admin controls */}
                      <div className="w-full lg:w-96 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Reschedule (Date & Time)
                          </label>
                          <Input
                            type="datetime-local"
                            defaultValue={new Date(event.scheduledAt).toISOString().slice(0,16)}
                            onChange={async (e) => {
                              const val = e.target.value
                              if (!val) return
                              try {
                                await fetch(`/api/events/${event.id}`, {
                                  method: 'PATCH',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ scheduledAt: val })
                                })
                                fetchEvents()
                              } catch (err) {
                                console.error('Failed to update event time', err)
                              }
                            }}
                            className="text-sm"
                          />
                          <label className="block text-sm font-medium text-gray-700 mt-4">
                            Zoom Join URL
                          </label>
                          <Input
                            type="url"
                            defaultValue={event.zoomJoinUrl || ''}
                            placeholder="https://zoom.us/j/xxxx"
                            onBlur={async (e) => {
                              const url = e.target.value
                              try {
                                await fetch(`/api/events/${event.id}`, {
                                  method: 'PATCH',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ zoomJoinUrl: url })
                                })
                                fetchEvents()
                              } catch (err) {
                                console.error('Failed to update zoom link', err)
                              }
                            }}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {events.length === 0 && (
                  <div className="p-12 text-center text-gray-500">
                    <Video className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>No events scheduled yet. Events will appear here when you schedule accepted submissions.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
