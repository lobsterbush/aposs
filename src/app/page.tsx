import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, Users, Globe, BookOpen, ArrowRight, Sparkles, Video, Star, ChevronDown, MapPin, Award, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Asia map pattern and gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          {/* Animated geometric shapes */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-40 left-20 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '4s'}}></div>
            <div className="absolute bottom-20 right-10 w-28 h-28 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '6s'}}></div>
          </div>
          
          {/* Asia silhouette overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <path 
                d="M80 150 Q100 120 140 130 Q180 125 220 140 Q260 135 300 150 Q320 170 310 200 Q280 220 240 210 Q200 215 160 205 Q120 200 100 180 Q85 165 80 150Z"
                fill="white" 
                opacity="0.3"
              />
            </svg>
          </div>
          
          {/* Grain texture overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-black bg-opacity-10 mix-blend-overlay"></div>
          </div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          {/* Floating badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
            Over 100 seminars hosted worldwide
          </div>
          
          {/* Main heading with enhanced typography */}
          <div className="mb-12">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                APOSS
              </span>
            </h1>
            <div className="text-xl md:text-2xl text-white/80 font-light tracking-wide mb-4">
              Asian Politics Online Seminar Series
            </div>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>
          
          {/* Enhanced tagline */}
          <p className="text-2xl md:text-3xl text-white/90 max-w-5xl mx-auto mb-16 leading-relaxed font-light">
            Connecting political scientists worldwide who study
            <span className="relative inline-block mx-2">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-semibold">Asian politics</span>
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
            </span>
            and fostering global academic collaboration.
          </p>
          
          {/* Enhanced CTA section */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button asChild size="lg" className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-6 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 border-0">
              <Link href="/submit">
                <span className="flex items-center">
                  Submit Your Research
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group border-2 border-white/30 text-white hover:bg-white/10 px-10 py-6 text-xl font-semibold rounded-2xl backdrop-blur-md hover:border-white/50 transition-all duration-300">
              <Link href="/schedule">
                <span className="flex items-center">
                  <Calendar className="mr-3 h-6 w-6" />
                  View Schedule
                </span>
              </Link>
            </Button>
          </div>
          
          {/* Enhanced stats with better visual hierarchy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="group text-center p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <Video className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl font-bold text-white mb-2">100+</div>
              <div className="text-white/70 font-medium text-lg">Seminars Hosted</div>
            </div>
            <div className="group text-center p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl font-bold text-white mb-2">50+</div>
              <div className="text-white/70 font-medium text-lg">Countries Represented</div>
            </div>
            <div className="group text-center p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl font-bold text-white mb-2">1000+</div>
              <div className="text-white/70 font-medium text-lg">Researchers Connected</div>
            </div>
          </div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce cursor-pointer">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Discover More</span>
            <ChevronDown className="h-8 w-8" />
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 opacity-20">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute top-40 right-40 opacity-30">
          <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="absolute bottom-40 left-40 opacity-25">
          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
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
    </div>
  )
}
