import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { listImages, deleteImage, downloadImage } from '../api/images'
import TransformPanel from '../components/TransformPanel'
import ConfirmModal from '../components/ConfirmModal'

export default function ImageDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const [transformedUrl, setTransformedUrl] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true)
      try {
        const { data } = await listImages(1, 100)
        const found = data.images.find((img) => img._id === id)
        if (found) {
          setImage(found)
        } else {
          setError('Image not found')
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load image')
      } finally {
        setLoading(false)
      }
    }
    fetchImage()
  }, [id])

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteImage(id)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed')
      setDeleting(false)
      setShowDeleteModal(false)
    }
  }

  const handleDownload = async () => {
    try {
      const response = await downloadImage(id)
      const blob = response.data
      const contentDisposition = response.headers['content-disposition'] || ''
      const filenameMatch = contentDisposition.match(/filename="?([^";]+)"?/i)
      const fallbackName = `${id}.jpg`
      const filename = filenameMatch?.[1] || fallbackName

      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(blobUrl)
    } catch (err) {
      setError(err.response?.data?.message || 'Download failed')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !image) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-red-400 mb-4">{error || 'Image not found'}</p>
        <Link to="/" className="text-indigo-400 hover:text-indigo-300">Back to gallery</Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/" className="text-indigo-400 hover:text-indigo-300 text-sm mb-6 inline-block">
        &larr; Back to gallery
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <img
              src={transformedUrl || image.url}
              alt="Full size image"
              className="w-full h-auto"
            />
          </div>
          {transformedUrl && (
            <p className="text-sm text-slate-400 mt-2">
              Showing transformed version.{' '}
              <button
                onClick={() => setTransformedUrl(null)}
                className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
              >
                View original
              </button>
            </p>
          )}
        </div>

        <div className="space-y-6">
          <TransformPanel imageId={id} onTransformed={setTransformedUrl} />

          {transformedUrl && (
            <button
              type="button"
              onClick={handleDownload}
              className="w-full inline-block text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition-colors"
            >
              Download transformed
            </button>
          )}

          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full bg-red-600/10 border border-red-600/50 text-red-400 py-2 rounded-lg hover:bg-red-600/20 transition-colors cursor-pointer"
          >
            Delete Image
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Image"
        message="Are you sure you want to delete this image? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  )
}
