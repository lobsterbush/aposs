import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PageHero title="Contact" subtitle="We'd love to hear from you" />
      <main className="mx-auto max-w-3xl px-6 pt-8 pb-16 space-y-6">
        <section className="rounded-2xl border border-gray-200 p-6 bg-white">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">General Inquiries</h2>
          <p className="text-gray-700">
            For general questions about APOSS, please contact us at{' '}
            <a href="mailto:contact@aposs.org" className="font-semibold text-[#00376c] underline">contact@aposs.org</a>.
          </p>
        </section>
        
        <section className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Submit Your Research</h2>
          <p className="text-gray-700 mb-4">
            Interested in presenting? Use our online submission form to propose your research.
          </p>
          <a 
            href="/submit" 
            className="inline-block px-6 py-3 bg-[#00376c] text-white font-semibold rounded-lg hover:bg-[#17152b] transition-colors"
          >
            Submit Your Proposal →
          </a>
        </section>
        
        <section className="rounded-2xl border border-gray-200 p-6 bg-white">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Organizers</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900">Charles Crabtree</p>
              <p className="text-gray-600">Dartmouth College</p>
              <p className="text-sm text-gray-500">
                Website: <a href="https://charlescrabtree.org" target="_blank" rel="noopener noreferrer" className="text-[#00376c] underline">charlescrabtree.org</a>
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Trevor Incerti</p>
              <p className="text-gray-600">University of Amsterdam</p>
              <p className="text-sm text-gray-500">
                Website: <a href="https://www.trevorincerti.com" target="_blank" rel="noopener noreferrer" className="text-[#00376c] underline">trevorincerti.com</a>
              </p>
            </div>
          </div>
        </section>
        
        <section className="rounded-2xl border border-[#00376c]/20 bg-[#00376c]/5 p-6">
          <h2 className="text-xl font-bold text-[#00376c] mb-3">Stay Connected</h2>
          <p className="text-gray-700 mb-4">
            Register for our seminars to receive email updates about upcoming presentations and events.
          </p>
          <a 
            href="/register" 
            className="inline-block px-6 py-2 border-2 border-[#00376c] text-[#00376c] font-semibold rounded-lg hover:bg-[#00376c] hover:text-white transition-colors"
          >
            Register Now
          </a>
        </section>
      </main>
    </div>
  )
}

