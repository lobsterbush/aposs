'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface FloatingLogoProps {
  src: string
  alt: string
  size?: number
  className?: string
}

export function FloatingLogo({ src, alt, size = 120, className = '' }: FloatingLogoProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        rotate: {
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      whileHover={{
        scale: 1.1,
        rotate: 5,
      }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          priority
        />
      </div>
    </motion.div>
  )
}
