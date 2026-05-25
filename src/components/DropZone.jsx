import { useState, useRef } from 'react'
import { uploadImage } from '../api/images'

export default function DropZone({ onUploadComplete }) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleUpload = async (file) => {
    if (!file) return
    setUploading(true)
    setProgress(0)
    setError(null)
    try {
      await uploadImage(file, (e) => {
        if (e.total) setProgress(Math.round((e.loaded / e.total) * 100))
      })
      onUploadComplete()
    } catch (err) {
      const resp = err?.response?.data
      if (resp?.isBlocked) {
        setError(resp.message || 'Upload blocked: explicit content detected')
      } else {
        setError(resp?.message || 'Upload failed')
      }
    } finally {
      setUploading(false)
      setProgress(0)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    handleUpload(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setDragging(false)}
      onClick={() => fileInputRef.current?.click()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
        dragging
          ? 'border-indigo-500 bg-indigo-500/10'
          : 'border-slate-600 hover:border-slate-500 bg-slate-800/50'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleUpload(e.target.files[0])}
      />

      {uploading ? (
        <div className="space-y-3">
          <p className="text-slate-300">Uploading... {progress}%</p>
          <div className="w-full bg-slate-700 rounded-full h-2 max-w-xs mx-auto">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <div>
          <svg className="mx-auto h-12 w-12 text-slate-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16v-8m0 0l-3 3m3-3l3 3M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1" />
          </svg>
          <p className="text-slate-300">Drop an image here or click to upload</p>
          <p className="text-slate-500 text-sm mt-1">PNG, JPG, GIF, WebP</p>
        </div>
      )}

      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
    </div>
  )
}
