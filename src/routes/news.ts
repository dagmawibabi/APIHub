import { Hono } from 'hono'
import axios from 'axios'
import moment from 'moment'

const app = new Hono()

//* INTRODUCTION
var welcomeMessage = "Welcome to NewsAPI route! Use /search to search for news.";
app.get("/", (c) => {
    return c.text(welcomeMessage)
})

//* SEARCH
app.get("/search", (c) => {
    var response = "/news/search/:term route fetches all articles mentioning the searched term."
    return c.json(response);
})
app.get("/search/:term", async (c) => {
    var NewsAPIKey = process.env.NEWSAPIKEY
    var term = c.req.param("term")
    var today = moment()
    var dateObject = moment(today);
    var sevenDaysAgo = dateObject.subtract(7, 'days');
    var sort = "popularity" || "publishedAt"
    var result = await axios.get(`https://newsapi.org/v2/everything?q=${term}&from=${sevenDaysAgo.year()}-${(sevenDaysAgo.month() + 1).toString().padStart(2,"0")}-${sevenDaysAgo.date().toString().padStart(2,"0")}&sortBy=${sort}&apiKey=${NewsAPIKey}`)
    var headlines = result.data
    return c.json(headlines)
})

//* HEADLINES
app.get("/headlines", (c) => {
    var response = "/news/headlines/:category?/:country? route fetches all headlines in the searched country in the specified category."
    return c.json(response);
})
app.get("/headlines/:category?/:country?", async (c) => {
    var NewsAPIKey = process.env.NEWSAPIKEY
    var country = c.req.param("country") || "us" // 2-letter ISO 3166-1 code of the country [ae, ar, at, au, be, bg, br, ca, ch, cn, co, cu, cz, de, eg, fr, gb, gr, hk, hu, id, ie, il, in, it, jp, kr, lt, lv, ma, mx, my, ng, nl, no, nz, ph, pl, pt, ro, rs, ru, sa, se, sg, si, sk, th, tr, tw, ua, us, ve, za]
    var category = c.req.param("category") || "technology" // [general, business, entertainment, health, science, sports, technology]
    var result = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${NewsAPIKey}`)
    var headlines = result.data
    return c.json(headlines)
})

export default app;
