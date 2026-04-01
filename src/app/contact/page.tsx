'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { addMessage } from '@/lib/database'
import toast from 'react-hot-toast'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in required fields')
      return
    }

    setLoading(true)

    try {
      await addMessage(
        formData.name,
        formData.email,
        formData.phone,
        formData.subject,
        formData.message
      )

      toast.success('Message sent successfully! We will get back to you soon.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to send message')
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
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl opacity-90">Get in touch with INKINGI Creative Hub</p>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Email */}
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Email</h3>
              <a
                href="mailto:niyodidie@gmail.com"
                className="text-primary hover:underline"
              >
                niyodidie@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPhone className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Phone</h3>
              <a
                href="tel:+250792505680"
                className="text-primary hover:underline"
              >
                +250 792 505 680
              </a>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMapPin className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Location</h3>
              <p className="text-gray-600">Rwanda</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-dark mb-6">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-dark font-semibold mb-2">Name *</label>
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
                  <label className="block text-dark font-semibold mb-2">Email *</label>
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
                <label className="block text-dark font-semibold mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  disabled={loading}
                  className="hover:border-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-dark font-semibold mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Message subject"
                  disabled={loading}
                  className="hover:border-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-dark font-semibold mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  rows={6}
                  disabled={loading}
                  className="hover:border-primary focus:border-primary"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 btn-primary disabled:opacity-50"
              >
                <FiSend /> {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
