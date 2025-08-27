import React from 'react'

export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="relative bg-gradient-to-r from-[#17152b] to-[#00376c] on-brand-navy">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-white">{title}</h1>
        {subtitle ? (
          <p className="text-white/90 text-lg max-w-3xl">{subtitle}</p>
        ) : null}
      </div>
    </div>
  )
}

