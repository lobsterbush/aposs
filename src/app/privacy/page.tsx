import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PageHero title="Privacy Policy" />
      <main className="mx-auto max-w-3xl px-6 pt-8 pb-16">
        <p className="text-lg text-gray-600 mb-6">
          We respect your privacy. This demo site does not collect personal data beyond what you submit in forms.
        </p>
        <section className="space-y-4 text-gray-700">
          <p>Any data you provide via the submission form is used solely for seminar organization purposes.</p>
          <p>If you have questions, contact us at <a href="mailto:privacy@aposs.org" className="underline">privacy@aposs.org</a>.</p>
        </section>
      </main>
    </div>
  )
}

