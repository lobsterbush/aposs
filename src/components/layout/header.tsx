'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Menu, X, Home, Calendar, Upload, Settings, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Schedule', href: '/schedule', icon: Calendar },
    { name: 'Submit', href: '/submit', icon: Upload },
    { name: 'Admin', href: '/admin', icon: Settings },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 backdrop-blur-md"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative w-16 h-16 p-2 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
              <Image
                src="/branding/Blue Logo ht 2000px.png"
                alt="APOSS Logo"
                width={48}
                height={48}
                className="object-contain filter brightness-0 invert"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white leading-tight tracking-tight">
                APOSS
              </span>
              <span className="text-sm text-white/80 font-medium leading-tight">
                Asian Politics Online Seminar Series
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-blue-900 shadow-xl'
                      : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                    {!isActive && <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />}
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* CTA Button */}
          <Link 
            href="/submit" 
            className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Upload className="w-4 h-4" />
            <span>Submit Research</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
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
