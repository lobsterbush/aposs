'use client'

import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'
import { AnimatedCard } from '@/components/animated'

export default function SupportersPage() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '80px' }}>
        <PageHero title="Funders & Supporters" subtitle="We are grateful for the generous support that makes APOSS possible" />
      </div>
      <main className="min-h-screen bg-[#fafafa] py-16">
        <section className="mx-auto max-w-5xl px-6 space-y-8">
          <AnimatedCard>
            <h2 className="text-2xl font-bold text-[#17152b] mb-3">Supporters</h2>
            <p className="text-[#404040] leading-relaxed">
              We will list confirmed supporters and partners here as they come on board.
            </p>
          </AnimatedCard>

          <AnimatedCard className="bg-[#00376c]/5 border-[#00376c]/20">
            <h3 className="text-lg font-semibold text-[#17152b] mb-3">Interested in supporting APOSS?</h3>
            <p className="text-[#404040] leading-relaxed mb-4">
              Contact us to discuss sponsorships, hosting, and in-kind support opportunities.
            </p>
            <a href="/contact" className="inline-flex items-center gap-2 text-[#00376c] hover:text-[#17152b] font-semibold transition-colors">
              Get in touch →
            </a>
          </AnimatedCard>
        </section>
      </main>
    </>
  )
}
