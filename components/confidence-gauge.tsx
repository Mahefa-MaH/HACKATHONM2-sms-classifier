"use client"

import { useEffect, useState } from "react"

interface ConfidenceGaugeProps {
  value: number
  status: "spam" | "ham" | null
}

export function ConfidenceGauge({ value, status }: ConfidenceGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    const duration = 1500
    const startTime = Date.now()
    const startValue = animatedValue

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (value - startValue) * easeOutQuart
      
      setAnimatedValue(currentValue)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value])

  const circumference = 2 * Math.PI * 90
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference

  const getColor = () => {
    if (status === "spam") return "#ff4757"
    if (status === "ham") return "#00e676"
    return "#00d4ff"
  }

  const getGlowColor = () => {
    if (status === "spam") return "rgba(255, 71, 87, 0.5)"
    if (status === "ham") return "rgba(0, 230, 118, 0.5)"
    return "rgba(0, 212, 255, 0.3)"
  }

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-full blur-xl opacity-60 transition-all duration-500"
        style={{ 
          background: `radial-gradient(circle, ${getGlowColor()} 0%, transparent 70%)`,
        }}
      />
      
      <svg 
        width="220" 
        height="220" 
        viewBox="0 0 220 220"
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx="110"
          cy="110"
          r="90"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="12"
        />
        
        {/* Progress circle */}
        <circle
          cx="110"
          cy="110"
          r="90"
          fill="none"
          stroke={getColor()}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-300"
          style={{
            filter: `drop-shadow(0 0 8px ${getGlowColor()})`,
          }}
        />
        
        {/* Tick marks */}
        {[...Array(40)].map((_, i) => {
          const angle = (i * 9 * Math.PI) / 180
          const x1 = 110 + 78 * Math.cos(angle)
          const y1 = 110 + 78 * Math.sin(angle)
          const x2 = 110 + (i % 5 === 0 ? 72 : 75) * Math.cos(angle)
          const y2 = 110 + (i % 5 === 0 ? 72 : 75) * Math.sin(angle)
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth={i % 5 === 0 ? 2 : 1}
            />
          )
        })}
      </svg>
      
      {/* Center content */}
      <div className="absolute flex flex-col items-center justify-center">
        <span 
          className="text-4xl font-bold font-mono tracking-tight transition-colors duration-300"
          style={{ color: getColor() }}
        >
          {animatedValue.toFixed(1)}%
        </span>
        <span className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
          Confidence
        </span>
      </div>
    </div>
  )
}
