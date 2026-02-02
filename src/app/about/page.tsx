'use client'

import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'
import { AnimatedCard, AnimatedButton } from '@/components/animated'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-aposs-gray-50" style={{ marginTop: '80px' }}>
        <PageHero title="About APOSS" subtitle="Overview and mission" />
        
        <section className="container max-w-4xl py-16 space-y-6">
          <AnimatedCard>
            <p className="text-lg text-aposs-gray-700 leading-relaxed">
              The Asian Politics Online Seminar Series (APOSS) is an online seminar series for political scientists working in, on, or adjacent to Asia.
              We have hosted <span className="font-bold text-aposs-navy">104 seminars to date</span>. Presenting or not, please join us—
              <span className="font-bold text-aposs-navy">registration is required for all sessions</span>.
            </p>
          </AnimatedCard>
          
          <AnimatedCard delay={0.1}>
            <h2 className="text-2xl font-bold text-aposs-navy mb-4">Organizers</h2>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-lg text-aposs-navy">Charles Crabtree</p>
                <p className="text-aposs-gray-700">Senior Lecturer, Monash University & K-Club Professor, Korea University</p>
                <a href="https://charlescrabtree.org" target="_blank" rel="noopener noreferrer" className="text-aposs-blue hover:text-aposs-navy font-semibold">charlescrabtree.org →</a>
              </div>
              <div>
                <p className="font-bold text-lg text-aposs-navy">Trevor Incerti</p>
                <p className="text-aposs-gray-700">Assistant Professor, University of Amsterdam</p>
                <a href="https://www.trevorincerti.com" target="_blank" rel="noopener noreferrer" className="text-aposs-blue hover:text-aposs-navy font-semibold">trevorincerti.com →</a>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <h2 className="text-2xl font-bold text-aposs-navy mb-4">About Trevor Incerti</h2>
            <div className="space-y-4 text-aposs-gray-700 leading-relaxed">
              <p>
                Trevor Incerti is an Assistant Professor of Political Economy at the University of Amsterdam. His research focuses on comparative political economy—especially the role of money in politics and business influence in politics—and how economic stimuli shape political behavior and preferences. Much of his work focuses on East Asia, particularly Japan. He also conducts research in quantitative methods, with an interest in the reliability and validity of measurement strategies.
              </p>
              <p>
                His research has appeared in the American Journal of Political Science, American Political Science Review, British Journal of Political Science, Journal of Politics, and Political Analysis, among other outlets, and has been covered by outlets such as The Economist, Het Financieele Dagblad, The New Yorker, and The Washington Post.
              </p>
              <p>
                He is an Expert at the Leiden Asia Centre and previously held positions as Visiting Assistant Professor in Modern and Contemporary Japanese Politics at Georgetown University and as a Postdoctoral Fellow at Harvard University's Weatherhead Center for International Affairs Program on U.S.-Japan Relations. He received his Ph.D. from Yale University and B.A. from UC Berkeley. Prior to graduate school, he worked as a Data Scientist and in economic consulting.
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

