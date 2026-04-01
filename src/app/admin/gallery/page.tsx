'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import AdminSidebar from '@/components/AdminSidebar'
import { getGalleryImages, uploadGalleryImage, deleteGalleryImage } from '@/lib/database'
import toast from 'react-hot-toast'
import { FiUpload, FiTrash2 } from 'react-icons/fi'

export default function AdminGallery() {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      setLoading(true)
      const data = await getGalleryImages()
      setImages(data)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load gallery')
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setUploading(true)

    try {
      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} is not an image file`)
          continue
        }

        await uploadGalleryImage(file)
      }

      toast.success('Images uploaded successfully!')
      fetchImages()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to upload images')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (imageId: string, url: string) => {
    if (!confirm('Delete this image?')) return

    try {
      await deleteGalleryImage(imageId, url)
      toast.success('Image deleted!')
      fetchImages()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to delete image')
    }
  }

  return (
    <div className="flex min-h-screen bg-light">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <div className="max-w-5xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-dark mb-2">Gallery</h1>
            <p className="text-gray-600">Manage gallery images</p>
          </div>

          {/* Upload Form */}
          <div className="bg-white rounded-lg shadow p-8 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-6">Upload Images</h2>

            <div>
              <label className="block text-dark font-semibold mb-2">
                Select Images (Multiple)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
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
                Select multiple images to upload at once
              </p>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="mt-6 flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
            >
              <FiUpload /> {uploading ? 'Uploading...' : 'Upload Images'}
            </button>
          </div>

          {/* Gallery Grid */}
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-dark mb-6">Gallery Images</h2>

            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : images.length === 0 ? (
              <p className="text-gray-600">No images yet</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="relative group rounded-lg overflow-hidden"
                  >
                    <div className="relative h-40">
                      <Image
                        src={image.url}
                        alt={image.title || 'Gallery image'}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Delete button on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center">
                      <button
                        onClick={() => handleDelete(image.id, image.url)}
                        className="opacity-0 group-hover:opacity-100 transition p-2 bg-red-600 text-white rounded-lg"
                      >
                        <FiTrash2 size={20} />
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
