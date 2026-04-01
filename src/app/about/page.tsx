'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getContent } from '@/lib/database'

export default function About() {
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
          <h1 className="text-5xl font-bold mb-4">About INKINGI</h1>
          <p className="text-xl opacity-90">
            Supporting Hidden Talent. Supporting the Future.
          </p>
        </div>
      </section>

      {/* Content */}
      {!loading && content && (
        <section className="py-16">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12">
              {/* About */}
              <div>
                <h2 className="section-title">Who We Are</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {content.about || 'INKINGI Creative Hub is a dedicated platform for supporting and nurturing creative talent in our community.'}
                </p>
              </div>

              {/* Image */}
              <div className="bg-gradient-to-br from-primary to-secondary rounded-lg h-64 flex items-center justify-center text-white">
                <span className="text-6xl">🎨</span>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8 mt-16">
              <div className="bg-light rounded-lg p-8">
                <h3 className="text-2xl font-bold text-dark mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  {content.mission || 'To identify, nurture, and support creative talents in our community.'}
                </p>
              </div>

              <div className="bg-light rounded-lg p-8">
                <h3 className="text-2xl font-bold text-dark mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  {content.vision || 'To create a thriving ecosystem where creative talents can flourish and showcase their gifts to the world.'}
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="mt-16 text-center">
              <h2 className="section-title">Our Core Values</h2>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-4xl mb-4">🌟</div>
                  <h3 className="text-xl font-bold mb-2">Excellence</h3>
                  <p className="text-gray-600">
                    We strive for the highest quality in everything we do.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-4xl mb-4">❤️</div>
                  <h3 className="text-xl font-bold mb-2">Passion</h3>
                  <p className="text-gray-600">
                    We are passionate about supporting creative expression.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-xl font-bold mb-2">Community</h3>
                  <p className="text-gray-600">
                    We believe in the power of community and collaboration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
