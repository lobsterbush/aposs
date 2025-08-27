import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PageHero title="Terms of Service" />
      <main className="mx-auto max-w-3xl px-6 pt-8 pb-16">
        <p className="text-lg text-gray-600 mb-6">
          By using APOSS, you agree to participate respectfully and follow community guidelines.
        </p>
        <section className="space-y-4 text-gray-700">
          <p>Research shared in APOSS seminars remains the intellectual property of the presenters.</p>
          <p>Please do not distribute materials without permission.</p>
        </section>
      </main>
    </div>
  )
}

