import { useState, useEffect, useCallback } from 'react'
import { listImages } from '../api/images'

const LIMIT = 12

export function useImages() {
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchImages = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await listImages(page, LIMIT)
      setImages(data.images)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load images')
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  const hasMore = images.length === LIMIT

  return { images, page, setPage, loading, error, hasMore, refetch: fetchImages }
}
