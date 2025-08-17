import React from 'react'

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Symbol */}
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
          <div className="w-6 h-6 relative">
            {/* Stylized "A" for APOSS */}
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path 
                d="M12 2L22 20H14L12 16L10 20H2L12 2Z" 
                fill="white" 
                fillOpacity="0.9"
              />
              <path 
                d="M8 14H16L12 6L8 14Z" 
                fill="white" 
                fillOpacity="0.7"
              />
            </svg>
          </div>
        </div>
        {/* Small accent dot */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full border-2 border-white"></div>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-gray-900 tracking-tight">
            APOSS
          </span>
          <span className="text-xs text-gray-600 font-medium -mt-1 tracking-wider">
            ASIAN POLITICS
          </span>
        </div>
      )}
    </div>
  )
}
