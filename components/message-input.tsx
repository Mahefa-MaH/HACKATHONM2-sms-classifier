"use client"

import { Scan, Sparkles, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MessageInputProps {
  message: string
  setMessage: (message: string) => void
  onScan: () => void
  onClear: () => void
  isAnalyzing: boolean
}

export function MessageInput({ 
  message, 
  setMessage, 
  onScan, 
  onClear,
  isAnalyzing 
}: MessageInputProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Message Analysis
            </h2>
            <p className="text-xs text-muted-foreground">
              Paste SMS content for AI classification
            </p>
          </div>
        </div>
        {message && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {/* Text Area */}
      <div className="relative group">
        <div 
          className="absolute -inset-0.5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(0, 212, 255, 0.3), rgba(0, 212, 255, 0.1))",
            filter: "blur(8px)"
          }}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste your SMS message here for analysis..."
          className="
            relative w-full h-40 p-4 rounded-xl resize-none
            bg-secondary/50 backdrop-blur-md
            border border-border
            text-foreground placeholder:text-muted-foreground
            focus:outline-none focus:border-primary/50
            transition-all duration-300
            font-mono text-sm leading-relaxed
          "
          disabled={isAnalyzing}
        />
        
        {/* Character count */}
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground font-mono">
          {message.length} chars
        </div>
      </div>

      {/* Scan Button */}
      <Button
        onClick={onScan}
        disabled={!message.trim() || isAnalyzing}
        className="
          w-full h-12 rounded-xl
          bg-primary text-primary-foreground
          hover:bg-primary/90
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300
          font-semibold tracking-wide
          relative overflow-hidden
          group
        "
        style={{
          boxShadow: message.trim() && !isAnalyzing 
            ? "0 0 30px rgba(0, 212, 255, 0.3)" 
            : "none"
        }}
      >
        {/* Button glow effect */}
        <div 
          className="
            absolute inset-0 opacity-0 group-hover:opacity-100 
            transition-opacity duration-300
          "
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)"
          }}
        />
        
        <div className="relative flex items-center justify-center gap-2">
          <Scan className={`w-5 h-5 ${isAnalyzing ? "animate-pulse" : ""}`} />
          <span>
            {isAnalyzing ? "Analyzing..." : "Run Intelligence Scan"}
          </span>
        </div>
      </Button>

      {/* Sample messages */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-muted-foreground">Try samples:</span>
        <button
          onClick={() => setMessage("URGENT! You have won $1,000,000! Click here to claim your prize now: bit.ly/claim-prize. Act fast, offer expires in 24 hours!")}
          className="text-xs text-primary/70 hover:text-primary transition-colors"
          disabled={isAnalyzing}
        >
          Spam Example
        </button>
        <span className="text-muted-foreground">|</span>
        <button
          onClick={() => setMessage("Hi! Just wanted to confirm our meeting tomorrow at 2 PM. Let me know if the time still works for you. See you then!")}
          className="text-xs text-primary/70 hover:text-primary transition-colors"
          disabled={isAnalyzing}
        >
          Ham Example
        </button>
      </div>
    </div>
  )
}
