import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'

const discussants: { name: string; affiliation?: string }[] = [
  { name: 'Nicholas Anderson', affiliation: 'George Washington' },
  { name: 'Simon Calmar Andersen', affiliation: 'Aarhus' },
  { name: 'Fabio Angiolillo', affiliation: 'HKU' },
  { name: 'Maneesh Arora', affiliation: 'Wellesley' },
  { name: 'Adam Auerbach', affiliation: 'American' },
  { name: 'Javier Auyero', affiliation: 'Texas' },
  { name: 'Tobias Bach', affiliation: 'Oslo' },
  { name: 'Matt Baldwin', affiliation: 'Florida' },
  { name: 'Matthew A. Baum', affiliation: 'Harvard' },
  { name: 'Fiona Shen Bayh', affiliation: 'William & Mary' },
  { name: 'Quintin Beazer', affiliation: 'Florida State' },
  { name: 'Karen Beckwith', affiliation: 'Case Western' },
  { name: 'Thomas Berger', affiliation: 'Boston University' },
  { name: 'Adam J. Berinsky', affiliation: 'MIT' },
  { name: 'John Berry', affiliation: "Queen's" },
]

export default function ThanksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PageHero
        title="With Gratitude"
        subtitle="So many kind, creative, generous people have been involved in APOSS since Spring 2020. We’re grateful for all of them."
      />

      <main className="relative">
        {/* Decorative backdrop */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-20">
          <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-500/30 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 w-96 h-96 rounded-full bg-gradient-to-tr from-sky-300/30 to-blue-600/30 blur-3xl" />
        </div>

        <section className="mx-auto max-w-6xl px-6 py-12 relative">
          {/* Top card */}
          <div className="rounded-3xl bg-gradient-to-br from-[#0a1628] via-[#0f2342] to-[#00376c] p-[1px] shadow-elegant mb-10">
            <div className="rounded-3xl bg-white/90 dark:bg-white/90 p-8">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#17152b] mb-2">Thank you to our Discussants</h2>
                  <p className="text-gray-700 text-lg">
                    APOSS is grateful to the kind and generous help of our many discussants. Please check out their
                    websites and read their research!
                  </p>
                </div>
                <div className="flex md:justify-end items-start">
                  <Link
                    href="https://www.notion.so/Thanks-16daf45fd06444f8a2084a325a0fa6fc"
                    target="_blank"
                    className="no-underline inline-flex items-center px-5 py-3 rounded-xl bg-[#00376c] text-white font-semibold shadow-md hover:bg-[#17152b]"
                  >
                    View full acknowledgements
                    <svg viewBox="0 0 24 24" className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Discussants grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {discussants.map((d, idx) => (
              <article
                key={`${d.name}-${idx}`}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/10 transition-colors" />
                <div className="p-6 relative">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#00376c] to-[#17152b] text-white flex items-center justify-center font-bold shadow-md">
                      {d.name.split(' ').map((n) => n[0]).slice(0,2).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#17152b]">{d.name}</h3>
                      {d.affiliation && (
                        <p className="text-sm text-gray-600">{d.affiliation}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#00376c]/10 text-[#00376c]">
                      Discussant
                    </span>
                    <Link
                      href={`https://www.google.com/search?q=${encodeURIComponent(`${d.name} ${d.affiliation ?? ''}`)}`}
                      target="_blank"
                      className="no-underline text-[#00376c] hover:text-[#17152b] inline-flex items-center text-sm font-medium"
                    >
                      Find research
                      <svg viewBox="0 0 24 24" className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* More thanks */}
          <div className="mt-12 rounded-3xl border border-[#00376c]/15 bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
            <h3 className="text-xl md:text-2xl font-bold text-[#17152b] mb-3">And many more…</h3>
            <p className="text-gray-700">
              The list above is only a small sample from our full acknowledgements. We’re deeply grateful to every
              discussant, presenter, moderator, organizer, and supporter who helps make APOSS possible.
              Browse the complete list and links on our Notion page.
            </p>
            <div className="mt-4">
              <Link
                href="https://www.notion.so/Thanks-16daf45fd06444f8a2084a325a0fa6fc"
                target="_blank"
                className="no-underline inline-flex items-center px-4 py-2 rounded-lg bg-[#00376c] text-white font-semibold hover:bg-[#17152b]"
              >
                Open Notion acknowledgements
                <svg viewBox="0 0 24 24" className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

