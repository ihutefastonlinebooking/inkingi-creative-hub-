'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getContent } from '@/lib/database'
import { FiHeart, FiMail } from 'react-icons/fi'

export default function Donate() {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getContent()
        setContent(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4">Support Our Mission</h1>
          <p className="text-xl opacity-90">
            {content?.donationMessage ||
              'Support Hidden Talent. Support the Future.'}
          </p>
        </div>
      </section>

      {/* Donation Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Why Donate */}
            <div className="bg-light rounded-lg p-8 mb-12">
              <h2 className="text-3xl font-bold text-dark mb-6">Why Support INKINGI?</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Your donation directly supports talented individuals in our community who lack
                  resources to pursue their creative passions.
                </p>
                <p>
                  By contributing, you help us provide workshops, materials, platforms, and
                  opportunities for these hidden talents to shine.
                </p>
                <p>
                  Together, we're building a thriving creative ecosystem that benefits everyone.
                </p>
              </div>
            </div>

            {/* How to Donate */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Email Donation */}
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiMail className="text-blue-600 text-xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark">Via Email</h3>
                </div>

                <p className="text-gray-600 mb-6">
                  Contact us directly via email to arrange your donation.
                </p>

                <a
                  href="mailto:niyodidie@gmail.com?subject=INKINGI%20Donation"
                  className="inline-flex items-center gap-2 btn-primary"
                >
                  <FiMail /> Contact Us
                </a>
              </div>

              {/* WhatsApp Donation */}
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FiHeart className="text-green-600 text-xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark">Via WhatsApp</h3>
                </div>

                <p className="text-gray-600 mb-6">
                  Quick and easy - send us a message on WhatsApp to inquire about donations.
                </p>

                <a
                  href="https://wa.me/250792505680?text=I%20want%20to%20support%20INKINGI%20CREATIVE%20HUB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-secondary"
                >
                  <FiHeart /> WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Impact */}
            <div className="mt-16 text-center">
              <h2 className="text-3xl font-bold text-dark mb-8">
                Your Impact Matters
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-primary to-accent rounded-lg p-6 text-white">
                  <div className="text-4xl font-bold mb-2">100+</div>
                  <p>Talented individuals discovered</p>
                </div>
                <div className="bg-gradient-to-br from-secondary to-primary rounded-lg p-6 text-white">
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <p>Events organized</p>
                </div>
                <div className="bg-gradient-to-br from-accent to-secondary rounded-lg p-6 text-white">
                  <div className="text-4xl font-bold mb-2">1000+</div>
                  <p>Community members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
