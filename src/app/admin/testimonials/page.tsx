'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import AdminSidebar from '@/components/AdminSidebar'
import { getTestimonials, addTestimonial, deleteTestimonial } from '@/lib/database'
import toast from 'react-hot-toast'
import { FiPlus, FiTrash2 } from 'react-icons/fi'

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    story: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const data = await getTestimonials()
      setTestimonials(data)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load testimonials')
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    setFile(selectedFile)
    const reader = new FileReader()
    reader.onload = (event) => {
      setPreview(event.target?.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.story) {
      toast.error('Please fill in all required fields')
      return
    }

    setUploading(true)

    try {
      await addTestimonial(formData.name, formData.story, file || undefined)
      toast.success('Testimonial added successfully!')
      setFormData({ name: '', story: '' })
      setFile(null)
      setPreview(null)
      fetchTestimonials()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to add testimonial')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (testimonialId: string, imageUrl?: string) => {
    if (!confirm('Delete this testimonial?')) return

    try {
      await deleteTestimonial(testimonialId, imageUrl)
      toast.success('Testimonial deleted!')
      fetchTestimonials()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to delete testimonial')
    }
  }

  return (
    <div className="flex min-h-screen bg-light">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-dark mb-2">Testimonials</h1>
            <p className="text-gray-600">Manage testimonials and stories</p>
          </div>

          {/* Add Testimonial Form */}
          <div className="bg-white rounded-lg shadow p-8 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-6">Add New Testimonial</h2>

            {preview && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-600 mb-2">Preview</p>
                <div className="relative w-24 h-24">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-dark font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Person's name"
                  disabled={uploading}
                  className="hover:border-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-dark font-semibold mb-2">
                  Story / Testimonial
                </label>
                <textarea
                  value={formData.story}
                  onChange={(e) =>
                    setFormData({ ...formData, story: e.target.value })
                  }
                  placeholder="Their story or testimonial"
                  rows={5}
                  disabled={uploading}
                  className="hover:border-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-dark font-semibold mb-2">
                  Photo (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={uploading}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary file:text-white
                    hover:file:bg-opacity-90"
                />
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
              >
                <FiPlus /> {uploading ? 'Adding...' : 'Add Testimonial'}
              </button>
            </form>
          </div>

          {/* Testimonials List */}
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-dark mb-6">Testimonials List</h2>

            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : testimonials.length === 0 ? (
              <p className="text-gray-600">No testimonials yet</p>
            ) : (
              <div className="space-y-4">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="p-4 border border-gray-200 rounded-lg flex gap-4 items-start"
                  >
                    {testimonial.imageUrl && (
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={testimonial.imageUrl}
                          alt={testimonial.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-dark">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 italic">
                        "{testimonial.story}"
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(testimonial.id, testimonial.imageUrl)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
