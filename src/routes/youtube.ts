import { Hono } from 'hono'
import axios from 'axios'

const app = new Hono()

//* INTRODUCTION
var welcomeMessage = "Welcome to youtube's API route! Use /search to search for youtube videos.";
app.get("/", (c) => {
    return c.text(welcomeMessage)
})

//* SEARCH
app.get("/search", (c) => {
    var response = "/youtube/search/:videotitle route fetches all results mentioning the searched youtube video."
    return c.json(response);
})
app.get("/search/:videotitle", async (c) => {
    var youtubeAPI = process.env.YOUTUBEAPIKEY
    var video = c.req.param("videotitle")
    var result = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${youtubeAPI}&type=video&part=snippet&q=${video}`)
    var videos = result.data
    return c.json(videos)
})

export default app;