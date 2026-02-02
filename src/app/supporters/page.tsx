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
        <section className="mx-auto max-w-5xl px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: 'The East Asia Research Foundation',
              url: 'https://example.com/funder1',
              blurb: 'Providing catalytic funding for scholarly exchange across Asia.',
            },
            {
              name: 'Global Democracy Initiative',
              url: 'https://example.com/funder2',
              blurb: 'Supporting research on governance and participation worldwide.',
            },
            {
              name: 'University of Eastport',
              url: 'https://example.com/funder3',
              blurb: 'Institutional host and administrative support.',
            },
            {
              name: 'The Comparative Politics Society',
              url: 'https://example.com/funder4',
              blurb: 'Community partnership and outreach.',
            },
          ].map((f, i) => (
            <AnimatedCard key={i} delay={i * 0.1}>
              <h2 className="text-xl font-bold text-[#17152b] mb-3">
                <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-[#00376c] hover:text-[#17152b] transition-colors">
                  {f.name} →
                </a>
              </h2>
              <p className="text-[#404040] leading-relaxed">{f.blurb}</p>
            </AnimatedCard>
          ))}
        </div>

          <AnimatedCard delay={0.4} className="mt-12 bg-[#00376c]/5 border-[#00376c]/20">
            <h3 className="text-lg font-semibold text-[#17152b] mb-3">Thanks</h3>
            <p className="text-[#404040] leading-relaxed mb-4">We are grateful to the APOSS community of presenters, discussants, and attendees, and to our partner institutions for their support.</p>
            <h3 className="text-lg font-semibold text-[#17152b] mb-3">Interested in supporting APOSS?</h3>
            <p className="text-[#404040] leading-relaxed">
              Contact us to discuss sponsorships, hosting, and in-kind support opportunities.
            </p>
          </AnimatedCard>
        </section>
      </main>
    </>
  )
}
