'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSlider from '@/components/HeroSlider'
import { getContent, getProjects, getTestimonials, getEvents, getGalleryImages } from '@/lib/database'
import { FiArrowRight, FiHeart } from 'react-icons/fi'

export default function Home() {
  const [content, setContent] = useState<any>(null)
  const [projects, setProjects] = useState<any[]>([])
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [galleryImages, setGalleryImages] = useState<any[]>([])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [contentData, projectsData, testimonialsData, eventsData, galleryData] =
          await Promise.all([
            getContent(),
            getProjects(),
            getTestimonials(),
            getEvents(),
            getGalleryImages(),
          ])

        setContent(contentData)
        setProjects(projectsData.slice(0, 3))
        setTestimonials(testimonialsData)
        setUpcomingEvents(eventsData.slice(0, 3))
        setGalleryImages(galleryData.slice(0, 6))
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }

    loadData()
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length === 0) return
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <main>
      <Header />

      {/* Hero Slider */}
      <section className="container-custom py-8">
        <HeroSlider />
      </section>

      {/* Mission Section */}
      {content && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="section-title">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{content.mission}</p>
                <h3 className="text-2xl font-bold mb-3 text-secondary">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">{content.vision}</p>
              </div>
              <div className="bg-gradient-to-br from-primary to-secondary rounded-lg h-64 flex items-center justify-center text-white text-center p-8">
                <div>
                  <h3 className="text-4xl font-bold mb-2">Hidden Talent</h3>
                  <p className="text-lg">Shining Through</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title">Our Projects</h2>
              <p className="section-subtitle">
                Showcasing the amazing work of our talented community
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                >
                  {project.imageUrl && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    {project.category && (
                      <span className="inline-block bg-primary text-white text-xs px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/gallery" className="btn-primary inline-flex items-center gap-2">
                View All Projects <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-gray-100">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title">Inspiring Stories</h2>
              <p className="section-subtitle">
                Hear from members of our creative community
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              {testimonials.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center animate-fadeIn">
                  {testimonials[currentTestimonial].imageUrl && (
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <Image
                        src={testimonials[currentTestimonial].imageUrl}
                        alt={testimonials[currentTestimonial].name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                  <p className="text-lg text-gray-600 mb-4 italic">
                    "{testimonials[currentTestimonial].story}"
                  </p>
                  <p className="text-xl font-bold text-primary">
                    {testimonials[currentTestimonial].name}
                  </p>

                  {/* Dots */}
                  <div className="flex justify-center gap-2 mt-6">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-2 h-2 rounded-full transition ${
                          index === currentTestimonial
                            ? 'bg-primary w-8'
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title">Upcoming Events</h2>
              <p className="section-subtitle">Join us and be part of the creative movement</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                >
                  {event.imageUrl && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-sm text-primary font-semibold mb-2">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    {event.location && (
                      <p className="text-gray-600 text-sm mb-4">{event.location}</p>
                    )}
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/events" className="btn-primary inline-flex items-center gap-2">
                See All Events <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Preview */}
      {galleryImages.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title">Gallery</h2>
              <p className="section-subtitle">Visual showcase of our creative projects</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="relative h-48 sm:h-56 rounded-lg overflow-hidden hover:scale-105 transition"
                >
                  <Image
                    src={image.url}
                    alt={image.title || 'Gallery image'}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/gallery" className="btn-outline inline-flex items-center gap-2">
                View Full Gallery <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Donation CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-4">
            {content?.donationMessage ||
              'Support Hidden Talent. Support the Future.'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Help us nurture the next generation of creative talents
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:niyodidie@gmail.com"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition inline-flex items-center justify-center gap-2"
            >
              <FiHeart /> Donate via Email
            </a>
            <a
              href="https://wa.me/250792505680?text=I%20want%20to%20support%20INKINGI%20CREATIVE%20HUB"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition inline-flex items-center justify-center gap-2"
            >
              <FiHeart /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
