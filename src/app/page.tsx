import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Calendar, Users, Globe, BookOpen, ArrowRight, Star, Award, Zap, Upload } from 'lucide-react'

export default async function Home() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-[#0a1628] via-[#0f2342] to-[#00376c] on-brand-navy">
          <div className="relative mx-auto max-w-5xl px-6 text-center">
            {/* Logo and Badge */}
            <div className="mb-12">
              <div className="flex justify-center mb-8">
                <div className="relative group">
                  <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
                    <Image
                      src="/branding/Drop logo ht 2000px.png"
                      alt="APOSS Drop Logo"
                      fill
                      sizes="(max-width: 768px) 16rem, (max-width: 1024px) 18rem, 20rem"
                      className="object-contain drop-shadow-lg logo-buffer"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-white leading-tight">
              Asian Politics
              <span className="block bg-gradient-to-r from-[#00376c] via-[#17152b] to-[#00376c] bg-clip-text text-transparent">
                Online Seminar Series
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              A global venue for sharing cutting-edge research on Asian politics.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button asChild size="lg" variant="default" className="min-w-[200px] h-14 text-base font-semibold">
                <Link href="/submit" className="no-underline text-white">
                  <Upload className="h-5 w-5" />
                  Submit Research
                </Link>
              </Button>
              <Button asChild size="lg" variant="default" className="min-w-[200px] h-14 text-base font-semibold">
                <Link href="/schedule" className="no-underline text-white">
                  <Calendar className="h-5 w-5" />
                  View Schedule
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-slate-700">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20">
                <span className="font-semibold text-[#00376c] mr-2">104</span> seminars to date
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20">
                Registration is required for all sessions
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20">
                Organizers: <span className="ml-2 font-medium">Charles Crabtree · Trevor Incerti</span>
              </div>
            </div>
          </div>
        </section>

        {/* Next Seminar (compact card) */}
        <section className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-5xl px-6 py-10">
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3 text-slate-700">
                <Calendar className="w-5 h-5 text-[#00376c]" />
                <span>Explore upcoming seminars on our schedule.</span>
              </div>
              <Button asChild variant="outline">
                <Link href="/events" className="no-underline">View events</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section with enhanced visuals */}
        <section className="relative py-24 bg-white">
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            {/* Header */}
            <div className="mx-auto max-w-4xl text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#00376c]/5 border border-[#00376c]/10 text-[#00376c] text-sm font-medium mb-6">
                <Award className="w-4 h-4 mr-2" />
                Building Excellence in Academic Community
              </div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
                <span className="bg-gradient-to-r from-[#00376c] to-[#17152b] bg-clip-text text-transparent">
                  Connecting Scholars
                </span>
                <br />
                <span className="text-[#17152b]">Across Continents</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                We foster collaboration and scholarship on Asian politics, welcoming proposals from all researchers
                while particularly championing <span className="text-[#00376c] font-semibold">early-career scholars</span>.
              </p>
            </div>

            {/* Feature cards with enhanced design */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-105" />
                <div className="relative bg-white rounded-3xl p-8 shadow-elegant hover:shadow-2xl transition-all duration-500 border border-blue-100">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#00376c] to-[#17152b] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Globe className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#17152b] mb-4">Global Community</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Connect with researchers from Asia, Europe, North America, and beyond. Our global network spans
                    <span className="font-semibold text-[#00376c]"> 50+ countries</span> and growing.
                  </p>
                  <div className="mt-6 flex items-center text-sm text-[#00376c] font-medium">
                    <span>Join the network</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-105" />
                <div className="relative bg-white rounded-3xl p-8 shadow-elegant hover:shadow-2xl transition-all duration-500 border border-blue-100">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#00376c] to-[#17152b] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <BookOpen className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#17152b] mb-4">All Approaches Welcome</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Qualitative, quantitative, mixed methods, theoretical, and applied research. We embrace
                    <span className="font-semibold text-[#00376c]"> methodological diversity</span> in Asian politics scholarship.
                  </p>
                  <div className="mt-6 flex items-center text-sm text-[#00376c] font-medium">
                    <span>Explore diversity</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-105" />
                <div className="relative bg-white rounded-3xl p-8 shadow-elegant hover:shadow-2xl transition-all duration-500 border border-blue-100">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#00376c] to-[#17152b] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#17152b] mb-4">Early Career Focus</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Graduate students and early-career researchers receive priority consideration. We're committed to
                    <span className="font-semibold text-[#00376c]"> nurturing the next generation</span> of scholars.
                  </p>
                  <div className="mt-6 flex items-center text-sm text-[#00376c] font-medium">
                    <span>Start your journey</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-20 text-center">
              <p className="text-xl text-gray-600 mb-8">
                Ready to share your research with our community?
              </p>
              <Button asChild size="lg" variant="default">
                <Link href="/submit" className="no-underline text-white">
                  Submit Your Proposal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What We're Looking For - Enhanced */}
        <section className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#00376c]/5 border border-[#00376c]/10 text-[#00376c] text-sm font-medium mb-6">
                <Star className="w-4 h-4 mr-2" />
                Research Excellence Criteria
              </div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
                <span className="text-[#17152b]">What We're</span>
                <br />
                <span className="bg-gradient-to-r from-[#00376c] to-[#17152b] bg-clip-text text-transparent">Interested In</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We welcome diverse approaches to understanding Asian politics and its global implications.
              </p>
            </div>

            {/* Enhanced content cards */}
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                <div className="relative bg-white rounded-3xl p-10 shadow-elegant hover:shadow-2xl transition-all duration-500 border border-blue-100">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#00376c] to-[#17152b] rounded-2xl flex items-center justify-center shadow-lg">
                        <Globe className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#17152b] mb-4">
                        Research that advances our understanding of Asian politics
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Research that draws on evidence from Asia to engage with broader disciplinary debates is also welcome.
                        <span className="font-semibold text-[#00376c]"> Asia may feature as the main case or one of several cases</span>,
                        contributing to comparative political science.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                <div className="relative bg-white rounded-3xl p-10 shadow-elegant hover:shadow-2xl transition-all duration-500 border border-blue-100">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#00376c] to-[#17152b] rounded-2xl flex items-center justify-center shadow-lg">
                        <BookOpen className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#17152b] mb-4">
                        Various types of papers welcome
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        <span className="font-semibold text-[#00376c]">Article-length working papers</span>, concise excerpts from book manuscripts,
                        research proposals, and pre-analysis plans. The paper should not already be published, allowing for meaningful
                        feedback and discussion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                <div className="relative bg-white rounded-3xl p-10 shadow-elegant hover:shadow-2xl transition-all duration-500 border border-blue-100">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#00376c] to-[#17152b] rounded-2xl flex items-center justify-center shadow-lg">
                        <Zap className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#17152b] mb-4">
                        Problem-driven research
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Applications of new methods to advance our understanding of Asian politics are welcome, but
                        <span className="font-semibold text-[#00376c]"> the contribution should not be purely methodological</span>.
                        We prioritize research that addresses substantive political questions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom highlight */}
            <div className="mt-20 text-center">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                <span className="text-gray-700 font-medium">All methodological approaches welcomed</span>
                <span className="mx-3 w-1 h-1 bg-gray-400 rounded-full" />
                <span className="text-gray-700 font-medium">Theory and empirical work valued equally</span>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="relative py-24 md:py-28 bg-[#17152b] on-brand-navy">
          <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
              Ready to submit your proposal?
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-10 max-w-2xl mx-auto">
              Share your work with a global community of scholars.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg" variant="default">
                <Link href="/submit" className="no-underline text-white">
                  Submit Now
                </Link>
              </Button>
              <Button asChild variant="default" size="lg">
                <Link href="/schedule" className="no-underline text-white">
                  View Upcoming Sessions
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
