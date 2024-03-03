import { Hono } from 'hono'
import axios from 'axios'

const app = new Hono()
const flixquestBaseUrl = "https://flixquest-api.vercel.app";

//* INTRODUCTION
var welcomeMessage = "Welcome to FlixQuest route! Use /movie and /tv to explore movie and tv series streaming endpoint";
app.get("/", (c) => {
    return c.text(welcomeMessage)
})

//* MOVIES
app.get("/movie", (c) => {
    return c.text('/movie/:tmdbId/:provider - get streaming links for a movie, provider should be either `showbox` or `vidsrcto`');
})

//* GET STREAMING LINKS FOR MOVIE
app.get("/movie/:tmdbId/:provider", async (c)=>{
    var provider = c.req.param("provider");
    var tmdbId = c.req.param("tmdbId");
    var result = await axios.get(`${flixquestBaseUrl}/${provider}/watch-movie?tmdbId=${tmdbId}&proxied=false`);
    return c.json(result.data)    
})


//* TV SERIES
app.get("/tv", (c) => {
    return c.text('/tv/:tmdbId/:season/:episode/:provider - get streaming links for an episode, provider should be either `showbox` or `vidsrcto`')
})

//* GET STREAMING LINKS FOR AN EPISODE
app.get("/tv/:tmdbId/:season/:episode/:provider", async(c)=>{
    var tmdbId = c.req.param("tmdbId");
    var season = c.req.param("season");
    var episode = c.req.param("episode");
    var provider = c.req.param("provider");
    var result = await axios.get(`${flixquestBaseUrl}/${provider}/watch-tv?tmdbId=${tmdbId}&season=${season}&episode=${episode}&proxied=false`);
    return c.json(result.data)   
})

export default app;