import { useImages } from '../hooks/useImages'
import ImageCard from '../components/ImageCard'
import Pagination from '../components/Pagination'
import DropZone from '../components/DropZone'

export default function DashboardPage() {
  const { images, page, setPage, loading, error, hasMore, refetch } = useImages()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-6">Your Images</h1>
        <DropZone onUploadComplete={refetch} />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg px-4 py-3 mb-6 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-20">
          <svg className="mx-auto h-16 w-16 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-slate-400 text-lg">No images yet</p>
          <p className="text-slate-500 text-sm mt-1">Upload your first image above</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <ImageCard key={image._id} image={image} />
            ))}
          </div>
          <Pagination page={page} onPageChange={setPage} hasMore={hasMore} />
        </>
      )}
    </div>
  )
}
