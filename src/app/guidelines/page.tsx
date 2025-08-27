import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PageHero title="Seminar Guidelines" subtitle="How we run our sessions" />
      <main className="mx-auto max-w-3xl px-6 pt-8 pb-16 space-y-8">

        <section className="rounded-2xl border border-gray-200 p-6 bg-white space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Purpose</h2>
          <p className="text-gray-700">The overriding purpose of the virtual workshop is to improve the research being discussed. A good comment doesn’t just point out a weakness in the project, it also suggests what could be done to make it better. Erudition displays are discouraged.</p>
        </section>

        <section className="rounded-2xl border border-gray-200 p-6 bg-white space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">Format</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Regular seminar sessions will be open to the public and last for 60 minutes.</li>
            <li>They will be scheduled weekly or every two weeks, depending on submissions.</li>
            <li>We will recruit 2–3 discussants (from Asia and other parts of the world) to read each paper and offer feedback.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-200 p-6 bg-white space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">Paper distribution</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Authors distribute their paper to us at least seven days in advance, and we forward it to the discussants.</li>
            <li>Papers can be either working papers or pre-analysis plans.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-200 p-6 bg-white space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">Session flow</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Authors provide a ten-minute presentation of their work at the beginning of the sessions.</li>
            <li>The discussants provide a brief critique of the work to get us started.</li>
            <li>Then the floor is opened for the other discussants and attendees to contribute.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-200 p-6 bg-white space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">Discussant expectations</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Discussants must read the paper and provide feedback to the author.</li>
            <li>We expect reciprocity in that authors should be willing to discuss someone else’s research in the future.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-200 p-6 bg-white space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">Written comments</h2>
          <p className="text-gray-700">In addition to oral comments, discussants are encouraged to email written comments to the author after the workshop to communicate specialized knowledge (citations, technical points that could not be covered verbally) or to point out issues that did not receive sufficient attention during the workshop session.</p>
        </section>

        <section className="rounded-2xl border border-gray-200 p-6 bg-white space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">Acknowledgments</h2>
          <p className="text-gray-700">Many thanks to Kentaro Fukumoto, Yusaku Horiuchi, Shoko Kohama, and Atsushi Tago for excellent suggestions about how to structure the seminar series!</p>
        </section>

        <div className="rounded-2xl border border-[#00376c]/10 bg-[#00376c]/5 p-6 text-[#00376c]">
          Ready to join? <a href="/register" className="underline font-semibold">Register for upcoming sessions →</a>
        </div>
      </main>
    </div>
  )
}

