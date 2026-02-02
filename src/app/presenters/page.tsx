'use client'

import Image from 'next/image'
import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'
import { AnimatedCard } from '@/components/animated'

export default function PresentersPage() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '80px' }}>
        <PageHero title="Past Presenters" subtitle="Highlights from prior APOSS seminars" />
      </div>
      <main className="min-h-screen bg-[#fafafa] py-16">
        <section className="mx-auto max-w-6xl px-6">
          <AnimatedCard className="mb-10 bg-[#00376c]/5 border-[#00376c]/20">
            <p className="text-sm text-[#00376c] font-semibold">
              Looking for full archives? See Past Sessions (Season 1 & Season 2) in our events archive.
            </p>
          </AnimatedCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {[1, 2, 3, 4].map((i) => (
            <AnimatedCard key={i} delay={i * 0.1} className="overflow-hidden p-0">
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
                  <h2 className="text-2xl font-bold text-[#17152b]">
                    Paper Title Example #{i}: Electoral Accountability in Urban Asia
                  </h2>
                  <p className="text-[#404040] mt-1">
                    <a
                      href="https://example.com/presenter"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#00376c] hover:text-[#17152b]"
                    >
                      Dr. Alex Kim
                    </a>{' '}
                    — University of Eastport
                  </p>
                  <p className="text-[#404040]">
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
                  <h3 className="text-sm font-semibold text-[#17152b] uppercase tracking-wide">Abstract</h3>
                  <p className="mt-2 text-[#404040] leading-relaxed">
                    We study variation in electoral accountability in rapidly urbanizing Asian contexts. Using original survey and
                    administrative data, we show that service delivery improvements coincide with greater incumbent support, but
                    that effects vary by neighborhood institutional embeddedness. We discuss implications for governance and
                    participation across city types.
                  </p>
                </section>
                <section>
                  <h3 className="text-sm font-semibold text-[#17152b] uppercase tracking-wide">Discussants</h3>
                  <p className="mt-1 text-[#404040]">
                    <a
                      href="https://example.com/disc1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#00376c] hover:text-[#17152b]"
                    >
                      Prof. Lina Park
                    </a>{' '}
                    — Seoul National University;{' '}
                    <a
                      href="https://example.com/disc2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#00376c] hover:text-[#17152b]"
                    >
                      Dr. Ravi Singh
                    </a>{' '}
                    — National University of Singapore
                  </p>
                </section>
              </div>
            </AnimatedCard>
          ))}
          </div>
        </section>
      </main>
    </>
  )
}
