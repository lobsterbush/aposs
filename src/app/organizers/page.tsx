import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'

export default function OrganizersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PageHero title="Organizers" subtitle="The team behind APOSS" />
      <main className="mx-auto max-w-3xl px-6 pt-8 pb-16 space-y-8">

        <section className="rounded-2xl border border-gray-200 p-6 bg-white space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Charles Crabtree</h2>
          <p className="text-gray-700">Assistant Professor in the Department of Government at Dartmouth College; director of the Fundamental Needs Lab; co-founder and past co-director of the Baltic LEAP foreign study program; co-director of the Department of Government’s Honors Program. Charles studies discrimination and develops better methodological approaches for measuring it.</p>
          <p className="text-gray-700">Learn more at <a href="https://charlescrabtree.org" target="_blank" rel="noopener noreferrer" className="underline font-semibold">charlescrabtree.org</a>.</p>
        </section>


        <section className="rounded-2xl border border-gray-200 p-6 bg-white space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Trevor Incerti</h2>
          <p className="text-gray-700">Organizer. Bio to follow.</p>
        </section>

      </main>
    </div>
  )
}

