import { Link } from 'react-router-dom'

export default function ImageCard({ image }) {
  return (
    <Link
      to={`/images/${image._id}`}
      className="group block overflow-hidden rounded-xl bg-slate-800 border border-slate-700 hover:border-indigo-500 transition-all hover:shadow-lg hover:shadow-indigo-500/10"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={image.url}
          alt="Uploaded image"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
    </Link>
  )
}
