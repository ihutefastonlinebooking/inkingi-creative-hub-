'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getEvents } from '@/lib/database'
import { FiCalendar, FiMapPin, FiArrowRight } from 'react-icons/fi'

export default function Events() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents()
        setEvents(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4">Events</h1>
          <p className="text-xl opacity-90">Join us for inspiring events and workshops</p>
        </div>
      </section>

      {/* Events */}
      <section className="py-16">
        <div className="container-custom">
          {loading ? (
            <p className="text-center text-gray-600">Loading events...</p>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No events scheduled yet.</p>
              <p className="text-gray-500">Check back soon for upcoming events!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
                >
                  <div className="grid md:grid-cols-3 gap-6 p-6">
                    {/* Image */}
                    {event.imageUrl && (
                      <div className="relative h-64 md:h-auto">
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className={event.imageUrl ? 'md:col-span-2' : ''}>
                      <h2 className="text-3xl font-bold text-dark mb-4">
                        {event.title}
                      </h2>

                      <div className="space-y-3 mb-6 text-gray-600">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="text-primary" />
                          <span>
                            {new Date(event.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>

                        {event.location && (
                          <div className="flex items-center gap-2">
                            <FiMapPin className="text-primary" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-6">
                        {event.description}
                      </p>

                      <button className="flex items-center gap-2 btn-primary">
                        Learn More <FiArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
