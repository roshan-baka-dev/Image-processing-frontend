import { useState } from 'react'
import { transformImage } from '../api/images'

export default function TransformPanel({ imageId, onTransformed }) {
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [fit, setFit] = useState('cover')
  const [rotate, setRotate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleTransform = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const transformations = {}
    if (width || height) {
      transformations.resize = {
        ...(width && { width: parseInt(width) }),
        ...(height && { height: parseInt(height) }),
        fit,
      }
    }
    if (rotate) {
      transformations.rotate = parseInt(rotate)
    }

    if (Object.keys(transformations).length === 0) {
      setError('Specify at least one transformation')
      setLoading(false)
      return
    }

    try {
      const { data } = await transformImage(imageId, transformations)
      onTransformed(data.imageUrl?.url || data.imageUrl)
    } catch (err) {
      setError(err.response?.data?.message || 'Transform failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleTransform} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">Transform Image</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Width (px)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="e.g. 800"
            min="1"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Height (px)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 600"
            min="1"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Fit</label>
          <select
            value={fit}
            onChange={(e) => setFit(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
            <option value="fill">Fill</option>
            <option value="inside">Inside</option>
            <option value="outside">Outside</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Rotate (degrees)</label>
          <input
            type="number"
            value={rotate}
            onChange={(e) => setRotate(e.target.value)}
            placeholder="e.g. 90"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 disabled:opacity-50 transition-colors cursor-pointer"
      >
        {loading ? 'Transforming...' : 'Apply Transform'}
      </button>
    </form>
  )
}
