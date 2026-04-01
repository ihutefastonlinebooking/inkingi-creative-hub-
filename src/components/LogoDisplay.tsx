'use client'

import { useState, useEffect } from 'react'
import { getLogo } from '@/lib/database'
import Image from 'next/image'

interface LogoDisplayProps {
  size?: number
}

export default function LogoDisplay({ size = 50 }: LogoDisplayProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const logo = await getLogo()
        if (logo) {
          setLogoUrl(logo.url)
        }
      } catch (error) {
        console.error('Error fetching logo:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogo()
  }, [])

  if (loading) {
    return (
      <div
        className="bg-gray-300 rounded-full animate-pulse"
        style={{ width: size, height: size }}
      />
    )
  }

  if (!logoUrl) {
    return (
      <div
        className="bg-primary text-white flex items-center justify-center rounded-full font-bold text-sm"
        style={{ width: size, height: size }}
      >
        ICH
      </div>
    )
  }

  return (
    <Image
      src={logoUrl}
      alt="INKINGI CREATIVE HUB Logo"
      width={size}
      height={size}
      className="rounded-full object-cover"
      priority
    />
  )
}
