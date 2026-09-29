import { useEffect, useState } from 'react';
import { Play, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFilteredMovies, getGenres, getMovie, getPopularMovies, getTopRatedMovies, imageUrl, searchMovies } from '../api/tmdb';
import ErrorMessage from '../components/ErrorMessage';
import FilterPanel from '../components/FilterPanel';
import Loader from '../components/Loader';
import MovieCard from '../components/MovieCard';

function Home(){
  const [popular, setPopular] = useState([])
  const [topRated, setTopRated] = useState([])
  const [shownMovies, setShownMovies] = useState(null)
  const [resultTitle, setResultTitle] = useState('')
  const [genres, setGenres] = useState([])
  const [heroOverview, setHeroOverview] = useState('')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(()=>{
    const load = async ()=>{
      setLoading(true)
      setError(false)
      try{
        const [popularResponse, topRatedResponse, genresResponse] = await Promise.all([
          getPopularMovies(), getTopRatedMovies(), getGenres()])
        setPopular(popularResponse.data.results)
        setTopRated(topRatedResponse.data.results)
        setGenres(genresResponse.data.genres)
        const heroResponse = await getMovie(popularResponse.data.results[0].id)
        setHeroOverview(heroResponse.data.overview)
      }catch{setError(true)
      }finally{setLoading(false)}
    }
    load()
  },[])

  useEffect(()=>{
    const searchText = query.trim()
    if(!searchText) return
    let cancelled = false
    const timer = setTimeout(()=>{
      setLoading(true)
      setError(false)
      searchMovies(searchText)
        .then((response)=>{
          if(cancelled) return
          setShownMovies(response.data.results)
          setResultTitle(`“${searchText}” üçün nəticələr`)
        })
        .catch(()=>!cancelled && setError(true))
        .finally(()=>!cancelled && setLoading(false))
    },450)
    return ()=>{
      cancelled = true
      clearTimeout(timer)
    }},[query])

  const handleQuery = (value)=>{
    setQuery(value)
    if(!value.trim()) {
      setShownMovies(null)
      setResultTitle('')
      setLoading(false)
    }
  }

  const applyFilters = async (filters)=>{
    setQuery('')
    setLoading(true)
    setError(false)
    try{
      const response = await getFilteredMovies(filters)
      setShownMovies(response.data.results)
      const genre = genres.find((item)=>String(item.id) === filters.genreId)
      setResultTitle(genre ? `${genre.name} filmləri` : 'Filtrlənmiş filmlər')
    }catch{setError(true)
    }finally{setLoading(false)}
  }

  const clearFilters = ()=>{
    setQuery('')
    setShownMovies(null)
    setResultTitle('')
    setError(false)
  }

  if(loading && popular.length === 0) return <div className="pt-24"><Loader /></div>
  if(error && popular.length === 0) return <div className="px-5 pt-24"><ErrorMessage err={()=>window.location.reload()} /></div>

  const heroMovie = popular[0]
  const movies = shownMovies ?? popular

  return(
    <main>
      {heroMovie&&(
        <section className="relative flex min-h-[620px] items-end bg-cover bg-center pb-16 pt-12 sm:min-h-[680px] sm:pb-20 sm:pt-32"
          style={{backgroundImage: `url(${imageUrl(heroMovie.backdrop_path,'original')})`}}>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-black/30" />
          <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
            <span className="rounded-full bg-cinema px-3 py-1 text-xs font-bold tracking-wider">POPULYAR FİLM</span>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold sm:text-6xl">{heroMovie.title}</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
              {heroOverview || heroMovie.overview || 'Bu film haqqında açıqlama mövcud deyil.'}
            </p>
            <Link to={`/film/${heroMovie.id}`} className="mt-7 inline-flex items-center gap-2 rounded-lg bg-cinema px-6 py-3 font-bold hover:bg-red-700">
              <Play size={19} fill="currentColor" /> Ətraflı bax
            </Link>
          </div>
        </section>
      )}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="mb-12 max-w-5xl">
          <FilterPanel genres={genres} onApply={applyFilters} onClear={clearFilters}>
            <div className="relative min-w-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
              <input value={query} onChange={(event)=>handleQuery(event.target.value)} placeholder="Film adını yaz..."
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-4 pl-12 pr-4 outline-none focus:border-cinema" />
            </div>
          </FilterPanel>
        </div>
        {error ? <ErrorMessage /> : loading ? <Loader /> : (
          <>
            <MovieList title={resultTitle || 'Populyar filmlər'} movies={movies} />
            {!shownMovies && <MovieList title="Yüksək qiymətləndirilənlər" movies={topRated.slice(0, 10)} />}
          </>
        )}
      </section>
    </main>
  )
}

function MovieList({title, movies}){
  return(
    <section className="mb-14">
      <h2 className="mb-6 text-2xl font-bold sm:text-3xl">{title}</h2>
      {movies.length === 0 ? (
        <p className="rounded-xl bg-zinc-900 p-8 text-center text-zinc-400">Heç bir film tapılmadı.</p>
      ) : (
        <div className="-mx-2 flex flex-wrap">
          {movies.slice(0, 10).map((movie) => (
            <div key={movie.id} className="w-1/2 px-2 pb-8 sm:w-1/3 md:w-1/4 lg:w-1/5">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Home;