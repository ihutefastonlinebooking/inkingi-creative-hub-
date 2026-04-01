'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import AdminSidebar from '@/components/AdminSidebar'
import { getLogo, uploadLogo, deleteLogo } from '@/lib/database'
import toast from 'react-hot-toast'
import { FiUpload, FiTrash2, FiImage } from 'react-icons/fi'

export default function AdminLogo() {
  const [logo, setLogo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    fetchLogo()
  }, [])

  const fetchLogo = async () => {
    try {
      setLoading(true)
      const logoData = await getLogo()
      if (logoData) {
        setLogo(logoData)
      }
    } catch (error) {
      console.error('Error fetching logo:', error)
      toast.error('Failed to load logo')
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onload = (event) => {
      setPreview(event.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Store file for upload
    ;(window as any).selectedLogoFile = file
  }

  const handleUpload = async () => {
    const file = (window as any).selectedLogoFile
    if (!file) {
      toast.error('Please select a file first')
      return
    }

    setUploading(true)
    try {
      // Delete old logo if exists
      if (logo?.url) {
        await deleteLogo(logo.url)
      }

      // Upload new logo
      const url = await uploadLogo(file)
      setLogo({ url, uploadedAt: new Date() })
      setPreview(null)
      ;(window as any).selectedLogoFile = null

      toast.success('Logo uploaded successfully!')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload logo')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async () => {
    if (!logo?.url) return

    if (!confirm('Are you sure you want to delete the logo?')) return

    try {
      await deleteLogo(logo.url)
      setLogo(null)
      toast.success('Logo deleted successfully!')
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete logo')
    }
  }

  return (
    <div className="flex min-h-screen bg-light">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <div className="max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-dark mb-2">Logo Management</h1>
            <p className="text-gray-600">Upload and manage your organization logo</p>
          </div>

          {/* Current Logo */}
          {!loading && (
            <div className="bg-white rounded-lg shadow p-8 mb-6">
              <h2 className="text-2xl font-bold text-dark mb-6">Current Logo</h2>

              {logo?.url ? (
                <div className="flex items-center justify-between mb-6">
                  <div className="relative w-32 h-32">
                    <Image
                      src={logo.url}
                      alt="Current logo"
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-lg mb-6">
                  <FiImage className="text-gray-400 text-3xl" />
                </div>
              )}

              <p className="text-sm text-gray-500">
                {logo?.uploadedAt
                  ? `Uploaded: ${new Date(logo.uploadedAt).toLocaleDateString()}`
                  : 'No logo uploaded yet'}
              </p>
            </div>
          )}

          {/* Upload Form */}
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-dark mb-6">Upload Logo</h2>

            {/* Preview */}
            {preview && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-600 mb-2">Preview</p>
                <div className="relative w-48 h-48">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            )}

            {/* File Input */}
            <div className="mb-6">
              <label className="block text-dark font-semibold mb-2">
                Select Image
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
              <p className="text-xs text-gray-500 mt-2">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={!preview || uploading}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
            >
              <FiUpload /> {uploading ? 'Uploading...' : 'Upload Logo'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
