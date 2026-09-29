import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Clock, Images, Play, Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getMovie, getMovieMedia, getMoviesByGenre, imageUrl } from '../api/tmdb';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import MovieCard from '../components/MovieCard';

function MovieDetail(){
  const {id} = useParams()
  const [movie, setMovie] = useState(null)
  const [relatedMovies, setRelatedMovies] = useState([])
  const [trailer, setTrailer] = useState(null)
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(()=>{
    const load = async ()=>{
      setLoading(true)
      setError(false)
      try{
        const response = await getMovie(id)
        setMovie(response.data)
        setTrailer(null)
        setGallery([])
        try{
          const media = await getMovieMedia(id)
          setTrailer(media.trailer)
          setGallery(media.images)
        }catch{ }
        try{
          const relatedResponse = await getMoviesByGenre(response.data.genres[0].id)
          setRelatedMovies(relatedResponse.data.results.filter((item) => String(item.id) !== id))
        }catch{ }
      }catch{ setError(true)
      }finally{ setLoading(false) }
    }
    load()
  },[id])

  if(error) return <div className="px-5 pt-28"><ErrorMessage err={()=>window.location.reload()} /></div>
  if(loading || String(movie?.id) !== id) return <div className="pt-28"><Loader /></div>

  const director = movie.credits?.crew.find((person)=>person.job === 'Director')

  return(
    <main className="relative min-h-screen bg-cover bg-center pb-16 pt-8 sm:pt-28 md:bg-fixed"
      style={{ backgroundImage: `url(${imageUrl(movie.backdrop_path, 'original')})` }}>
      <div className="absolute inset-0 bg-black/90 md:bg-black/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-black/60" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-5 lg:px-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white sm:mb-8 sm:text-base">
          <ArrowLeft size={20} /> Filmlərə qayıt
        </Link>
        <div className="flex items-start gap-4 sm:gap-7 lg:gap-14">
          <div className="shrink-0">
            <img src={imageUrl(movie.poster_path)} alt={movie.title}
              className="w-[108px] rounded-xl shadow-2xl sm:w-[180px] md:w-[240px] md:rounded-2xl lg:w-[280px]" />
            <div className="mt-4 hidden flex-col gap-3 md:flex">
              <a href="#trailer"
                className="flex items-center justify-center gap-2 rounded-xl bg-cinema px-4 py-3 font-semibold transition hover:bg-red-700">
                <Play size={18} fill="currentColor" /> Treylerə bax
              </a>
              {gallery.length > 0 && (
                <a href="#gallery"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-black/30 px-4 py-3 font-semibold transition hover:border-cinema">
                  <Images size={18} /> Şəkillərə bax
                </a>
              )}
            </div>
          </div>
          <div className="min-w-0 flex-1 md:pt-2">
            <p className="text-xs font-semibold text-cinema sm:text-base">{movie.genres.map((genre)=>genre.name).join(' • ')}</p>
            <h1 className="mt-2 text-2xl font-extrabold leading-tight sm:mt-3 sm:text-4xl lg:text-5xl">{movie.title}</h1>
            {movie.tagline && <p className="mt-2 text-xs italic leading-5 text-zinc-400 sm:mt-3 sm:text-base lg:text-lg">"{movie.tagline}"</p>}
            <div className="mt-4 flex flex-col gap-2 text-xs text-zinc-300 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-5 sm:text-sm">
              <span className="flex items-center gap-2"><Star className="text-amber-400" size={19} fill="currentColor" /> {movie.vote_average.toFixed(1)}</span>
              <span className="flex items-center gap-2"><Calendar size={19} /> {movie.release_date || 'Tarix yoxdur'}</span>
              <span className="flex items-center gap-2"><Clock size={19} /> {movie.runtime} dəqiqə</span>
            </div>
            <MovieAbout movie={movie} director={director} className="mt-8 hidden md:block" />
          </div>
        </div>
        <MovieAbout movie={movie} director={director} className="mt-8 md:hidden" />
        <section id="trailer" className="mt-12 scroll-mt-24 border-t border-white/10 pt-8 sm:mt-16 sm:pt-12 md:mt-10">
          <h2 className="mb-7 text-2xl font-bold sm:text-3xl">Treyler</h2>
          {trailer ? (
            <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
              <iframe src={`https://www.youtube-nocookie.com/embed/${trailer.key}`} title={`${movie.title} treyleri`}
                className="h-full w-full" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
            </div>
          ) : (
            <p className="rounded-xl bg-zinc-900 p-6 text-zinc-400">Bu film üçün treyler tapılmadı.</p>
          )}
        </section>
        {gallery.length > 0 && (
          <section id="gallery" className="mt-12 scroll-mt-24 sm:mt-16">
            <h2 className="mb-7 text-2xl font-bold sm:text-3xl">Filmdən görüntülər</h2>
            <div className="-mx-2 flex flex-wrap">
              {gallery.map((image)=>(
                <div key={image.file_path} className="w-1/2 px-2 pb-4 lg:w-1/3">
                  <img src={imageUrl(image.file_path, 'w780')} alt={`${movie.title} filmindən görüntü`}
                    loading="lazy" className="aspect-video w-full rounded-xl object-cover"/>
                </div>
              ))}
            </div>
          </section>
        )}
        {relatedMovies.length > 0 && (
          <section className="mt-16 border-t border-white/10 pt-10 sm:mt-20 sm:pt-12">
            <h2 className="mb-7 text-2xl font-bold sm:text-3xl">Bunları da bəyənə bilərsən</h2>
            <div className="-mx-2 flex flex-wrap">
              {relatedMovies.slice(0, 5).map((item) => (
                <div key={item.id} className="w-1/2 px-2 pb-8 sm:w-1/3 md:w-1/5">
                  <MovieCard movie={item} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

function MovieAbout({movie, director, className}){
  return(
    <section className={`${className} rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-sm sm:p-7`}>
          <h2 className="text-xl font-bold sm:text-2xl">Film haqqında</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-300 sm:text-base">
            {movie.overview || 'Bu film haqqında Azərbaycan dilində açıqlama mövcud deyil.'}
          </p>
          <div className="-mx-2 mt-6 flex flex-wrap border-t border-white/10 pt-5 text-sm">
            <p className="w-full px-2 pb-4 sm:w-1/2"><span className="text-zinc-500">Rejissor:</span> {director?.name || 'Məlumat yoxdur'}</p>
            <p className="w-full px-2 pb-4 sm:w-1/2"><span className="text-zinc-500">Orijinal ad:</span> {movie.original_title}</p>
            <p className="w-full px-2 pb-4 sm:w-1/2"><span className="text-zinc-500">Status:</span> {movie.status}</p>
            <p className="w-full px-2 pb-4 sm:w-1/2"><span className="text-zinc-500">Dil:</span> {movie.original_language.toUpperCase()}</p>
          </div>
    </section>
  )
}

export default MovieDetail;