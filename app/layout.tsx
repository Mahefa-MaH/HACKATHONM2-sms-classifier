import React from "react"
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: 'Chill Shield AI | Intelligent Message Classifier',
  description: 'AI-powered SMS classification system for detecting spam and threats',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/placeholder-logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: 'placeholder-logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: 'placeholder-logo.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
