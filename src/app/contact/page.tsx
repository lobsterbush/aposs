import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PageHero title="Contact" subtitle="We'd love to hear from you" />
      <main className="mx-auto max-w-3xl px-6 pt-8 pb-16">
        <p className="text-lg text-gray-600 mb-6">
          For general inquiries about APOSS, please email us at
          {' '}
          <a href="mailto:contact@aposs.org" className="underline">contact@aposs.org</a>.
        </p>
        <section className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Organizers</h2>
          <p className="text-gray-700">We will route your message to the appropriate organizer.</p>
        </section>
      </main>
    </div>
  )
}

