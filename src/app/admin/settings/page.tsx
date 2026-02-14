'use client'

import { useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { AnimatedCard } from '@/components/animated'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface SettingsForm {
  siteName: string
  siteDescription: string
  contactEmail: string
  submissionsOpen: boolean
  maxSubmissionsPerWeek: number
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingsForm | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/settings')
        const data = await res.json()
        if (data.success) {
          setSettings(data.settings)
        } else {
          setError('Failed to load settings')
        }
      } catch {
        setError('Failed to load settings')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const save = async () => {
    if (!settings) return
    setSaving(true)
    setError(null)
    setSuccess(false)
    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      const data = await res.json()
      if (data.success) {
        setSettings(data.settings)
        setSuccess(true)
      } else {
        setError(data.message || 'Failed to save settings')
      }
    } catch {
      setError('Failed to save settings')
    } finally {
      setSaving(false)
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

  if (!settings) {
    return (
      <AdminLayout>
        <AnimatedCard className="border border-[#e5e5e5]">
          <p className="text-[#6b7280]">Unable to load settings.</p>
        </AnimatedCard>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-[#111827] mb-2">Settings</h1>
          <p className="text-[#4b5563]">Manage site defaults and submission controls</p>
        </div>

        <AnimatedCard className="border border-[#e5e5e5] space-y-6">
          {error && <div className="rounded-lg border border-red-200 bg-red-50 text-red-800 p-3 text-sm">{error}</div>}
          {success && <div className="rounded-lg border border-green-200 bg-green-50 text-green-800 p-3 text-sm">Settings saved.</div>}

          <div>
            <label className="block text-sm font-semibold text-[#111827] mb-2">Site name</label>
            <Input
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#111827] mb-2">Site description</label>
            <Input
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#111827] mb-2">Contact email</label>
            <Input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="settings-submissions-open"
              type="checkbox"
              checked={settings.submissionsOpen}
              onChange={(e) => setSettings({ ...settings, submissionsOpen: e.target.checked })}
              className="h-4 w-4 border-gray-300 text-black focus:ring-black"
            />
            <label htmlFor="settings-submissions-open" className="text-sm font-semibold text-[#111827]">
              Submissions are open
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#111827] mb-2">Max submissions per week</label>
            <Input
              type="number"
              min={0}
              value={settings.maxSubmissionsPerWeek}
              onChange={(e) => setSettings({ ...settings, maxSubmissionsPerWeek: Number(e.target.value) })}
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={save} disabled={saving}>
              {saving ? 'Saving…' : 'Save settings'}
            </Button>
          </div>
        </AnimatedCard>
      </div>
    </AdminLayout>
  )
}
