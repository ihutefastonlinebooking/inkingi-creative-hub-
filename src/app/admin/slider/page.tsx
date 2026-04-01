'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import AdminSidebar from '@/components/AdminSidebar'
import { getSlides, addSlide, updateSlide, deleteSlide } from '@/lib/database'
import toast from 'react-hot-toast'
import { FiUpload, FiTrash2, FiEdit2 } from 'react-icons/fi'

export default function AdminSlider() {
  const [slides, setSlides] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    try {
      setLoading(true)
      const data = await getSlides()
      setSlides(data)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load slides')
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

    if (!formData.title || !formData.description) {
      toast.error('Please fill in all fields')
      return
    }

    if (!editingId && !file) {
      toast.error('Please select an image')
      return
    }

    setUploading(true)

    try {
      if (editingId) {
        // Update existing slide
        await updateSlide(editingId, {
          title: formData.title,
          description: formData.description,
        })
        toast.success('Slide updated!')
        setEditingId(null)
      } else {
        // Add new slide
        const order = slides.length
        await addSlide(file!, formData.title, formData.description, order)
        toast.success('Slide added!')
      }

      setFormData({ title: '', description: '' })
      setFile(null)
      setPreview(null)
      fetchSlides()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Operation failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (slideId: string, imageUrl: string) => {
    if (!confirm('Delete this slide?')) return

    try {
      await deleteSlide(slideId, imageUrl)
      toast.success('Slide deleted!')
      fetchSlides()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to delete')
    }
  }

  const handleEdit = (slide: any) => {
    setEditingId(slide.id)
    setFormData({
      title: slide.title,
      description: slide.description,
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({ title: '', description: '' })
    setFile(null)
    setPreview(null)
  }

  return (
    <div className="flex min-h-screen bg-light">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-dark mb-2">Hero Slider</h1>
            <p className="text-gray-600">Manage hero slider images and content</p>
          </div>

          {/* Upload Form */}
          <div className="bg-white rounded-lg shadow p-8 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-6">
              {editingId ? 'Edit Slide' : 'Add New Slide'}
            </h2>

            {preview && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-600 mb-2">Preview</p>
                <div className="relative w-full h-48">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!editingId && (
                <div>
                  <label className="block text-dark font-semibold mb-2">
                    Image
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
              )}

              <div>
                <label className="block text-dark font-semibold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Slide title"
                  disabled={uploading}
                  className="hover:border-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-dark font-semibold mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Slide description"
                  rows={4}
                  disabled={uploading}
                  className="hover:border-primary focus:border-primary"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
                >
                  <FiUpload /> {uploading ? 'Processing...' : editingId ? 'Update' : 'Add'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Slides List */}
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-dark mb-6">Current Slides</h2>

            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : slides.length === 0 ? (
              <p className="text-gray-600">No slides yet</p>
            ) : (
              <div className="space-y-4">
                {slides.map((slide) => (
                  <div
                    key={slide.id}
                    className="p-4 border border-gray-200 rounded-lg flex gap-4 items-start"
                  >
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={slide.imageUrl}
                        alt={slide.title}
                        fill
                        className="rounded object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-dark">{slide.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {slide.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(slide)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(slide.id, slide.imageUrl)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
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
