import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { imageUrl } from '../api/tmdb';

function MovieCard({movie}){
  return(
    <Link to={`/film/${movie.id}`} className="group block min-w-0">
      <div className="aspect-[2/3] w-full overflow-hidden rounded-xl bg-zinc-900">
        <img src={imageUrl(movie.poster_path)} alt={movie.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"/>
      </div>
      <h3 className="mt-3 truncate font-semibold group-hover:text-cinema">{movie.title}</h3>
      <div className="mt-1 flex items-center justify-between text-sm text-zinc-400">
        <span>{movie.release_date?.slice(0, 4) || 'Tarix yoxdur'}</span>
        <span className="flex items-center gap-1 text-amber-400">
          <Star size={14} fill="currentColor" />
          {movie.vote_average?.toFixed(1)}
        </span>
      </div>
    </Link>
  )
}

export default MovieCard;