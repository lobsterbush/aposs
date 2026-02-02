"use client"

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'
import { AnimatedCard, AnimatedButton } from '@/components/animated'
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
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <div style={{ marginTop: '80px' }}>
        <PageHero title="Register" subtitle="Registration is required for all sessions" />
      </div>
      <main className="mx-auto max-w-2xl px-6 py-16">

        {success ? (
          <AnimatedCard className="bg-green-50 border-green-200">
            <p className="text-green-800 font-semibold">Thank you! You're registered. We'll email you session details.</p>
          </AnimatedCard>
        ) : (
          <AnimatedCard>
            {error && <div className="rounded-lg border border-red-200 bg-red-50 text-red-800 p-3 text-sm mb-5">{error}</div>}
            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#17152b] mb-2">Full Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Dr. Jane Smith" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#17152b] mb-2">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="jane@university.edu" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#17152b] mb-2">Affiliation</label>
                <Input value={affiliation} onChange={(e) => setAffiliation(e.target.value)} placeholder="University / Institute" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#17152b] mb-2">Interests (optional)</label>
                <Textarea value={interests} onChange={(e) => setInterests(e.target.value)} rows={3} placeholder="Topics, subfields, regions…" />
              </div>
              <div className="flex justify-end">
                <AnimatedButton variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Submitting…' : 'Register'}
                </AnimatedButton>
              </div>
            </form>
          </AnimatedCard>
        )}
      </main>
    </div>
  )
}

