import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'

export default function SupportersPage() {
  return (
    <>
      <Header />
      <PageHero title="Funders & Supporters" subtitle="We are grateful for the generous support that makes APOSS possible" />
      <main className="min-h-screen bg-white pt-8 pb-16">
        <section className="mx-auto max-w-5xl px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
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
            <article key={i} className="rounded-2xl border border-gray-200 shadow-sm p-6 bg-white">
              <h2 className="text-xl font-bold text-gray-900">
                <a href={f.url} target="_blank" rel="noopener noreferrer" className="underline">
                  {f.name}
                </a>
              </h2>
              <p className="text-gray-700 mt-2">{f.blurb}</p>
            </article>
          ))}
        </div>

          <div className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6 space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Thanks</h3>
            <p className="text-gray-700">We are grateful to the APOSS community of presenters, discussants, and attendees, and to our partner institutions for their support.</p>
            <h3 className="text-lg font-semibold text-gray-900 mt-4">Interested in supporting APOSS?</h3>
            <p className="text-gray-700">
              Contact us to discuss sponsorships, hosting, and in-kind support opportunities.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
