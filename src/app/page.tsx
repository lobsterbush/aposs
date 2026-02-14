'use client'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Calendar, Users, Globe, BookOpen, Award, Upload, ArrowRight } from 'lucide-react'
import { AnimatedSection, AnimatedCard, AnimatedButton, FloatingLogo, AnimatedItem } from '@/components/animated'
import { motion } from 'framer-motion'
interface PublicEvent {
  id: string
  title: string
  description?: string
  scheduledAt: string
  presenter: string
  status: 'SCHEDULED' | 'COMPLETED'
}

export default function Home() {
  const [events, setEvents] = useState<PublicEvent[]>([])
  const [eventsLoading, setEventsLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/public/events')
        const data = await res.json()
        if (data.success && Array.isArray(data.events)) {
          setEvents(data.events)
        }
      } catch {
        setEvents([])
      } finally {
        setEventsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const upcomingEvents = events
    .filter(event => event.status === 'SCHEDULED' && new Date(event.scheduledAt) > new Date())
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    })
  }
  return (
    <>
      <Header />
      <main className="bg-white overflow-x-hidden" style={{ marginTop: '72px' }}>
        {/* Hero with animated gradient background */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-aposs-gradient bg-200% animate-gradient opacity-5" />
          
          <div className="container max-w-6xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection animation="slide-left" className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-5xl md:text-7xl font-bold text-aposs-navy leading-tight mb-6">
                    Asia Pacific Online Seminar Series
                  </h1>
                  <p className="text-xl text-aposs-gray-700 leading-relaxed max-w-2xl">
                    Weekly online seminars connecting researchers across continents. Concise talks, sharp feedback, and an inclusive audience.
                  </p>
                </motion.div>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <AnimatedButton variant="primary" size="lg" href="/submit">
                    <Upload className="w-5 h-5" /> Submit a paper
                  </AnimatedButton>
                  <AnimatedButton variant="secondary" size="lg" href="/schedule">
                    <Calendar className="w-5 h-5" /> View schedule
                  </AnimatedButton>
                </motion.div>

              </AnimatedSection>

              <AnimatedSection animation="slide-right" className="flex justify-center">
                <div className="relative">
                  <FloatingLogo 
                    src="/branding/aposs logo with conversation icon ht 2000px.png"
                    alt="APOSS Logo"
                    size={400}
                    className="drop-shadow-2xl"
                  />
                  {/* Decorative animated blobs */}
                  <motion.div
                    className="absolute -top-8 -right-8 w-24 h-24 bg-aposs-orange rounded-full opacity-20 blur-2xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-8 -left-8 w-32 h-32 bg-aposs-blue rounded-full opacity-20 blur-2xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.3, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Value props with animated cards */}
        <section className="py-20 bg-aposs-gray-50">
          <div className="container max-w-6xl">
            <AnimatedSection animation="fade" className="text-center mb-12">
              <h2 className="text-4xl font-bold text-aposs-navy mb-4">Why APOSS?</h2>
              <p className="text-lg text-aposs-gray-700 max-w-2xl mx-auto">A seminar series designed for the modern scholar</p>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" stagger className="grid md:grid-cols-3 gap-8">
              {[{
                icon: <Globe className="w-8 h-8 text-white" />,
                bg: '#00376c',
                title: 'Truly global',
                body: 'Speakers and audience across Asia, Europe, and the Americas.',
              }, {
                icon: <BookOpen className="w-8 h-8 text-white" />,
                bg: '#dc7510',
                title: 'Methods agnostic',
                body: 'Qualitative, quantitative, mixed methods, and theory welcome.',
              }, {
                icon: <Award className="w-8 h-8 text-white" />,
                bg: '#ba3828',
                title: 'Early-career friendly',
                body: 'Priority to graduate students and early-career scholars.',
              }].map((item, idx) => (
                <AnimatedItem key={idx}>
                  <AnimatedCard delay={idx * 0.1} className="h-full">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: item.bg }}>
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-aposs-navy mb-3">{item.title}</h3>
                    <p className="text-aposs-gray-700 leading-relaxed">{item.body}</p>
                  </AnimatedCard>
                </AnimatedItem>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* Upcoming seminars teaser */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl">
            <AnimatedSection animation="fade" className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <p className="text-sm uppercase tracking-widest text-aposs-orange font-semibold">Schedule</p>
              </div>
              <h2 className="text-4xl font-bold text-aposs-navy mb-4">Next seminars</h2>
              <Link href="/schedule" className="inline-flex items-center gap-2 text-aposs-blue hover:text-aposs-navy font-semibold transition-colors">
                Open full schedule <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" stagger className="grid md:grid-cols-2 gap-8">
              {eventsLoading ? (
                <AnimatedItem>
                  <AnimatedCard>
                    <p className="text-aposs-gray-700">Loading upcoming seminars…</p>
                  </AnimatedCard>
                </AnimatedItem>
              ) : upcomingEvents.length > 0 ? (
                upcomingEvents.slice(0, 2).map((event, i) => (
                  <AnimatedItem key={event.id}>
                    <AnimatedCard delay={i * 0.1}>
                      <div className="flex items-center gap-3 text-sm text-aposs-orange mb-4">
                        <Calendar className="w-5 h-5" />
                        <span className="font-semibold">
                          {formatDate(event.scheduledAt)} · {formatTime(event.scheduledAt)}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-aposs-navy mb-2">{event.title}</h3>
                      <p className="text-sm text-aposs-gray-700 mb-3">Presenter: {event.presenter}</p>
                      {event.description && (
                        <p className="text-aposs-gray-700 mb-6 leading-relaxed">{event.description}</p>
                      )}
                      <div className="flex gap-3">
                        <AnimatedButton variant="secondary" href="/schedule">
                          View details
                        </AnimatedButton>
                        <AnimatedButton variant="ghost" href="/register">
                          <Users className="w-4 h-4" /> Register
                        </AnimatedButton>
                      </div>
                    </AnimatedCard>
                  </AnimatedItem>
                ))
              ) : (
                <AnimatedItem>
                  <AnimatedCard>
                    <p className="text-aposs-gray-700 mb-4 leading-relaxed">
                      No upcoming seminars are scheduled at the moment.
                    </p>
                    <div className="flex gap-3">
                      <AnimatedButton variant="secondary" href="/schedule">
                        View schedule
                      </AnimatedButton>
                      <AnimatedButton variant="ghost" href="/register">
                        <Users className="w-4 h-4" /> Register for updates
                      </AnimatedButton>
                    </div>
                  </AnimatedCard>
                </AnimatedItem>
              )}
            </AnimatedSection>
          </div>
        </section>

        {/* How to participate - Process steps */}
        <section className="py-20 bg-white relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-aposs-orange opacity-5 rounded-full blur-3xl" />
          
          <div className="container max-w-6xl relative z-10">
            <div className="grid lg:grid-cols-3 gap-12">
              <AnimatedSection animation="slide-right" className="lg:col-span-1 space-y-6">
                <p className="text-sm uppercase tracking-widest text-aposs-orange font-semibold">Present with APOSS</p>
                <h2 className="text-4xl md:text-5xl font-bold text-aposs-navy leading-tight">Simple, transparent process.</h2>
                <p className="text-lg text-aposs-gray-700 leading-relaxed">Submit your abstract, we review quickly, schedule together, and email you the Zoom link plus calendar-ready details.</p>
              </AnimatedSection>
              
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                {[{
                  number: '1',
                  title: 'Submit',
                  body: 'Short form: title, abstract, affiliation, keywords, and your availability.',
                  color: 'aposs-navy'
                }, {
                  number: '2',
                  title: 'Quick review',
                  body: 'Organizers review fit and respond in a few days.',
                  color: 'aposs-blue'
                }, {
                  number: '3',
                  title: 'Schedule',
                  body: 'Pick a slot; we create the event and send you the Zoom link.',
                  color: 'aposs-red'
                }, {
                  number: '4',
                  title: 'Present',
                  body: 'Ten-minute presentation followed by discussant feedback and Q&A.',
                  color: 'aposs-orange'
                }].map((step, idx) => (
                  <AnimatedCard key={idx} delay={idx * 0.1} className="relative">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-${step.color} text-white flex items-center justify-center text-xl font-bold`}>
                        {step.number}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-aposs-navy mb-2">{step.title}</h3>
                        <p className="text-aposs-gray-700 leading-relaxed">{step.body}</p>
                      </div>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Organizer */}
        <section className="py-20 bg-aposs-gray-50">
          <div className="container max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection animation="slide-left">
                <div className="space-y-6">
                  <p className="text-sm uppercase tracking-widest text-aposs-orange font-semibold">Organizer</p>
                  <h2 className="text-4xl md:text-5xl font-bold text-aposs-navy leading-tight">Charles Crabtree</h2>
                  <p className="text-lg text-aposs-gray-700 leading-relaxed">APOSS is designed to make it effortless for scholars of Asian politics to share work, meet collaborators, and get actionable feedback.</p>
                  <div className="flex gap-4">
                    <AnimatedButton variant="secondary" href="/about">
                      About APOSS
                    </AnimatedButton>
                    <AnimatedButton variant="ghost" href="/contact">
                      Contact
                    </AnimatedButton>
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="slide-right">
                <AnimatedCard className="bg-white">
                  <h3 className="text-2xl font-bold text-aposs-navy mb-4">What we look for</h3>
                  <ul className="space-y-4 text-aposs-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aposs-blue text-white flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                      <span>Work that advances understanding of Asian politics or uses Asian cases comparatively.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aposs-blue text-white flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                      <span>Clear research questions and room for feedback (works-in-progress welcome).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aposs-blue text-white flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                      <span>Methodological diversity and substantive contributions over pure methods pieces.</span>
                    </li>
                  </ul>
                </AnimatedCard>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-aposs-gradient bg-200% animate-gradient opacity-10" />
          
          <div className="container max-w-4xl relative z-10">
            <AnimatedSection animation="fade" className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm uppercase tracking-widest text-aposs-orange font-semibold mb-4">Join us</p>
                <h2 className="text-4xl md:text-6xl font-bold text-aposs-navy mb-6">Ready to share your research?</h2>
                <p className="text-xl text-aposs-gray-700 max-w-2xl mx-auto leading-relaxed">Submit a paper, register to attend, or reach out with questions.</p>
              </motion.div>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <AnimatedButton variant="primary" size="lg" href="/submit">
                  <Upload className="w-5 h-5" /> Submit a paper
                </AnimatedButton>
                <AnimatedButton variant="secondary" size="lg" href="/register">
                  <Users className="w-5 h-5" /> Register
                </AnimatedButton>
                <AnimatedButton variant="ghost" size="lg" href="/contact">
                  Contact us <ArrowRight className="w-5 h-5" />
                </AnimatedButton>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </>
  )
}
