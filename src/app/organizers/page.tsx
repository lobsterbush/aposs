'use client'

import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'
import { AnimatedCard } from '@/components/animated'

export default function OrganizersPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <div style={{ marginTop: '80px' }}>
        <PageHero title="Organizer" subtitle="Leading APOSS" />
      </div>
      <main className="mx-auto max-w-4xl px-6 py-16">

        <AnimatedCard className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-[#17152b] mb-2">Charles Crabtree</h2>
              <p className="text-[#737373] font-medium">Organizer</p>
            </div>
            
            <div className="space-y-4 text-[#404040] leading-relaxed">
              <p>
                Senior Lecturer in the School of Social Sciences at Monash University and K-Club Professor at University College, Korea University.
              </p>
              <p>
                Charles studies discrimination and develops better methodological approaches for measuring it. His research combines experimental methods with innovative measurement strategies to understand bias and inequality in political contexts.
              </p>
            </div>
            
            <div className="pt-4 border-t border-[#e5e5e5]">
              <a 
                href="https://charlescrabtree.org" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-[#00376c] hover:text-[#17152b] font-semibold transition-colors"
              >
                Visit website →
              </a>
            </div>
          </div>
        </AnimatedCard>

      </main>
    </div>
  )
}

