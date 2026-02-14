'use client'

import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'
import { AnimatedCard } from '@/components/animated'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <div style={{ marginTop: '80px' }}>
        <PageHero title="Privacy Policy" />
      </div>
      <main className="mx-auto max-w-4xl px-6 py-16">
        <AnimatedCard>
        <p className="text-lg text-[#737373] mb-8">
          Last updated: November 11, 2025
        </p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#17152b]">Information We Collect</h2>
          <p className="text-[#404040] leading-relaxed">
            When you submit a paper proposal or register for seminars, we collect:
          </p>
          <ul className="list-disc pl-6 text-[#404040] space-y-2">
            <li>Your name, email address, and institutional affiliation</li>
            <li>Paper titles and abstracts</li>
            <li>Research details such as field, methodology, and keywords</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#17152b]">How We Use Your Information</h2>
          <p className="text-[#404040] leading-relaxed">
            We use your information to:
          </p>
          <ul className="list-disc pl-6 text-[#404040] space-y-2">
            <li>Review and evaluate paper submissions</li>
            <li>Schedule and organize seminar presentations</li>
            <li>Send you email notifications about your submissions and upcoming events</li>
            <li>Share papers with assigned discussants</li>
            <li>Manage event registrations and send Zoom links</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#17152b]">Data Sharing</h2>
          <p className="text-[#404040] leading-relaxed">
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc pl-6 text-[#404040] space-y-2">
            <li><strong>Discussants:</strong> Assigned discussants receive papers and author information to prepare feedback</li>
            <li><strong>Registered Attendees:</strong> Presenter names and paper titles are shared in event schedules</li>
            <li><strong>Service Providers:</strong> We use third-party services (email, file storage) to operate APOSS</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#17152b]">Data Security</h2>
          <p className="text-[#404040] leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#17152b]">Your Rights</h2>
          <p className="text-[#404040] leading-relaxed">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-[#404040] space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information (subject to our legitimate interests)</li>
            <li>Withdraw consent for email communications</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#17152b]">Cookies</h2>
          <p className="text-[#404040] leading-relaxed">
            We use essential cookies for authentication and site functionality. We do not use tracking or advertising cookies.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#17152b]">Contact Us</h2>
          <p className="text-[#404040] leading-relaxed">
            If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at{' '}
            <a href="mailto:privacy@aposs.org" className="font-semibold text-[#00376c] underline">privacy@aposs.org</a>.
          </p>
        </section>
        </AnimatedCard>
      </main>
    </div>
  )
}

