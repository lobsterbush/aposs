'use client'

import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'
import { AnimatedCard, AnimatedButton } from '@/components/animated'
import { Mail } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-aposs-gray-50">
      <Header />
      <div style={{ marginTop: '80px' }}>
        <PageHero title="Contact" subtitle="We'd love to hear from you" />
      </div>
      <main className="container max-w-4xl py-16 space-y-6">
        <AnimatedCard>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-aposs-blue bg-opacity-10 flex items-center justify-center">
              <Mail className="w-6 h-6 text-aposs-blue" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-aposs-navy mb-3">General Inquiries</h2>
              <p className="text-aposs-gray-700 leading-relaxed">
                For general questions about APOSS, please contact us at{' '}
                <a href="mailto:contact@aposs.org" className="text-aposs-blue hover:text-aposs-navy font-semibold">contact@aposs.org</a>.
              </p>
            </div>
          </div>
        </AnimatedCard>
        
        <AnimatedCard delay={0.1}>
          <h2 className="text-2xl font-bold text-aposs-navy mb-4">Submit Your Research</h2>
          <p className="text-aposs-gray-700 mb-6 leading-relaxed">
            Interested in presenting? Use our online submission form to propose your research.
          </p>
          <AnimatedButton variant="primary" size="lg" href="/submit">
            Submit Your Proposal
          </AnimatedButton>
        </AnimatedCard>
        
        <AnimatedCard delay={0.2}>
          <h2 className="text-2xl font-bold text-aposs-navy mb-4">Organizers</h2>
          <div className="space-y-6">
            <div>
              <p className="font-bold text-lg text-aposs-navy">Charles Crabtree</p>
              <p className="text-aposs-gray-700">Senior Lecturer, Monash University & K-Club Professor, Korea University</p>
              <p className="text-sm text-aposs-gray-600 mt-1">
                Website: <a href="https://charlescrabtree.org" target="_blank" rel="noopener noreferrer" className="text-aposs-blue hover:text-aposs-navy font-semibold">charlescrabtree.org →</a>
              </p>
            </div>
            <div>
              <p className="font-bold text-lg text-aposs-navy">Trevor Incerti</p>
              <p className="text-aposs-gray-700">Assistant Professor, University of Amsterdam</p>
              <p className="text-sm text-aposs-gray-600 mt-1">
                Website: <a href="https://www.trevorincerti.com" target="_blank" rel="noopener noreferrer" className="text-aposs-blue hover:text-aposs-navy font-semibold">trevorincerti.com →</a>
              </p>
            </div>
          </div>
        </AnimatedCard>
        
        <AnimatedCard delay={0.3}>
          <h2 className="text-2xl font-bold text-aposs-navy mb-4">Stay Connected</h2>
          <p className="text-aposs-gray-700 mb-6 leading-relaxed">
            Register for our seminars to receive email updates about upcoming presentations and events.
          </p>
          <AnimatedButton variant="secondary" size="lg" href="/register">
            Register Now
          </AnimatedButton>
        </AnimatedCard>
      </main>
    </div>
  )
}

