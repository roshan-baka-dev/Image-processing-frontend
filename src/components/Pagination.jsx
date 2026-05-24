export default function Pagination({ page, onPageChange, hasMore }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-4 py-2 rounded-lg bg-slate-700 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors cursor-pointer"
      >
        Previous
      </button>
      <span className="text-slate-400">Page {page}</span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasMore}
        className="px-4 py-2 rounded-lg bg-slate-700 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors cursor-pointer"
      >
        Next
      </button>
    </div>
  )
}
