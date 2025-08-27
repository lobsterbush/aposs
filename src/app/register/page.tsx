"use client"

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [affiliation, setAffiliation] = useState("")
  const [interests, setInterests] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, affiliation, interests })
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
      } else {
        setError(data.error || 'Registration failed')
      }
    } catch {
      setError('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PageHero title="Register" subtitle="Registration is required for all sessions" />
      <main className="mx-auto max-w-2xl px-6 pt-8 pb-16">

        {success ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-green-800">Thank you! You're registered. We'll email you session details.</div>
        ) : (
          <form onSubmit={submit} className="space-y-5 bg-white rounded-2xl p-6 border border-gray-200">
            {error && <div className="rounded-lg border border-red-200 bg-red-50 text-red-800 p-3 text-sm">{error}</div>}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Dr. Jane Smith" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="jane@university.edu" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Affiliation</label>
              <Input value={affiliation} onChange={(e) => setAffiliation(e.target.value)} placeholder="University / Institute" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Interests (optional)</label>
              <Textarea value={interests} onChange={(e) => setInterests(e.target.value)} rows={3} placeholder="Topics, subfields, regions…" />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>{loading ? 'Submitting…' : 'Register'}</Button>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}

