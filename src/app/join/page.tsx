'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { addVolunteer } from '@/lib/database'
import toast from 'react-hot-toast'
import { FiHeart, FiSend } from 'react-icons/fi'

export default function Join() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      await addVolunteer(
        formData.name,
        formData.email,
        formData.phone,
        formData.message
      )

      toast.success('Thank you for your interest! We will contact you soon.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      })
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to submit application')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4">Join Our Community</h1>
          <p className="text-xl opacity-90">
            Become a volunteer and help us support creative talent
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            {/* Why Join */}
            <div>
              <h2 className="section-title">Why Join Us?</h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex gap-4">
                  <span className="text-3xl">🎯</span>
                  <div>
                    <h3 className="font-bold text-dark mb-1">Make a Difference</h3>
                    <p>Help discover and nurture hidden creative talents</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-3xl">🤝</span>
                  <div>
                    <h3 className="font-bold text-dark mb-1">Community</h3>
                    <p>
                      Connect with like-minded individuals passionate about creativity
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-3xl">🌟</span>
                  <div>
                    <h3 className="font-bold text-dark mb-1">Growth</h3>
                    <p>Develop new skills and gain valuable experience</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-3xl">💪</span>
                  <div>
                    <h3 className="font-bold text-dark mb-1">Impact</h3>
                    <p>Be part of building a thriving creative ecosystem</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="bg-gradient-to-br from-primary to-secondary rounded-lg h-96 flex items-center justify-center text-white text-center p-8">
              <div>
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-3xl font-bold">Build Together</h3>
                <p className="text-lg opacity-90 mt-2">
                  Support Hidden Talent. Support the Future.
                </p>
              </div>
            </div>
          </div>

          {/* Volunteer Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-dark mb-2 flex items-center gap-2">
              <FiHeart className="text-primary" /> Volunteer Application
            </h2>
            <p className="text-gray-600 mb-8">
              Join our team and help us make a difference
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-dark font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    disabled={loading}
                    className="hover:border-primary focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-dark font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    disabled={loading}
                    className="hover:border-primary focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-dark font-semibold mb-2">
                  Phone Number *
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  disabled={loading}
                  className="hover:border-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-dark font-semibold mb-2">
                  Tell us about yourself (optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What interests you about INKINGI? What skills can you contribute?"
                  rows={5}
                  disabled={loading}
                  className="hover:border-primary focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 btn-primary disabled:opacity-50"
              >
                <FiSend /> {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-6">
              We will review your application and contact you shortly.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
