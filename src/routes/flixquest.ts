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
    return c.text('/movie/:tmdbID/:provider - get streaming links for a movie, provider should be either `showbox` or `vidsrcto`');
})

//* GET STREAMING LINKS FOR MOVIE
app.get("/movie/:tmdbID/:provider?", async (c)=>{
    var provider = c.req.param("provider") || "showbox"; // [showbox, vidsrcto]
    var tmdbID = c.req.param("tmdbID");
    var result = await axios.get(`${flixquestBaseUrl}/${provider}/watch-movie?tmdbId=${tmdbID}&proxied=false`);
    return c.json(result.data)    
})


//* TV SERIES
app.get("/tv", (c) => {
    return c.text('/tv/:tmdbID/:season/:episode/:provider - get streaming links for an episode, provider should be either `showbox` or `vidsrcto`')
})

//* GET STREAMING LINKS FOR AN EPISODE
app.get("/tv/:tmdbID/:season/:episode/:provider?", async(c)=>{
    var tmdbID = c.req.param("tmdbID");
    var season = c.req.param("season");
    var episode = c.req.param("episode");
    var provider = c.req.param("provider") || "showbox"; // [showbox, vidsrcto]
    var result = await axios.get(`${flixquestBaseUrl}/${provider}/watch-tv?tmdbId=${tmdbID}&season=${season}&episode=${episode}&proxied=false`);
    return c.json(result.data)   
})

export default app;