import { Hono } from 'hono'
import axios from 'axios'

const app = new Hono()

//* INTRODUCTION
var welcomeMessage = "Welcome to the Lyrics route! Use /lyrics/:artist/:title to get the lyrics of a song by artist and title.";
app.get("/", (c) => {
    return c.text(welcomeMessage)
})

//* LYRICS
app.get("/lyrics/:artist/:title", async (c) => {
    var artist = c.req.param("artist")
    var title = c.req.param("title")
    var result = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    var lyrics = result.data
    return c.json(lyrics)
})

export default app;