'use client'

import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'
import { AnimatedCard } from '@/components/animated'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <div style={{ marginTop: '80px' }}>
        <PageHero title="Terms of Service" />
      </div>
      <main className="mx-auto max-w-4xl px-6 py-16">
        <AnimatedCard>
        <p className="text-lg text-[#737373] mb-8">
          Last updated: November 11, 2025
        </p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#17152b]">Acceptance of Terms</h2>
          <p className="text-[#404040] leading-relaxed">
            By accessing or using the Asia Pacific Online Seminar Series (APOSS) website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Code of Conduct</h2>
          <p className="text-gray-700">
            All participants in APOSS seminars and services must:
          </p>
          <ul className="list-disc pl-6 text-[#404040] space-y-2">
            <li>Treat all participants with respect and professionalism</li>
            <li>Provide constructive, thoughtful feedback</li>
            <li>Respect the confidentiality of unpublished work</li>
            <li>Avoid harassment, discrimination, or inappropriate behavior</li>
            <li>Follow academic integrity standards</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Intellectual Property</h2>
          <p className="text-gray-700">
            <strong>Presenter Rights:</strong> Research papers, presentations, and materials shared in APOSS seminars remain the intellectual property of the presenters and co-authors. All rights are reserved by the authors.
          </p>
          <p className="text-gray-700">
            <strong>Restrictions:</strong> Attendees and participants may not:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Distribute, reproduce, or publish seminar materials without explicit written permission</li>
            <li>Record audio or video of seminars without permission</li>
            <li>Use ideas or findings from unpublished work without proper attribution and consent</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Submission Guidelines</h2>
          <p className="text-gray-700">
            When submitting a paper proposal, you warrant that:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>You are the author or have permission from all co-authors to submit</li>
            <li>The work is original and does not infringe on third-party rights</li>
            <li>The paper is not already published in a peer-reviewed journal</li>
            <li>You will provide accurate and complete information</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Seminar Participation</h2>
          <p className="text-gray-700">
            Registration is required for all sessions. By registering, you agree to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Provide accurate contact information</li>
            <li>Attend sessions you register for when possible</li>
            <li>Participate constructively in discussions</li>
            <li>Not share Zoom links or meeting access with unauthorized individuals</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
          <p className="text-gray-700">
            APOSS is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of our services, including but not limited to technical issues, scheduling changes, or content quality.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Termination</h2>
          <p className="text-gray-700">
            We reserve the right to refuse service, cancel registrations, or ban users who violate these terms or engage in inappropriate conduct.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Changes to Terms</h2>
          <p className="text-gray-700">
            We may update these Terms of Service from time to time. Continued use of APOSS after changes constitutes acceptance of the new terms.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Contact</h2>
          <p className="text-gray-700">
            Questions about these terms? Contact us at{' '}
            <a href="mailto:contact@aposs.org" className="font-semibold text-[#00376c] underline">contact@aposs.org</a>.
          </p>
        </section>
        </AnimatedCard>
      </main>
    </div>
  )
}

