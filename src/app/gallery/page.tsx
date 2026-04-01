'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getGalleryImages } from '@/lib/database'

export default function Gallery() {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<any>(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getGalleryImages()
        setImages(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-xl opacity-90">Showcase of our creative works</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="container-custom">
          {loading ? (
            <p className="text-center text-gray-600">Loading gallery...</p>
          ) : images.length === 0 ? (
            <p className="text-center text-gray-600">Gallery coming soon</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className="relative h-48 rounded-lg overflow-hidden cursor-pointer group"
                >
                  <Image
                    src={image.url}
                    alt={image.title || 'Gallery image'}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full h-96">
            <Image
              src={selectedImage.url}
              alt={selectedImage.title || 'Gallery image'}
              fill
              className="object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
