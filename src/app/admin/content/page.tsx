'use client'

import { useState, useEffect } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import { getContent, updateContent } from '@/lib/database'
import toast from 'react-hot-toast'
import { FiSave } from 'react-icons/fi'

export default function AdminContent() {
  const [content, setContent] = useState({
    about: '',
    mission: '',
    vision: '',
    donationMessage: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      setLoading(true)
      const data = await getContent()
      if (data) {
        setContent(data)
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load content')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    field: keyof typeof content,
    value: string
  ) => {
    setContent({ ...content, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setSaving(true)
    try {
      await updateContent(content)
      toast.success('Content updated successfully!')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to save content')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-light">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <div className="max-w-3xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-dark mb-2">Content Editor</h1>
            <p className="text-gray-600">Edit your website content</p>
          </div>

          {!loading && (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 space-y-6">
              <div>
                <label className="block text-dark font-semibold mb-2">
                  About
                </label>
                <textarea
                  value={content.about}
                  onChange={(e) => handleChange('about', e.target.value)}
                  placeholder="About section text"
                  rows={4}
                  disabled={saving}
                  className="hover:border-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-dark font-semibold mb-2">
                  Mission
                </label>
                <textarea
                  value={content.mission}
                  onChange={(e) => handleChange('mission', e.target.value)}
                  placeholder="Your mission statement"
                  rows={4}
                  disabled={saving}
                  className="hover:border-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-dark font-semibold mb-2">
                  Vision
                </label>
                <textarea
                  value={content.vision}
                  onChange={(e) => handleChange('vision', e.target.value)}
                  placeholder="Your vision statement"
                  rows={4}
                  disabled={saving}
                  className="hover:border-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-dark font-semibold mb-2">
                  Donation Message
                </label>
                <textarea
                  value={content.donationMessage}
                  onChange={(e) => handleChange('donationMessage', e.target.value)}
                  placeholder="Message displayed in donation section"
                  rows={3}
                  disabled={saving}
                  className="hover:border-primary focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
              >
                <FiSave /> {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}
