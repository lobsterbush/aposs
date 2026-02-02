'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageHeroProps {
  title: string
  subtitle?: string
  children?: ReactNode
}

export function PageHero({ title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden bg-white border-b border-aposs-gray-200">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-aposs-gradient bg-200% animate-gradient opacity-5" />
      
      {/* Decorative blobs */}
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 bg-aposs-orange rounded-full opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-aposs-blue rounded-full opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      
      <div className="container max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-aposs-navy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              className="text-xl text-aposs-gray-700 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

