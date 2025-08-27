'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, Calendar, Upload, Settings, ArrowRight, Users, BookOpen } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    <header className="fixed top-0 left-0 right-0 z-[100]">
      {/* Flat header background */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-slate-200 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Simple text logo for header */}
          <Link href="/" className="flex items-center no-underline group">
            <span className="text-2xl font-bold text-[#17152b] group-hover:text-[#00376c] transition-colors">
              APOSS
            </span>
          </Link>

          {/* Desktop Navigation */}
<nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
className={`group relative px-4 py-2 rounded-md font-medium text-sm transition-colors no-underline ${
                    isActive
                      ? 'text-[#17152b] font-semibold'
                      : 'text-slate-700 hover:text-[#00376c]'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{item.name}</span>
                    {!isActive && <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />}
                  </div>
                </Link>
              )
            })}
          </nav>

{/* CTA Button */}
<div className="hidden md:flex items-center space-x-3">
            <Button asChild variant="default" size="default">
              <Link href="/submit" className="no-underline text-white">
                <Upload className="w-4 h-4" />
                Submit
              </Link>
            </Button>
            <Button asChild variant="outline" size="default">
              <Link href="/admin" className="no-underline">
                <Settings className="w-4 h-4" />
                Admin
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 transition-colors relative z-20"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4 bg-white/95 backdrop-blur-md">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                      isActive ? 'bg-gray-100 text-slate-900' : 'text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
