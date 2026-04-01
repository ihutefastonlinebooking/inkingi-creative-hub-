'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getSlides } from '@/lib/database'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function HeroSlider() {
  const [slides, setSlides] = useState<any[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await getSlides()
        if (data.length > 0) {
          setSlides(data)
        }
      } catch (error) {
        console.error('Error fetching slides:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSlides()
  }, [])

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (slides.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  if (loading) {
    return (
      <div className="w-full h-96 bg-gray-300 animate-pulse rounded-lg" />
    )
  }

  if (slides.length === 0) {
    return (
      <div className="w-full h-96 bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-center">
        <div>
          <h2 className="text-4xl font-bold mb-2">INKINGI CREATIVE HUB</h2>
          <p className="text-xl">Support Hidden Talent. Support the Future.</p>
        </div>
      </div>
    )
  }

  const slide = slides[currentSlide]

  return (
    <div className="relative w-full h-96 sm:h-screen max-h-[600px] sm:max-h-none overflow-hidden rounded-lg">
      {/* Current Slide */}
      <Image
        src={slide.imageUrl}
        alt={slide.title}
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h2 className="text-3xl sm:text-5xl font-bold mb-4 animate-fadeIn">
          {slide.title}
        </h2>
        <p className="text-lg sm:text-xl max-w-2xl animate-fadeIn">
          {slide.description}
        </p>
      </div>

      {/* Navigation Buttons */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-dark p-2 rounded-full transition z-10"
            aria-label="Previous slide"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-dark p-2 rounded-full transition z-10"
            aria-label="Next slide"
          >
            <FiChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition ${
                  index === currentSlide ? 'bg-primary w-8' : 'bg-white bg-opacity-50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
