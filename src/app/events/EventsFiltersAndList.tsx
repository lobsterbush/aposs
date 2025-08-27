"use client"

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Calendar, User } from 'lucide-react'

type PublicEventClient = {
  id: string
  title: string
  scheduledAt: string
  presenter: string
  status: 'SCHEDULED' | 'COMPLETED'
  tags?: string[]
}

export default function EventsFiltersAndList({ initialEvents }: { initialEvents: PublicEventClient[] }) {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<'ALL' | 'SCHEDULED' | 'COMPLETED'>('ALL')
  const [tag, setTag] = useState<string>('ALL')

  const allTags = useMemo(() => {
    const s = new Set<string>()
    initialEvents.forEach(e => (e.tags || []).forEach(t => s.add(t)))
    return ['ALL', ...Array.from(s)]
  }, [initialEvents])

  const filtered = useMemo(() => {
    return initialEvents.filter(e => {
      const matchesQ = q.trim() === '' || e.title.toLowerCase().includes(q.toLowerCase()) || e.presenter.toLowerCase().includes(q.toLowerCase())
      const matchesStatus = status === 'ALL' || e.status === status
      const matchesTag = tag === 'ALL' || (e.tags || []).includes(tag)
      return matchesQ && matchesStatus && matchesTag
    })
  }, [initialEvents, q, status, tag])

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title or presenter…"
          className="w-full sm:w-1/2 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00376c]"
        />
        <div className="flex gap-3">
          <select value={status} onChange={(e) => setStatus(e.target.value as 'ALL' | 'SCHEDULED' | 'COMPLETED')} className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
            <option value="ALL">All</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <select value={tag} onChange={(e) => setTag(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
            {allTags.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.map((e) => (
          <article key={e.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <Link href={`/events/${e.id}`} className="block no-underline">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">{e.title}</h2>
              <div className="text-sm text-gray-600 flex flex-wrap gap-4 items-center">
                <span className="inline-flex items-center"><User className="w-4 h-4 mr-1 text-[#00376c]" />{e.presenter}</span>
                <span className="inline-flex items-center"><Calendar className="w-4 h-4 mr-1 text-[#00376c]" />{new Date(e.scheduledAt).toLocaleString()}</span>
                <span className="inline-flex items-center">Status: {e.status}</span>
                <span className="inline-flex items-center gap-2">
                  {(e.tags || []).map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-[#00376c]/10 text-[#00376c] border border-[#00376c]/15">{t}</span>
                  ))}
                </span>
              </div>
            </Link>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="text-gray-600">No events match your filters.</div>
        )}
      </div>
    </div>
  )
}

