import Image from 'next/image'

import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'

export default function PresentersPage() {
  return (
    <>
      <Header />
      <PageHero title="Past Presenters" subtitle="Highlights from prior APOSS seminars" />
      <main className="min-h-screen bg-white pt-8 pb-16">
        <section className="mx-auto max-w-6xl px-6">
          <div className="mb-10 rounded-xl bg-[#00376c]/5 border border-[#00376c]/10 p-4 text-sm text-[#00376c]">
            Looking for full archives? See Past Sessions (Season 1 & Season 2) in our events archive.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {[1, 2, 3, 4].map((i) => (
            <article key={i} className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white">
              <div className="relative aspect-video bg-gray-100">
                <Image
                  src={`https://picsum.photos/seed/aposs-${i}/1200/675`}
                  alt="Zoom session screenshot"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={i === 1}
                />
              </div>
              <div className="p-6 space-y-4">
                <header>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Paper Title Example #{i}: Electoral Accountability in Urban Asia
                  </h2>
                  <p className="text-gray-700 mt-1">
                    <a
                      href="https://example.com/presenter"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline"
                    >
                      Dr. Alex Kim
                    </a>{' '}
                    — University of Eastport
                  </p>
                  <p className="text-gray-700">
                    Coauthors:{' '}
                    <a
                      href="https://example.com/co1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      M. Chen
                    </a>
                    ,{' '}
                    <a
                      href="https://example.com/co2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      S. Rao
                    </a>
                  </p>
                </header>
                <section>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Abstract</h3>
                  <p className="mt-2 text-gray-700 leading-relaxed">
                    We study variation in electoral accountability in rapidly urbanizing Asian contexts. Using original survey and
                    administrative data, we show that service delivery improvements coincide with greater incumbent support, but
                    that effects vary by neighborhood institutional embeddedness. We discuss implications for governance and
                    participation across city types.
                  </p>
                </section>
                <section>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Discussants</h3>
                  <p className="mt-1 text-gray-700">
                    <a
                      href="https://example.com/disc1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline"
                    >
                      Prof. Lina Park
                    </a>{' '}
                    — Seoul National University;{' '}
                    <a
                      href="https://example.com/disc2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline"
                    >
                      Dr. Ravi Singh
                    </a>{' '}
                    — National University of Singapore
                  </p>
                </section>
              </div>
            </article>
          ))}
          </div>
        </section>
      </main>
    </>
  )
}
