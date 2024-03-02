import { Hono } from 'hono'
import axios from 'axios'

const app = new Hono()

//* INTRODUCTION
var welcomeMessage = "Welcome to The Movie DB route! Use /movies and /tv to explore movie and tv series endpoint";
app.get("/", (c) => {
    return c.text(welcomeMessage)
})

//* MOVIES
app.get("/movies", (c) => {
    return c.text('/movies/:page - discover movies, /movies/trending - trending movies , /movies/top-rated - top-rated movies')
})

//* DISCOVER MOVIES
app.get("/movies/discover/:page", async (c)=>{
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var page = c.req.param("page")
    var result = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${MovieDBApiKey}&page=${page}&include_video=false&sort_by=popularity.desc`)
    return c.json(result.data)    
})

//* SEARCH MOVIES
app.get("/movies/search/:title/:year?/:page?", async (c) => {
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var title = c.req.param("title")
    var year = c.req.param("year") || ""
    var page = c.req.param("page") || 1
    var result = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${title}&primary_release_year=${year}&page=${page}&api_key=${MovieDBApiKey}`)
    return c.json(result.data)
})

//* MOVIE DETAILS
app.get("/movies/details/:movie_id", async (c) => {
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var movie_id = c.req.param("movie_id")
    var result = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${MovieDBApiKey}`)
    return c.json(result.data)
})

//* TRENDING MOVIES
app.get("/movies/trending/:page?", async (c) => {
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var page = c.req.param("page") || 1
    var result = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${MovieDBApiKey}&page=${page}`)
    return c.json(result.data)
})

//* TOP RATED MOVIES
app.get("/movies/top-rated/:page?", async (c) => {
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var page = c.req.param("page") || 1
    var result = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${MovieDBApiKey}&page=${page}`)
    return c.json(result.data)
})

//* TV SERIES
app.get("/tv", (c) => {
    return c.text('/tv/:id - tv details, /tv/:page - discover tv shows, /tv/trending - trending tv shows , /tv/top-rated - top-rated tv shows')
})

//* DISCOVER TV
app.get("/tv/discover/:page?", async(c)=>{
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var page = c.req.param("page") || 1
    var result = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${MovieDBApiKey}&page=${page}&include_video=false&sort_by=popularity.desc`)
    return c.json(result.data)   
})

//* SEARCH TV
app.get("/tv/search/:title/:year?/:page", async (c) => {
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var title = c.req.param("title")
    var year = c.req.param("year") || ""
    var page = c.req.param("page")
    var result = await axios.get(`https://api.themoviedb.org/3/search/tv?query=${title}&year=${year}&page=${page}&api_key=${MovieDBApiKey}`)
    return c.json(result.data)
})

//* TV DETAIL 
app.get("/tv/details/:id", async (c) => {
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var id = c.req.param("id")
    var result = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${MovieDBApiKey}`)
    return c.json(result.data)
})

//* TV SEASON DETAIL
app.get("/tv/details/:id/season/:season_number", async (c) => {
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var series_id = c.req.param("id")
    var season_number = c.req.param("season_number")
    var result = await axios.get(`https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}?api_key=${MovieDBApiKey}`)
    return c.json(result.data)
})

//* EPISODE DETAIL
app.get("/tv/details/:id/season/:season_number/episode/:episode_number?", async (c) => {
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var series_id = c.req.param("id")
    var season_number = c.req.param("season_number")
    var episode_number = c.req.param("episode_number") || 1
    var result = await axios.get(`https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}/episode/${episode_number}?api_key=${MovieDBApiKey}`)
    return c.json(result.data)
})

//* TRENDING TV
app.get("/tv/trending/:page?", async (c) => {
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var page = c.req.param("page") || 1
    var result = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${MovieDBApiKey}&page=${page}`)
    return c.json(result.data)
})

//* TOP-RATED TV
app.get("/tv/top-rated/:page?", async (c) => {
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var page = c.req.param("page") || 1
    var result = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${MovieDBApiKey}&page=${page}`)
    return c.json(result.data)
})

//* FUTURE: ADD HELPER FUNCTIONS TO EASE GETTING ID AND MORE DETAILS

export default app;