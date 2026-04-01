'use client'

import { useState, useEffect } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import { getMessages, deleteMessage } from '@/lib/database'
import toast from 'react-hot-toast'
import { FiTrash2, FiMail, FiPhone } from 'react-icons/fi'

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const data = await getMessages()
      setMessages(data)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (messageId: string) => {
    if (!confirm('Delete this message?')) return

    try {
      await deleteMessage(messageId)
      toast.success('Message deleted!')
      fetchMessages()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to delete message')
    }
  }

  return (
    <div className="flex min-h-screen bg-light">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <div className="max-w-5xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-dark mb-2">Contact Messages</h1>
            <p className="text-gray-600">View and manage contact form submissions</p>
          </div>

          {/* Messages List */}
          <div className="bg-white rounded-lg shadow p-8">
            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : messages.length === 0 ? (
              <p className="text-gray-600">No messages yet</p>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-dark">{message.name}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(message.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(message.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>

                    {message.subject && (
                      <p className="font-semibold text-dark mb-2">
                        Subject: {message.subject}
                      </p>
                    )}

                    <p className="text-gray-700 mb-4 whitespace-pre-wrap">
                      {message.message}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiMail />
                        <a
                          href={`mailto:${message.email}`}
                          className="text-primary hover:underline"
                        >
                          {message.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiPhone />
                        <a
                          href={`tel:${message.phone}`}
                          className="text-primary hover:underline"
                        >
                          {message.phone}
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
