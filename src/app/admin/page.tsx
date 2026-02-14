'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { AnimatedCard } from '@/components/animated'
import { FileText, Clock, CheckCircle, TrendingUp } from 'lucide-react'

interface Submission {
  status: 'PENDING' | 'UNDER_REVIEW' | 'ACCEPTED' | 'SCHEDULED' | 'PRESENTED' | 'REJECTED'
}

interface Event {
  status: 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'
  scheduledAt: string
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [subRes, evRes] = await Promise.all([
          fetch('/api/submissions'),
          fetch('/api/events'),
        ])
        const subData = await subRes.json()
        const evData = await evRes.json()
        if (subData.success) setSubmissions(subData.submissions || [])
        if (evData.success) setEvents(evData.events || [])
      } catch (err) {
        console.error('Admin dashboard load error', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const pendingCount = submissions.filter(s => s.status === 'PENDING').length
  const acceptedCount = submissions.filter(s => s.status === 'ACCEPTED').length
  const upcomingCount = events.filter(e => new Date(e.scheduledAt) > new Date() && e.status === 'SCHEDULED').length

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
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-[#111827] mb-2">Dashboard</h1>
          <p className="text-[#4b5563]">Manage submissions and events</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatedCard className="border border-[#e5e5e5]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#6b7280] mb-2">Total Submissions</p>
                <p className="text-4xl font-bold text-[#111827]">{submissions.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#f3f4f6] flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#374151]" />
              </div>
            </div>
          </AnimatedCard>
          <AnimatedCard delay={0.05} className="border border-[#e5e5e5]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#6b7280] mb-2">Pending Review</p>
                <p className="text-4xl font-bold text-[#111827]">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#f3f4f6] flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#374151]" />
              </div>
            </div>
          </AnimatedCard>
          <AnimatedCard delay={0.1} className="border border-[#e5e5e5]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#6b7280] mb-2">Accepted</p>
                <p className="text-4xl font-bold text-[#111827]">{acceptedCount}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#f3f4f6] flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#374151]" />
              </div>
            </div>
          </AnimatedCard>
          <AnimatedCard delay={0.15} className="border border-[#e5e5e5]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#6b7280] mb-2">Upcoming Events</p>
                <p className="text-4xl font-bold text-[#111827]">{upcomingCount}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#f3f4f6] flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#374151]" />
              </div>
            </div>
          </AnimatedCard>
        </div>
        <AnimatedCard className="border border-[#e5e5e5]">
          <div className="flex flex-col md:flex-row gap-4">
            <Link
              href="/admin/submissions"
              className="no-underline inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#d4d4d4] text-[#374151] hover:bg-[#111827] hover:text-white font-semibold transition-colors"
            >
              Manage Submissions
            </Link>
            <Link
              href="/admin/events"
              className="no-underline inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#d4d4d4] text-[#374151] hover:bg-[#111827] hover:text-white font-semibold transition-colors"
            >
              Manage Events
            </Link>
            <Link
              href="/admin/registrations"
              className="no-underline inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#d4d4d4] text-[#374151] hover:bg-[#111827] hover:text-white font-semibold transition-colors"
            >
              View Registrations
            </Link>
            <Link
              href="/admin/settings"
              className="no-underline inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#d4d4d4] text-[#374151] hover:bg-[#111827] hover:text-white font-semibold transition-colors"
            >
              Settings
            </Link>
          </div>
        </AnimatedCard>
      </div>
    </AdminLayout>
  )
}
