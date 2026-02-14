'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { AnimatedCard } from '@/components/animated'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, User, Link2, Clock } from 'lucide-react'

type EventStatus = 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'

interface Event {
  id: string
  title: string
  scheduledAt: string
  presenter: string
  status: EventStatus
  zoomJoinUrl?: string | null
}

const statusOptions: EventStatus[] = ['SCHEDULED', 'ONGOING', 'COMPLETED', 'CANCELLED']

function toLocalInput(dateString: string) {
  const date = new Date(dateString)
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 16)
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<EventStatus | 'ALL'>('ALL')
  const [edits, setEdits] = useState<Record<string, { scheduledAt: string; status: EventStatus; zoomJoinUrl: string }>>({})

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events')
      const data = await res.json()
      if (data.success) {
        setEvents(data.events || [])
        const nextEdits: Record<string, { scheduledAt: string; status: EventStatus; zoomJoinUrl: string }> = {}
        data.events.forEach((event: Event) => {
          nextEdits[event.id] = {
            scheduledAt: toLocalInput(event.scheduledAt),
            status: event.status,
            zoomJoinUrl: event.zoomJoinUrl || '',
          }
        })
        setEdits(nextEdits)
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const filtered = useMemo(() => {
    return events.filter(event => {
      const matchesQ = query.trim() === '' || event.title.toLowerCase().includes(query.toLowerCase()) || event.presenter.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = statusFilter === 'ALL' || event.status === statusFilter
      return matchesQ && matchesStatus
    })
  }, [events, query, statusFilter])

  const updateField = (id: string, field: 'scheduledAt' | 'status' | 'zoomJoinUrl', value: string) => {
    setEdits(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }))
  }

  const saveEvent = async (id: string) => {
    const current = edits[id]
    if (!current) return
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scheduledAt: current.scheduledAt,
          status: current.status,
          zoomJoinUrl: current.zoomJoinUrl,
        })
      })
      if (res.ok) {
        fetchEvents()
      }
    } catch (error) {
      console.error('Error updating event:', error)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-[3px] border-[#17152b]/20 border-t-[#17152b] rounded-full animate-spin" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-[#111827] mb-2">Events</h1>
          <p className="text-[#4b5563]">Edit schedules, statuses, and Zoom links</p>
        </div>

        <AnimatedCard className="border border-[#e5e5e5]">
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or presenter..."
              className="md:max-w-sm"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as EventStatus | 'ALL')}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="ALL">All statuses</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </AnimatedCard>

        <div className="grid grid-cols-1 gap-6">
          {filtered.length === 0 ? (
            <AnimatedCard className="text-center py-12 border border-[#e5e5e5]">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-[#9ca3af]" />
              <p className="text-[#6b7280]">No events match your filters.</p>
            </AnimatedCard>
          ) : (
            filtered.map((event, idx) => (
              <AnimatedCard key={event.id} delay={idx * 0.02} className="border border-[#e5e5e5]">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-bold text-[#111827] mb-2">{event.title}</h2>
                      <div className="flex flex-wrap gap-3 text-sm text-[#6b7280]">
                        <span className="inline-flex items-center gap-1"><User className="w-4 h-4" />{event.presenter}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" />{new Date(event.scheduledAt).toLocaleString()}</span>
                        <Link href={`/events/${event.id}`} className="inline-flex items-center gap-1 text-[#00376c] hover:text-[#17152b] no-underline">
                          <Link2 className="w-4 h-4" /> View public page
                        </Link>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-semibold border border-[#e5e7eb] bg-[#f3f4f6] text-[#374151]">
                      {event.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#e5e5e5]">
                    <div>
                      <label className="block text-sm font-semibold text-[#111827] mb-2">Scheduled at</label>
                      <Input
                        type="datetime-local"
                        value={edits[event.id]?.scheduledAt || toLocalInput(event.scheduledAt)}
                        onChange={(e) => updateField(event.id, 'scheduledAt', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#111827] mb-2">Status</label>
                      <select
                        value={edits[event.id]?.status || event.status}
                        onChange={(e) => updateField(event.id, 'status', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#111827] mb-2">Zoom join URL</label>
                      <Input
                        value={edits[event.id]?.zoomJoinUrl || ''}
                        onChange={(e) => updateField(event.id, 'zoomJoinUrl', e.target.value)}
                        placeholder="https://zoom.us/j/..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => saveEvent(event.id)}>Save changes</Button>
                  </div>
                </div>
              </AnimatedCard>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
