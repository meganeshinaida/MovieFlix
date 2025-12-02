export const TMDB_CONFIG ={
    // No trailing slash here — we'll add the leading slash when building endpoints
    BASE_URL:'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers:{
        accept:'application/json',
        Authorization:`Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}
export const fetchMovies = async({query}:{query:string})=>{
// Build endpoint paths without double slashes
let endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`

// Prepare headers to pass to fetch (no undefined values)
const requestHeaders: Record<string,string> = { accept: TMDB_CONFIG.headers.accept }

// If Authorization was configured, include it in the headers
if (TMDB_CONFIG.headers.Authorization) {
    requestHeaders.Authorization = TMDB_CONFIG.headers.Authorization
}

// If you are using a v3 API key (plain key), append it as a query param instead of Authorization header
const useApiKeyQuery = TMDB_CONFIG.API_KEY && !TMDB_CONFIG.headers.Authorization
if (useApiKeyQuery) {
    const sep = endpoint.includes('?') ? '&' : '?'
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    endpoint = `${endpoint}${sep}api_key=${TMDB_CONFIG.API_KEY!}`
}

// Log the request endpoint and minimal headers to help debugging 404/401 issues
// (Remove or lower log level in production)
console.debug('[fetchMovies] endpoint:', endpoint)
console.debug('[fetchMovies] headers:', {
    accept: requestHeaders.accept,
    Authorization: requestHeaders.Authorization ? '***REDACTED***' : undefined,
})

const response = await fetch(endpoint,{
    method:'GET',
    headers:TMDB_CONFIG.headers,
    
})
if(!response.ok){
        throw new Error("Failed to fetch movies",response.statusText);
    }
    const data = await response.json()
    return data.results;
}


// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjJkMjczNzk0NWJkOWVhYTkxY2Q0NGYwMjQyNzlkNyIsIm5iZiI6MTc1NTA4MjE2MS4xODksInN1YiI6IjY4OWM2ZGIxNjViMzFlMzdjZjhlYmMxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fhDXyw6Wq_nvmlkMy1fOFxq7t3-BNxNmfF-eZG0PwO8'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));