import { Hono } from 'hono'
import axios from 'axios'

const app = new Hono()

//* INTRODUCTION
var welcomeMessage = "Welcome to Reddit's API route! Use /:subreddit/:listing?/:time?/:limit? to fetch public subreddit data. /:listings can be [new, hot, rising, best, random, top] and /:time can be [hour, day, week, month, year, all]";
app.get("/", (c) => {
    return c.text(welcomeMessage)
})

//* SUBREDDIT
app.get("/:subreddit/:listing?/:time?/:limit?", async (c) => {
    var subreddit = c.req.param("subreddit")
    var listing = c.req.param("listing") || "top" // [new, hot, rising, best, random, top]
    var time = c.req.param("time") || "week" // [hour, day, week, month, year, all]
    var limit = c.req.param("limit") || 20
    var result = await axios.get(`https://www.reddit.com/r/${subreddit}/${listing}.json?t=${time}&limit=${limit}`)
    var subredditContent = result.data
    return c.json(subredditContent)
})

export default app;




