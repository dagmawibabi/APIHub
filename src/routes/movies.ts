// https://api.themoviedb.org/3/trending/" + type + "/" + time + "?api_key=//&page=1"; 
// var url = "https://api.themoviedb.org/3/movie/" + widget.movieObject["id"].toString() + "?api_key=38d6559cd7b9ccdd0dd57ccca36e49fb&language=en-US";

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

// Discover movies
app.get("/movies/discover/:lang?/:page", async (c)=>{
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var page = c.req.param("page") || 1
    var lang = c.req.param("lang") || "en-US"
    var result = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${MovieDBApiKey}&page=${page}&language=${lang}&include_video=false&sort_by=popularity.desc`)
    return c.json(result.data)    
})

// Trending movies
app.get("/movies/trending/:lang?/:page", async (c) => {
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var page = c.req.param("page") || 1
    var lang = c.req.param("lang") || "en-US"
    var result = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${MovieDBApiKey}&page=${page}&language=${lang}`)
    return c.json(result.data)
})

// Top rated movies
app.get("/movies/top-rated/:lang?/:page", async (c) => {
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var page = c.req.param("page") || 1
    var lang = c.req.param("lang") || "en-US"
    var result = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${MovieDBApiKey}&page=${page}&language=${lang}`)
    return c.json(result.data)
})

// Movie details 
app.get("/movies/details/:lang?/:movie_id", async (c) => {
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var movie_id = c.req.param("movie_id")
    var lang = c.req.param("lang") || "en-US"
    var result = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${MovieDBApiKey}&language=${lang}`)
    return c.json(result.data)
})

// Search movie
app.get("/movies/search/:lang?/:title/:year?/:page", async (c) => {
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var title = c.req.param("title")
    var year = c.req.param("year") || ""
    var lang = c.req.param("lang") || "en-US"
    var page = c.req.param("page")
    var result = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${title}&language=${lang}&primary_release_year=${year}&page=${page}&api_key=${MovieDBApiKey}`)
    return c.json(result.data)
})

//* TV SERIES
app.get("/tv", (c) => {
    return c.text('/tv/:id - tv details, /tv/:page - discover tv shows, /tv/trending - trending tv shows , /tv/top-rated - top-rated tv shows')
})

// Discover TV
app.get("/tv/discover/:lang?/:page", async(c)=>{
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var page = c.req.param("page") || 1
    var lang = c.req.param("lang") || "en-US"
    var result = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${MovieDBApiKey}&page=${page}&language=${lang}&include_video=false&sort_by=popularity.desc`)
    return c.json(result.data)   
})

// Trending TV
app.get("/tv/trending/:lang?/:page", async (c) => {
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var page = c.req.param("page") || 1
    var lang = c.req.param("lang") || "en-US"
    var result = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${MovieDBApiKey}&page=${page}&language=${lang}`)
    return c.json(result.data)
})

// Top-rated TV
app.get("/tv/top-rated/:lang?/:page", async (c) => {
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var page = c.req.param("page") || 1
    var lang = c.req.param("lang") || "en-US"
    var result = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${MovieDBApiKey}&page=${page}&language=${lang}`)
    return c.json(result.data)
})

// TV detail 
app.get("/tv/details/:id", async (c) => {
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var id = c.req.param("id")
    var result = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${MovieDBApiKey}`)
    return c.json(result.data)
})

// TV season detail
app.get("/tv/details/:id/season/:season_number", async (c) => {
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var series_id = c.req.param("id")
    var season_number = c.req.param("season_number")
    var result = await axios.get(`https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}?api_key=${MovieDBApiKey}`)
    return c.json(result.data)
})

// Episode detail
app.get("/tv/details/:id/season/:season_number/episode/:episode_number", async (c) => {
    var MovieDBApiKey = process.env.MOVIEDBAPIKEY
    var series_id = c.req.param("id")
    var season_number = c.req.param("season_number")
    var episode_number = c.req.param("episode_number") || 1
    var result = await axios.get(`https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}/episode/${episode_number}?api_key=${MovieDBApiKey}`)
    return c.json(result.data)
})


// https://api.themoviedb.org/3/search/movie?___&language=en-US&page=1


// app.get("/tv/:id", async (c) => {
//     var MovieDBApiKey = process.env.MOVIEDBAPIKEY
//     var id = c.req.param("id")
//     var result = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${MovieDBApiKey}`)
//     return c.json(result.data)
// })
// 


// 


// app.get("/trending/movies", async (c) => {
//     var NewsAPIKey = process.env.NEWSAPIKEY
//     var term = c.req.param("term")
//     var today = moment()
//     var dateObject = moment(today);
//     var sevenDaysAgo = dateObject.subtract(7, 'days');
//     var sort = "popularity" || "publishedAt"
//     var result = await axios.get(`https://newsapi.org/v2/everything?q=${term}&from=${sevenDaysAgo.year()}-${(sevenDaysAgo.month() + 1).toString().padStart(2,"0")}-${sevenDaysAgo.date().toString().padStart(2,"0")}&sortBy=${sort}&apiKey=${NewsAPIKey}`)
//     var headlines = result.data
//     return c.json(headlines)
// })

// app.get("/shows/trending", async (c) => {
//     var NewsAPIKey = process.env.NEWSAPIKEY
//     var term = c.req.param("term")
//     var today = moment()
//     var dateObject = moment(today);
//     var sevenDaysAgo = dateObject.subtract(7, 'days');
//     var sort = "popularity" || "publishedAt"
//     var result = await axios.get(`https://newsapi.org/v2/everything?q=${term}&from=${sevenDaysAgo.year()}-${(sevenDaysAgo.month() + 1).toString().padStart(2,"0")}-${sevenDaysAgo.date().toString().padStart(2,"0")}&sortBy=${sort}&apiKey=${NewsAPIKey}`)
//     var headlines = result.data
//     return c.json(headlines)
// })

// app.get("/movies/:term", async (c) => {
//     var NewsAPIKey = process.env.NEWSAPIKEY
//     var term = c.req.param("term")
//     var today = moment()
//     var dateObject = moment(today);
//     var sevenDaysAgo = dateObject.subtract(7, 'days');
//     var sort = "popularity" || "publishedAt"
//     var result = await axios.get(`https://newsapi.org/v2/everything?q=${term}&from=${sevenDaysAgo.year()}-${(sevenDaysAgo.month() + 1).toString().padStart(2,"0")}-${sevenDaysAgo.date().toString().padStart(2,"0")}&sortBy=${sort}&apiKey=${NewsAPIKey}`)
//     var headlines = result.data
//     return c.json(headlines)
// })

// //* HEADLINES
// app.get("/headlines", (c) => {
//     var response = "/news/headlines/:category?/:country? route fetches all headlines in the searched country in the specified category."
//     return c.json(response);
// })

// app.get("/headlines/:category?/:country?", async (c) => {
//     var NewsAPIKey = process.env.NEWSAPIKEY
//     var country = c.req.param("country") || "us" // 2-letter ISO 3166-1 code of the country [ae, ar, at, au, be, bg, br, ca, ch, cn, co, cu, cz, de, eg, fr, gb, gr, hk, hu, id, ie, il, in, it, jp, kr, lt, lv, ma, mx, my, ng, nl, no, nz, ph, pl, pt, ro, rs, ru, sa, se, sg, si, sk, th, tr, tw, ua, us, ve, za]
//     var category = c.req.param("category") || "technology" // [general, business, entertainment, health, science, sports, technology]
//     var result = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${NewsAPIKey}`)
//     var headlines = result.data
//     return c.json(headlines)
// })


export default app;