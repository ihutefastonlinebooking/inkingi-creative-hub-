'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { loginAdmin } from '@/lib/auth'
import toast from 'react-hot-toast'
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      await loginAdmin(email, password)
      toast.success('Welcome back!')
      router.push('/admin/dashboard')
    } catch (error: any) {
      console.error('Login error:', error)
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        toast.error('Invalid email or password')
      } else if (error.message === 'Not an authorized admin') {
        toast.error('You are not authorized as admin')
      } else {
        toast.error('Login failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-secondary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold text-white">ICH</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">INKINGI</h1>
          <p className="text-gray-300">Admin Dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-dark mb-6">Admin Login</h2>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-dark font-semibold mb-2">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="niyodidie@gmail.com"
                disabled={loading}
                className="pl-10 hover:border-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-dark font-semibold mb-2">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className="pl-10 hover:border-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex justify-between items-center mb-6 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <Link href="#" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
            {!loading && <FiArrowRight />}
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-6 bg-primary bg-opacity-10 border border-primary rounded-lg p-4">
          <p className="text-sm text-dark">
            <strong>Demo Credentials:</strong><br />
            Email: niyodidie@gmail.com<br />
            (Password set during initialization)
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-gray-300 hover:text-white transition inline-flex items-center gap-2">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
