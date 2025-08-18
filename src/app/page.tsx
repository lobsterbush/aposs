import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Calendar, Users, Globe, BookOpen, ArrowRight, Video, Star, Award, Zap, Upload, Sparkles, TrendingUp, Users2 } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Background using APOSS header image */}
        <div className="absolute inset-0">
          <Image
            src="/branding/Website Header Image ht 2000px.png"
            alt="APOSS Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-purple-900/80"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        {/* Animated floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm animate-float"></div>
          <div className="absolute bottom-32 right-20 w-24 h-24 bg-blue-300/20 rounded-full backdrop-blur-sm animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-orange-400/20 rounded-full backdrop-blur-sm animate-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          {/* Impact Statement */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-bold mb-8 animate-fade-in">
            <TrendingUp className="w-4 h-4 mr-2 text-orange-400" />
            <span>Connecting 1000+ researchers across 50+ countries</span>
          </div>
          
          {/* Main Hero Content */}
          <div className="mb-16">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-none">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                ADVANCING
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent drop-shadow-2xl">
                ASIAN POLITICS
              </span>
              <br />
              <span className="text-white drop-shadow-2xl text-5xl md:text-6xl lg:text-7xl">
                RESEARCH
              </span>
            </h1>
            
            {/* Divider with brand elements */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent to-white/50 rounded"></div>
              <div className="relative w-12 h-12 p-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                <Image
                  src="/branding/Blue Logo ht 2000px.png"
                  alt="APOSS Logo"
                  width={32}
                  height={32}
                  className="object-contain filter brightness-0 invert"
                />
              </div>
              <div className="h-1 w-16 bg-gradient-to-l from-transparent to-white/50 rounded"></div>
            </div>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
              The premier online seminar series connecting political scientists worldwide to advance 
              understanding of Asian politics through <span className="text-orange-300 font-bold">collaborative research</span> and 
              <span className="text-blue-300 font-bold">scholarly excellence</span>.
            </p>
          </div>
          
          {/* Bold CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button asChild size="lg" className="group bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold px-10 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 border-0 transform hover:scale-105">
              <Link href="/submit">
                <span className="flex items-center">
                  <Upload className="mr-3 h-6 w-6" />
                  Submit Research
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group border-3 border-white text-white hover:bg-white hover:text-blue-900 font-bold px-10 py-6 text-xl rounded-2xl backdrop-blur-md transition-all duration-300 transform hover:scale-105">
              <Link href="/schedule">
                <span className="flex items-center">
                  <Calendar className="mr-3 h-6 w-6" />
                  View Schedule
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
          </div>
          
          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform group-hover:scale-105">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Video className="w-10 h-10 text-white" />
                </div>
                <div className="text-5xl font-black text-white mb-3">100+</div>
                <div className="text-white/80 font-semibold text-lg">Seminars Hosted</div>
                <div className="text-white/60 text-sm mt-2">Since 2020</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform group-hover:scale-105">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <div className="text-5xl font-black text-white mb-3">50+</div>
                <div className="text-white/80 font-semibold text-lg">Countries</div>
                <div className="text-white/60 text-sm mt-2">Represented</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform group-hover:scale-105">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Users2 className="w-10 h-10 text-white" />
                </div>
                <div className="text-5xl font-black text-white mb-3">1000+</div>
                <div className="text-white/80 font-semibold text-lg">Researchers</div>
                <div className="text-white/60 text-sm mt-2">Connected</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium mb-2">Explore More</span>
            <ArrowRight className="h-6 w-6 rotate-90" />
          </div>
        </div>
      </section>

      {/* About Section with enhanced visuals */}
      <section className="relative py-24 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-4xl text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              <Award className="w-4 h-4 mr-2" />
              Building Excellence in Academic Community
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Connecting Scholars
              </span>
              <br />
              <span className="text-gray-900">Across Continents</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
              We foster collaboration and scholarship on Asian politics, welcoming proposals from all researchers 
              while particularly championing <span className="text-blue-600 font-semibold">early-career scholars</span>.
            </p>
          </div>
          
          {/* Feature cards with enhanced design */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-105"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-elegant hover:shadow-2xl transition-all duration-500 border border-blue-100">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Globe className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Community</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Connect with researchers from Asia, Europe, North America, and beyond. Our global network spans 
                  <span className="font-semibold text-blue-600">50+ countries</span> and growing.
                </p>
                <div className="mt-6 flex items-center text-sm text-blue-600 font-medium">
                  <span>Join the network</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-105"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-elegant hover:shadow-2xl transition-all duration-500 border border-purple-100">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">All Approaches Welcome</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Qualitative, quantitative, mixed methods, theoretical, and applied research. We embrace 
                  <span className="font-semibold text-purple-600">methodological diversity</span> in Asian politics scholarship.
                </p>
                <div className="mt-6 flex items-center text-sm text-purple-600 font-medium">
                  <span>Explore diversity</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-3xl opacity-0 group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-105"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-elegant hover:shadow-2xl transition-all duration-500 border border-green-100">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Early Career Focus</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Graduate students and early-career researchers receive priority consideration. We&apos;re committed to 
                  <span className="font-semibold text-green-600">nurturing the next generation</span> of scholars.
                </p>
                <div className="mt-6 flex items-center text-sm text-green-600 font-medium">
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
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <Link href="/submit">
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
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Research Excellence Criteria
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
              <span className="text-gray-900">What We&apos;re</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Interested In</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We welcome diverse approaches to understanding Asian politics and its global implications.
            </p>
          </div>
          
          {/* Enhanced content cards */}
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
              <div className="relative bg-white rounded-3xl p-10 shadow-elegant hover:shadow-2xl transition-all duration-500 border border-blue-100">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Research that advances our understanding of Asian politics
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Research that draws on evidence from Asia to engage with broader disciplinary 
                      debates is also welcome. <span className="font-semibold text-blue-600">Asia may feature as the main case or one of several cases</span>, 
                      contributing to comparative political science.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
              <div className="relative bg-white rounded-3xl p-10 shadow-elegant hover:shadow-2xl transition-all duration-500 border border-purple-100">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Various types of papers welcome
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      <span className="font-semibold text-purple-600">Article-length working papers</span>, concise excerpts from book manuscripts, 
                      research proposals, and pre-analysis plans. The paper should not already be published, 
                      allowing for meaningful feedback and discussion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
              <div className="relative bg-white rounded-3xl p-10 shadow-elegant hover:shadow-2xl transition-all duration-500 border border-green-100">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Problem-driven research
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Applications of new methods to advance our understanding of Asian politics 
                      are welcome, but <span className="font-semibold text-green-600">the contribution should not be purely methodological</span>. 
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
              <span className="mx-3 w-1 h-1 bg-gray-400 rounded-full"></span>
              <span className="text-gray-700 font-medium">Theory and empirical work valued equally</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-indigo-600 via-purple-700 to-blue-800 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          {/* Animated gradient orbs */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-400/10 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '4s'}}></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
        </div>
        
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          {/* Floating badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white/90 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-300" />
            Ready to join our global community?
          </div>
          
          {/* Main heading */}
          <h2 className="text-6xl md:text-7xl font-bold tracking-tight mb-8">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
              Submit Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl">
              Proposal!
            </span>
          </h2>
          
          {/* Enhanced description */}
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-3xl mx-auto">
            Join our <span className="font-semibold text-yellow-300">global community of scholars</span> and share your research 
            with peers from around the world. Your voice matters in shaping the future of Asian politics scholarship.
          </p>
          
          {/* CTA buttons with enhanced styling */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button asChild size="lg" className="group bg-gradient-to-r from-white to-blue-50 hover:from-blue-50 hover:to-white text-blue-700 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-white/20 transition-all duration-300 border-0">
              <Link href="/submit">
                <span className="flex items-center">
                  Submit Now
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group border-2 border-white/40 text-white hover:bg-white/10 px-12 py-6 text-xl font-semibold rounded-2xl backdrop-blur-md hover:border-white/60 transition-all duration-300">
              <Link href="/schedule">
                <span className="flex items-center">
                  <Calendar className="mr-3 h-6 w-6" />
                  View Upcoming Sessions
                </span>
              </Link>
            </Button>
          </div>
          
          {/* Bottom testimonial or quote */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-2xl mx-auto">
            <p className="text-white/90 text-lg italic leading-relaxed">
              &ldquo;APOSS has been instrumental in connecting me with researchers across continents 
              and providing invaluable feedback on my work.&rdquo;
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}
