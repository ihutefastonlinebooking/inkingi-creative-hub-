'use client'

import { useState, useEffect } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import { getMessages, getVolunteers, getEvents } from '@/lib/database'
import { FiMail, FiUsers, FiCalendar } from 'react-icons/fi'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    messages: 0,
    volunteers: 0,
    events: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [messages, volunteers, events] = await Promise.all([
          getMessages(),
          getVolunteers(),
          getEvents(),
        ])

        setStats({
          messages: messages.length,
          volunteers: volunteers.length,
          events: events.length,
        })
      } catch (error) {
        console.error('Error loading stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  return (
    <div className="flex min-h-screen bg-light">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-dark mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to INKINGI CREATIVE HUB Admin Panel</p>
        </div>

        {/* Stats Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Messages Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Messages</p>
                  <p className="text-4xl font-bold text-dark mt-2">{stats.messages}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-full">
                  <FiMail className="text-blue-600 text-2xl" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">From contact form submissions</p>
            </div>

            {/* Volunteers Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Volunteers</p>
                  <p className="text-4xl font-bold text-dark mt-2">{stats.volunteers}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-full">
                  <FiUsers className="text-green-600 text-2xl" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">Who want to join us</p>
            </div>

            {/* Events Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Events</p>
                  <p className="text-4xl font-bold text-dark mt-2">{stats.events}</p>
                </div>
                <div className="bg-orange-100 p-4 rounded-full">
                  <FiCalendar className="text-orange-600 text-2xl" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">Created and ongoing</p>
            </div>
          </div>
        )}

        {/* Quick Start Guide */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-dark mb-4">Quick Start Guide</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-dark mb-3">Getting Started</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Start by uploading your logo</li>
                <li>✓ Create hero slider images</li>
                <li>✓ Edit your mission and vision</li>
                <li>✓ Add your projects and events</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-dark mb-3">Content Management</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Manage gallery images</li>
                <li>✓ Add testimonials</li>
                <li>✓ View contact messages</li>
                <li>✓ Track volunteer applications</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2024 INKINGI CREATIVE HUB. All rights reserved.</p>
        </div>
      </main>
    </div>
  )
}
