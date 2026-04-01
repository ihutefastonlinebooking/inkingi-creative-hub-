import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'

export const metadata: Metadata = {
  title: 'INKINGI CREATIVE HUB',
  description: 'Support Hidden Talent. Support the Future.',
  keywords: 'creative, hub, talent, art, design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-light text-dark">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
