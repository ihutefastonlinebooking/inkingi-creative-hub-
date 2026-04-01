'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import AdminSidebar from '@/components/AdminSidebar'
import { getEvents, addEvent, deleteEvent } from '@/lib/database'
import toast from 'react-hot-toast'
import { FiPlus, FiTrash2 } from 'react-icons/fi'

export default function AdminEvents() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    location: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const data = await getEvents()
      setEvents(data)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load events')
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

    if (!formData.title || !formData.date || !formData.description || !formData.location) {
      toast.error('Please fill in all required fields')
      return
    }

    setUploading(true)

    try {
      await addEvent(
        formData.title,
        formData.date,
        formData.description,
        formData.location,
        file || undefined
      )
      toast.success('Event added successfully!')
      setFormData({ title: '', date: '', description: '', location: '' })
      setFile(null)
      setPreview(null)
      fetchEvents()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to add event')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (eventId: string, imageUrl?: string) => {
    if (!confirm('Delete this event?')) return

    try {
      await deleteEvent(eventId, imageUrl)
      toast.success('Event deleted!')
      fetchEvents()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to delete event')
    }
  }

  return (
    <div className="flex min-h-screen bg-light">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-dark mb-2">Events</h1>
            <p className="text-gray-600">Manage your events</p>
          </div>

          {/* Add Event Form */}
          <div className="bg-white rounded-lg shadow p-8 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-6">Add New Event</h2>

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
              <div>
                <label className="block text-dark font-semibold mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Event title"
                  disabled={uploading}
                  className="hover:border-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-dark font-semibold mb-2">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  disabled={uploading}
                  className="hover:border-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-dark font-semibold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Event location"
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
                  placeholder="Event description"
                  rows={4}
                  disabled={uploading}
                  className="hover:border-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-dark font-semibold mb-2">
                  Image (Optional)
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
                <FiPlus /> {uploading ? 'Adding...' : 'Add Event'}
              </button>
            </form>
          </div>

          {/* Events List */}
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-dark mb-6">Events List</h2>

            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : events.length === 0 ? (
              <p className="text-gray-600">No events yet</p>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 border border-gray-200 rounded-lg flex gap-4 items-start"
                  >
                    {event.imageUrl && (
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="rounded object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-dark">{event.title}</h3>
                      <p className="text-sm text-primary font-semibold mb-1">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      {event.location && (
                        <p className="text-sm text-gray-600 mb-1">
                          📍 {event.location}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(event.id, event.imageUrl)}
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
