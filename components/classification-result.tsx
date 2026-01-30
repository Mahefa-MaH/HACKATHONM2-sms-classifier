"use client"

import { ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react"
import { ConfidenceGauge } from "./confidence-gauge"

interface ClassificationResultProps {
  result: {
    classification: "spam" | "ham"
    confidence: number
    threats?: string[]
    indicators?: string[]
  } | null
  isAnalyzing: boolean
}

export function ClassificationResult({ result, isAnalyzing }: ClassificationResultProps) {
  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center py-12 animate-pulse">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 backdrop-blur-sm" />
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground uppercase tracking-widest">
          Scanning Message...
        </p>
        <div className="flex gap-1 mt-3">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-secondary/50 backdrop-blur-sm flex items-center justify-center mb-6 border border-border">
          <ShieldCheck className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          Ready for Analysis
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Paste an SMS message above and run the intelligence scan to classify it
        </p>
      </div>
    )
  }

  const isSpam = result.classification === "spam"

  return (
    <div className="flex flex-col items-center py-6">
      {/* Status Badge */}
      <div
        className={`
          inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8
          backdrop-blur-md border transition-all duration-500
          ${isSpam 
            ? "bg-[#ff4757]/10 border-[#ff4757]/30 text-[#ff4757]" 
            : "bg-[#00e676]/10 border-[#00e676]/30 text-[#00e676]"
          }
        `}
      >
        {isSpam ? (
          <>
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Threat Detected
            </span>
          </>
        ) : (
          <>
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Legitimate Message
            </span>
          </>
        )}
      </div>

      {/* Confidence Gauge */}
      <ConfidenceGauge 
        value={result.confidence} 
        status={result.classification}
      />

      {/* Classification Icon */}
      <div
        className={`
          mt-8 p-4 rounded-2xl backdrop-blur-md border transition-all duration-500
          ${isSpam 
            ? "bg-[#ff4757]/5 border-[#ff4757]/20" 
            : "bg-[#00e676]/5 border-[#00e676]/20"
          }
        `}
        style={{
          boxShadow: isSpam 
            ? "0 0 40px rgba(255, 71, 87, 0.15)" 
            : "0 0 40px rgba(0, 230, 118, 0.15)"
        }}
      >
        {isSpam ? (
          <ShieldAlert className="w-12 h-12 text-[#ff4757]" />
        ) : (
          <ShieldCheck className="w-12 h-12 text-[#00e676]" />
        )}
      </div>

      {/* Indicators */}
      {result.indicators && result.indicators.length > 0 && (
        <div className="mt-8 w-full max-w-sm">
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            {isSpam ? "Risk Indicators" : "Trust Indicators"}
          </h4>
          <div className="space-y-2">
            {result.indicators.map((indicator, i) => (
              <div 
                key={i}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                  backdrop-blur-sm border
                  ${isSpam 
                    ? "bg-[#ff4757]/5 border-[#ff4757]/10 text-[#ff4757]/80" 
                    : "bg-[#00e676]/5 border-[#00e676]/10 text-[#00e676]/80"
                  }
                `}
              >
                <div 
                  className={`w-1.5 h-1.5 rounded-full ${isSpam ? "bg-[#ff4757]" : "bg-[#00e676]"}`}
                />
                {indicator}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
