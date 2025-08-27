import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24 pb-16">
        <PageHero title="About APOSS" subtitle="Overview and mission" />
        <section className="relative mx-auto max-w-3xl px-6 space-y-8 mt-8">
        <p className="text-lg text-gray-700">
          The Asian Politics Online Seminar Series (APOSS) is an online seminar series for political scientists working in, on, or adjacent to Asia.
          We have hosted <span className="font-semibold text-[#00376c]">104 seminars to date</span>. Presenting or not, please join us—
          <span className="font-medium">registration is required for all sessions</span>.
        </p>
        <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Organizers</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li><a href="https://charlescrabtree.org" target="_blank" rel="noopener noreferrer" className="font-semibold underline">Charles Crabtree</a></li>
            <li>Trevor Incerti</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-gray-200 p-6 bg-white space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Seminar Guidelines</h2>
          <p className="text-gray-700">Our sessions are structured to maximize constructive feedback and inclusivity. We welcome a diversity of approaches and topics across methods and subfields.</p>
          <p className="text-gray-700">Times are presented in JST as default for historical reasons. Sessions featuring European scholars may be presented in EST for convenience.</p>
          <div className="pt-2">
            <a href="/guidelines" className="text-[#00376c] underline font-medium">Read the full guidelines →</a>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 p-6 bg-white space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">Trevor Incerti</h2>
          <p className="text-gray-700">
            Trevor Incerti is an Assistant Professor of Political Economy at the University of Amsterdam. His research focuses on comparative political economy—especially the role of money in politics and business influence in politics—and how economic stimuli shape political behavior and preferences. Much of his work focuses on East Asia, particularly Japan. He also conducts research in quantitative methods, with an interest in the reliability and validity of measurement strategies.
          </p>
          <p className="text-gray-700">
            His research has appeared in the American Journal of Political Science, American Political Science Review, British Journal of Political Science, Journal of Politics, and Political Analysis, among other outlets, and has been covered by outlets such as The Economist, Het Financieele Dagblad, The New Yorker, and The Washington Post.
          </p>
          <p className="text-gray-700">
            He is an Expert at the Leiden Asia Centre and previously held positions as Visiting Assistant Professor in Modern and Contemporary Japanese Politics at Georgetown University and as a Postdoctoral Fellow at Harvard University’s Weatherhead Center for International Affairs Program on U.S.-Japan Relations. He received his Ph.D. from Yale University and B.A. from UC Berkeley. Prior to graduate school, he worked as a Data Scientist and in economic consulting.
          </p>
          <p className="text-gray-700">
            Learn more at <a href="https://www.trevorincerti.com/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">trevorincerti.com</a>.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Mission & Values</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Foster rigorous, problem-driven research on Asian politics.</li>
            <li>Promote inclusivity, collegiality, and constructive feedback.</li>
            <li>Champion early-career scholars and methodological pluralism.</li>
          </ul>
          <div className="pt-3">
            <a href="/register" className="text-[#00376c] underline font-medium">Register for upcoming sessions →</a>
          </div>
        </div>
        </section>
      </main>
    </>
  )
}

