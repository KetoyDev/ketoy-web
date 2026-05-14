import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
}

export default function LandingLayout({ children }: { children: ReactNode }) {
  return children
}
