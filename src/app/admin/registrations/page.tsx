'use client'

import { useEffect, useMemo, useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { AnimatedCard } from '@/components/animated'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Users, Mail, Building, Download, Search } from 'lucide-react'

interface Registration {
  id: string
  name: string
  email: string
  affiliation?: string | null
  interests?: string | null
  sections: string[]
  createdAt: string
}

function toCsv(rows: Registration[]) {
  const headers = ['name', 'email', 'affiliation', 'sections', 'interests', 'createdAt']
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`
  const lines = rows.map((r) => [
    escape(r.name || ''),
    escape(r.email || ''),
    escape(r.affiliation || ''),
    escape((r.sections || []).join('; ')),
    escape(r.interests || ''),
    escape(new Date(r.createdAt).toISOString()),
  ].join(','))
  return [headers.join(','), ...lines].join('\n')
}

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  const fetchRegistrations = async () => {
    try {
      const res = await fetch('/api/registrations')
      const data = await res.json()
      if (data.success) {
        setRegistrations(data.registrations || [])
      }
    } catch (error) {
      console.error('Error fetching registrations:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const filtered = useMemo(() => {
    return registrations.filter(r => {
      const q = query.toLowerCase()
      return q === '' ||
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        (r.affiliation || '').toLowerCase().includes(q) ||
        (r.interests || '').toLowerCase().includes(q)
    })
  }, [registrations, query])

  const exportCsv = () => {
    const csv = toCsv(filtered)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `aposs-registrations-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
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
          <h1 className="text-4xl font-bold text-[#111827] mb-2">Registrations</h1>
          <p className="text-[#4b5563]">View and export attendee registrations</p>
        </div>

        <AnimatedCard className="border border-[#e5e5e5]">
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="relative md:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, affiliation..."
                className="pl-9"
              />
            </div>
            <Button onClick={exportCsv} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </AnimatedCard>

        <div className="grid grid-cols-1 gap-6">
          {filtered.length === 0 ? (
            <AnimatedCard className="text-center py-12 border border-[#e5e5e5]">
              <Users className="w-12 h-12 mx-auto mb-4 text-[#9ca3af]" />
              <p className="text-[#6b7280]">No registrations found.</p>
            </AnimatedCard>
          ) : (
            filtered.map((reg, idx) => (
              <AnimatedCard key={reg.id} delay={idx * 0.02} className="border border-[#e5e5e5]">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-[#111827]">{reg.name}</h2>
                  <div className="flex flex-wrap gap-3 text-sm text-[#6b7280]">
                    <span className="inline-flex items-center gap-1"><Mail className="w-4 h-4" />{reg.email}</span>
                    {reg.affiliation && (
                      <span className="inline-flex items-center gap-1"><Building className="w-4 h-4" />{reg.affiliation}</span>
                    )}
                  </div>
                  {reg.sections?.length > 0 && (
                    <p className="text-sm text-[#4b5563]"><strong>Sections:</strong> {reg.sections.join(', ')}</p>
                  )}
                  {reg.interests && (
                    <p className="text-sm text-[#4b5563]"><strong>Interests:</strong> {reg.interests}</p>
                  )}
                  <p className="text-xs text-[#9ca3af]">Registered: {new Date(reg.createdAt).toLocaleString()}</p>
                </div>
              </AnimatedCard>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
