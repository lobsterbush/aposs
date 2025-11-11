import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PageHero title="Privacy Policy" />
      <main className="mx-auto max-w-3xl px-6 pt-8 pb-16 space-y-8">
        <p className="text-lg text-gray-600">
          Last updated: November 11, 2025
        </p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
          <p className="text-gray-700">
            When you submit a paper proposal or register for seminars, we collect:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Your name, email address, and institutional affiliation</li>
            <li>Paper titles, abstracts, and uploaded PDF files</li>
            <li>Research field, methodology, and keywords</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
          <p className="text-gray-700">
            We use your information to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Review and evaluate paper submissions</li>
            <li>Schedule and organize seminar presentations</li>
            <li>Send you email notifications about your submissions and upcoming events</li>
            <li>Share papers with assigned discussants</li>
            <li>Manage event registrations and send Zoom links</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Data Sharing</h2>
          <p className="text-gray-700">
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Discussants:</strong> Assigned discussants receive papers and author information to prepare feedback</li>
            <li><strong>Registered Attendees:</strong> Presenter names and paper titles are shared in event schedules</li>
            <li><strong>Service Providers:</strong> We use third-party services (email, file storage) to operate APOSS</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
          <p className="text-gray-700">
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
          <p className="text-gray-700">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information (subject to our legitimate interests)</li>
            <li>Withdraw consent for email communications</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Cookies</h2>
          <p className="text-gray-700">
            We use essential cookies for authentication and site functionality. We do not use tracking or advertising cookies.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
          <p className="text-gray-700">
            If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at{' '}
            <a href="mailto:privacy@aposs.org" className="font-semibold text-[#00376c] underline">privacy@aposs.org</a>.
          </p>
        </section>
      </main>
    </div>
  )
}

