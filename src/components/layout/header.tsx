'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, Calendar, Upload, Settings, Users, BookOpen } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Schedule', href: '/schedule', icon: Calendar },
    { name: 'Register', href: '/register', icon: Upload },
    { name: 'Organizers', href: '/organizers', icon: Users },
    { name: 'Guidelines', href: '/guidelines', icon: BookOpen },
    { name: 'Presenters', href: '/presenters', icon: Home },
    { name: 'Supporters', href: '/supporters', icon: Home },
    { name: 'About', href: '/about', icon: Home },
  ]

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-[100] bg-white transition-all duration-300 ${
        scrolled ? 'shadow-lg border-b border-aposs-gray-200' : 'border-b-2 border-aposs-navy'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo with icon */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="relative w-10 h-10">
              <Image
                src="/branding/Navy Circle Icon ht 2000px.png"
                alt="APOSS"
                fill
                className="object-contain transition-transform group-hover:scale-110"
              />
            </div>
            <span className="text-2xl font-black text-aposs-navy group-hover:text-aposs-blue transition-colors">
              APOSS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href

              return (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Link
                    href={item.href}
                    className={`no-underline px-4 py-2 font-semibold text-sm rounded-lg transition-colors ${
                      isActive
                        ? 'bg-aposs-navy text-white'
                        : 'text-aposs-gray-700 hover:bg-aposs-gray-100 hover:text-aposs-navy'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/submit" className="no-underline inline-flex items-center gap-2 bg-aposs-orange text-white px-5 py-2.5 rounded-lg hover:bg-aposs-red transition-colors font-semibold shadow-sm">
                <Upload className="w-4 h-4" />
                Submit
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/admin" className="no-underline inline-flex items-center gap-2 bg-white text-aposs-navy px-5 py-2.5 border-2 border-aposs-navy rounded-lg hover:bg-aposs-navy hover:text-white transition-colors font-semibold">
                <Settings className="w-4 h-4" />
                Admin
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 bg-aposs-navy text-white hover:bg-aposs-blue rounded-lg transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-aposs-gray-200 py-4 bg-white"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="space-y-1">
                {navigation.map((item, idx) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`no-underline flex items-center gap-3 px-4 py-3 font-semibold transition-colors rounded-lg mx-2 ${
                          isActive ? 'bg-aposs-navy text-white' : 'text-aposs-gray-700 hover:bg-aposs-gray-100 hover:text-aposs-navy'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
