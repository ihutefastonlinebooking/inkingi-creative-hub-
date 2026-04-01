'use client'

import { useState, useEffect } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import { getVolunteers, deleteVolunteer } from '@/lib/database'
import toast from 'react-hot-toast'
import { FiTrash2, FiMail, FiPhone } from 'react-icons/fi'

export default function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVolunteers()
  }, [])

  const fetchVolunteers = async () => {
    try {
      setLoading(true)
      const data = await getVolunteers()
      setVolunteers(data)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load volunteers')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (volunteerId: string) => {
    if (!confirm('Delete this volunteer application?')) return

    try {
      await deleteVolunteer(volunteerId)
      toast.success('Volunteer deleted!')
      fetchVolunteers()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to delete volunteer')
    }
  }

  return (
    <div className="flex min-h-screen bg-light">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <div className="max-w-5xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-dark mb-2">Volunteer Applications</h1>
            <p className="text-gray-600">View and manage volunteer applications</p>
          </div>

          {/* Volunteers List */}
          <div className="bg-white rounded-lg shadow p-8">
            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : volunteers.length === 0 ? (
              <p className="text-gray-600">No volunteer applications yet</p>
            ) : (
              <div className="space-y-4">
                {volunteers.map((volunteer) => (
                  <div
                    key={volunteer.id}
                    className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-dark">{volunteer.name}</h3>
                        <p className="text-sm text-gray-500">
                          Applied: {new Date(volunteer.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(volunteer.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>

                    {volunteer.message && (
                      <p className="text-gray-700 mb-4 whitespace-pre-wrap">
                        {volunteer.message}
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiMail />
                        <a
                          href={`mailto:${volunteer.email}`}
                          className="text-primary hover:underline"
                        >
                          {volunteer.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiPhone />
                        <a
                          href={`tel:${volunteer.phone}`}
                          className="text-primary hover:underline"
                        >
                          {volunteer.phone}
                        </a>
                      </div>
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
