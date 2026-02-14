'use client'
import { useEffect, useState } from 'react'

import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'
import { AnimatedCard, AnimatedButton } from '@/components/animated'

export default function AboutPage() {
  const [seminarCount, setSeminarCount] = useState<number | null>(null)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/public/events')
        const data = await res.json()
        if (data.success && Array.isArray(data.events)) {
          const now = new Date()
          const hostedCount = data.events.filter((event: { scheduledAt: string; status: string }) => {
            return event.status === 'COMPLETED' || new Date(event.scheduledAt) < now
          }).length
          setSeminarCount(hostedCount)
        }
      } catch {
        setSeminarCount(null)
      }
    }

    fetchCount()
  }, [])
  return (
    <>
      <Header />
      <main className="min-h-screen bg-aposs-gray-50" style={{ marginTop: '80px' }}>
        <PageHero title="About APOSS" subtitle="Overview and mission" />
        
        <section className="container max-w-4xl py-16 space-y-6">
          <AnimatedCard>
            <p className="text-lg text-aposs-gray-700 leading-relaxed">
              The Asia Pacific Online Seminar Series (APOSS) is an online seminar series for political scientists working in, on, or adjacent to Asia.
              {' '}We have hosted{' '}
              {seminarCount === null ? (
                <span className="font-bold text-aposs-navy">many seminars to date</span>
              ) : (
                <span className="font-bold text-aposs-navy">{seminarCount} seminars to date</span>
              )}
              . Presenting or not, please join us—
              <span className="font-bold text-aposs-navy">registration is required for all sessions</span>.
            </p>
          </AnimatedCard>
          
          <AnimatedCard delay={0.1}>
            <h2 className="text-2xl font-bold text-aposs-navy mb-4">Organizer</h2>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-lg text-aposs-navy">Charles Crabtree</p>
                <p className="text-aposs-gray-700">Senior Lecturer, Monash University & K-Club Professor, Korea University</p>
                <a href="https://charlescrabtree.org" target="_blank" rel="noopener noreferrer" className="text-aposs-blue hover:text-aposs-navy font-semibold">charlescrabtree.org →</a>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <h2 className="text-2xl font-bold text-aposs-navy mb-4">About APOSS</h2>
            <div className="space-y-4 text-aposs-gray-700 leading-relaxed">
              <p>
                APOSS is a forum for rigorous, problem-driven research on Asian politics. We welcome a diversity of methods and stages of research and aim to provide constructive, focused feedback in each session.
              </p>
              <p>
                We prioritize early-career scholars and foster a collegial environment with discussant-led feedback and open Q&A.
              </p>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.3}>
            <h2 className="text-2xl font-bold text-aposs-navy mb-4">Mission & Values</h2>
            <ul className="space-y-3 text-aposs-gray-700 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aposs-blue text-white flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                <span>Foster rigorous, problem-driven research on Asian politics.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aposs-blue text-white flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                <span>Promote inclusivity, collegiality, and constructive feedback.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aposs-blue text-white flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                <span>Champion early-career scholars and methodological pluralism.</span>
              </li>
            </ul>
            <div className="mt-6">
              <AnimatedButton variant="secondary" href="/register">
                Register for upcoming sessions
              </AnimatedButton>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.4}>
            <h2 className="text-2xl font-bold text-aposs-navy mb-4">Seminar Guidelines</h2>
            <p className="text-aposs-gray-700 mb-3 leading-relaxed">Our sessions are structured to maximize constructive feedback and inclusivity. We welcome a diversity of approaches and topics across methods and subfields.</p>
            <p className="text-aposs-gray-700 mb-4 leading-relaxed">Times are presented in JST as default for historical reasons. Sessions featuring European scholars may be presented in EST for convenience.</p>
            <AnimatedButton variant="ghost" href="/guidelines">
              Read the full guidelines
            </AnimatedButton>
          </AnimatedCard>
        </section>
      </main>
    </>
  )
}

