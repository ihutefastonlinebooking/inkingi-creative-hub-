'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import AdminSidebar from '@/components/AdminSidebar'
import { getProjects, addProject, deleteProject } from '@/lib/database'
import toast from 'react-hot-toast'
import { FiPlus, FiTrash2 } from 'react-icons/fi'

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const data = await getProjects()
      setProjects(data)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load projects')
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

    if (!formData.title || !formData.description || !formData.category) {
      toast.error('Please fill in all required fields')
      return
    }

    setUploading(true)

    try {
      await addProject(formData.title, formData.description, formData.category, file || undefined)
      toast.success('Project added successfully!')
      setFormData({ title: '', description: '', category: '' })
      setFile(null)
      setPreview(null)
      fetchProjects()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to add project')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (projectId: string, imageUrl?: string) => {
    if (!confirm('Delete this project?')) return

    try {
      await deleteProject(projectId, imageUrl)
      toast.success('Project deleted!')
      fetchProjects()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to delete project')
    }
  }

  return (
    <div className="flex min-h-screen bg-light">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-dark mb-2">Projects</h1>
            <p className="text-gray-600">Manage your projects</p>
          </div>

          {/* Add Project Form */}
          <div className="bg-white rounded-lg shadow p-8 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-6">Add New Project</h2>

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
                  Project Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Project title"
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
                  placeholder="Project description"
                  rows={4}
                  disabled={uploading}
                  className="hover:border-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-dark font-semibold mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="e.g., Design, Art, Music"
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
                <FiPlus /> {uploading ? 'Adding...' : 'Add Project'}
              </button>
            </form>
          </div>

          {/* Projects List */}
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-dark mb-6">Projects List</h2>

            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : projects.length === 0 ? (
              <p className="text-gray-600">No projects yet</p>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 border border-gray-200 rounded-lg flex gap-4 items-start"
                  >
                    {project.imageUrl && (
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="rounded object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-dark">{project.title}</h3>
                      <p className="text-sm text-gray-600 mb-1">
                        Category: {project.category}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(project.id, project.imageUrl)}
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
