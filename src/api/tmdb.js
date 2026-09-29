import axios from 'axios';

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`}
})

export const imageUrl=(path, size='w500')=>{
  if(!path) return 'https://placehold.co/500x750/18181b/a1a1aa?text=Sekil+yoxdur'
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export const getPopularMovies=()=>
  tmdb.get('/movie/popular', {params:{language: 'en-US', page: 1}})

export const getTopRatedMovies=()=>
  tmdb.get('/movie/top_rated', {params:{language: 'en-US', page: 1}})

export const searchMovies=(query)=>
  tmdb.get('/search/movie', {params:{query,language: 'en-US',include_adult: false}})

export const getGenres=()=>
  tmdb.get('/genre/movie/list', {params:{language: 'en-US'}})

export const getMoviesByGenre=(genreId)=>tmdb.get('/discover/movie',{
  params:{
      language: 'en-US', with_genres: genreId,
      sort_by: 'popularity.desc', include_adult: false
    }
  })

export const getFilteredMovies=({genreId, yearMin, yearMax, ratingMin, ratingMax})=>
  tmdb.get('/discover/movie',{
    params:{
      language: 'en-US',
      with_genres: genreId || undefined,
      'primary_release_date.gte': yearMin ? `${yearMin}-01-01` : undefined,
      'primary_release_date.lte': yearMax ? `${yearMax}-12-31` : undefined,
      'vote_average.gte': ratingMin || undefined,
      'vote_average.lte': ratingMax || undefined,
      'vote_count.gte': ratingMin || ratingMax ? 50 : undefined,
      sort_by: 'popularity.desc',
      include_adult: false
    }
  })

export const getMovie= async (id)=>{
  const [azResponse, trResponse, enResponse]=await Promise.all([
    tmdb.get(`/movie/${id}`, {params:{language: 'az-AZ'}}),
    tmdb.get(`/movie/${id}`, {params:{language: 'tr-TR'}}),
    tmdb.get(`/movie/${id}`, {params:{language: 'en-US',append_to_response: 'credits'}})
  ])

  return{
    data:{...enResponse.data,
      overview: azResponse.data.overview || trResponse.data.overview || enResponse.data.overview
    }
  }
}

export const getMovieMedia= async (id)=>{
  const [videosResponse, imagesResponse]= await Promise.all([
    tmdb.get(`/movie/${id}/videos`, {params:{include_video_language: 'tr,en'}}),
    tmdb.get(`/movie/${id}/images`)
  ])

  const trailers = videosResponse.data.results.filter(
    (video)=>video.type === 'Trailer' && video.site === 'YouTube')

  const trailer = trailers.find((video)=>video.iso_639_1 === 'tr') || 
        trailers.find((video)=>video.iso_639_1 === 'en') || trailers[0]

  return {trailer,images: imagesResponse.data.backdrops.slice(0, 6)}}