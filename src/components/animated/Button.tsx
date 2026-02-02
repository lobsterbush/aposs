'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  href,
  type = 'button',
  disabled = false,
}: AnimatedButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed no-underline'
  
  const variants = {
    primary: 'bg-[#17152b] text-white hover:bg-[#00376c] hover:text-white focus:ring-[#00376c] [&>*]:text-white',
    secondary: 'bg-[#00376c] text-white hover:bg-[#17152b] hover:text-white focus:ring-[#17152b] [&>*]:text-white',
    accent: 'bg-[#dc7510] text-white hover:bg-[#ba3828] hover:text-white focus:ring-[#dc7510] [&>*]:text-white',
    ghost: 'bg-transparent border-2 border-[#17152b] text-[#17152b] hover:bg-[#17152b] hover:text-white focus:ring-[#17152b] hover:[&>*]:text-white',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  const classes = cn(baseStyles, variants[variant], sizes[size], className)
  
  const Component = href ? motion.a : motion.button
  
  return (
    <Component
      href={href}
      type={!href ? type : undefined}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </Component>
  )
}
