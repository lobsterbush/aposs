'use client'

import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'
import { AnimatedCard, AnimatedButton } from '@/components/animated'

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-aposs-gray-50">
      <Header />
      <div style={{ marginTop: '80px' }}>
        <PageHero title="Seminar Guidelines" subtitle="How we run our sessions" />
      </div>
      <main className="container max-w-4xl py-16 space-y-6">

        <AnimatedCard>
          <h2 className="text-2xl font-bold text-aposs-navy mb-4">Purpose</h2>
          <p className="text-aposs-gray-700 leading-relaxed">The overriding purpose of the virtual workshop is to improve the research being discussed. A good comment doesn't just point out a weakness in the project, it also suggests what could be done to make it better. Erudition displays are discouraged.</p>
        </AnimatedCard>

        <AnimatedCard delay={0.1}>
          <h2 className="text-2xl font-bold text-aposs-navy mb-4">Format</h2>
          <ul className="space-y-3 text-aposs-gray-700 leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aposs-orange text-white flex items-center justify-center text-xs font-bold mt-0.5">•</span>
              <span>Regular seminar sessions will be open to the public and last for 60 minutes.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aposs-orange text-white flex items-center justify-center text-xs font-bold mt-0.5">•</span>
              <span>They are scheduled every two weeks.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aposs-orange text-white flex items-center justify-center text-xs font-bold mt-0.5">•</span>
              <span>We will recruit 2–3 discussants (from Asia and other parts of the world) to read each paper and offer feedback.</span>
            </li>
          </ul>
        </AnimatedCard>

        <AnimatedCard delay={0.2}>
          <h2 className="text-2xl font-bold text-aposs-navy mb-4">Paper distribution</h2>
          <ul className="space-y-3 text-aposs-gray-700 leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aposs-blue text-white flex items-center justify-center text-xs font-bold mt-0.5">•</span>
              <span>Authors distribute their paper to us at least seven days in advance, and we forward it to the discussants.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aposs-blue text-white flex items-center justify-center text-xs font-bold mt-0.5">•</span>
              <span>Papers can be either working papers or pre-analysis plans.</span>
            </li>
          </ul>
        </AnimatedCard>

        <AnimatedCard delay={0.3}>
          <h2 className="text-2xl font-bold text-aposs-navy mb-4">Session flow</h2>
          <ul className="space-y-3 text-aposs-gray-700 leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aposs-red text-white flex items-center justify-center text-xs font-bold mt-0.5">1</span>
              <span>Authors provide a ten-minute presentation of their work at the beginning of the sessions.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aposs-red text-white flex items-center justify-center text-xs font-bold mt-0.5">2</span>
              <span>The discussants provide a brief critique of the work to get us started.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aposs-red text-white flex items-center justify-center text-xs font-bold mt-0.5">3</span>
              <span>Then the floor is opened for the other discussants and attendees to contribute.</span>
            </li>
          </ul>
        </AnimatedCard>

        <AnimatedCard delay={0.4}>
          <h2 className="text-2xl font-bold text-aposs-navy mb-4">Discussant expectations</h2>
          <ul className="space-y-3 text-aposs-gray-700 leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aposs-blue text-white flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
              <span>Discussants must read the paper and provide feedback to the author.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aposs-blue text-white flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
              <span>We expect reciprocity in that authors should be willing to discuss someone else’s research in the future.</span>
            </li>
          </ul>
        </AnimatedCard>

        <AnimatedCard delay={0.5}>
          <h2 className="text-2xl font-bold text-aposs-navy mb-4">Written comments</h2>
          <p className="text-aposs-gray-700 leading-relaxed">In addition to oral comments, discussants are encouraged to email written comments to the author after the workshop to communicate specialized knowledge (citations, technical points that could not be covered verbally) or to point out issues that did not receive sufficient attention during the workshop session.</p>
        </AnimatedCard>

        <AnimatedCard delay={0.6}>
          <h2 className="text-2xl font-bold text-aposs-navy mb-4">Acknowledgments</h2>
          <p className="text-aposs-gray-700 leading-relaxed">Many thanks to Kentaro Fukumoto, Yusaku Horiuchi, Shoko Kohama, and Atsushi Tago for excellent suggestions about how to structure the seminar series!</p>
        </AnimatedCard>

        <AnimatedCard delay={0.7}>
          <div className="text-center">
            <p className="text-lg text-aposs-gray-700 mb-6">Ready to join our community?</p>
            <AnimatedButton variant="primary" size="lg" href="/register">
              Register for upcoming sessions
            </AnimatedButton>
          </div>
        </AnimatedCard>
      </main>
    </div>
  )
}

