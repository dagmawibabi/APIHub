import { serve } from '@hono/node-server'
import { Hono } from 'hono'
require('dotenv').config()

//* APP
const app = new Hono()

//* INTRODUCTION
app.get('/', (c) => {
  return c.text('Welcome to Free APIs!')
})

//* ROUTES 
import github from "./routes/github"
import weather from "./routes/weather"
import hackerNews from "./routes/hackernews"
import crypto from "./routes/crypto"
import apotd from "./routes/apotd"
import mealDB from "./routes/mealdb"
import googleBooks from "./routes/googlebooks"
import reddit from "./routes/reddit"
import news from "./routes/news"
import movieDB from "./routes/moviedb"
import flixquest from "./routes/flixquest";
import lyrics from "./routes/lyrics";
import jsonplaceholder from "./routes/jsonplaceholder";
import bible from "./routes/bible";
import restcountries from "./routes/restcountries";
import newyorktimes from "./routes/newyorktimes";

//* ENDPOINTS
app.route('/github', github) // GitHub
app.route('/weather', weather) // Weather
app.route('/hackernews', hackerNews) // Hacker News
app.route('/crypto', crypto) // Crypto
app.route('/apotd', apotd) // APOTD
app.route('/mealdb', mealDB) // MealDB
app.route('/googlebooks', googleBooks) // Google Books
app.route('/reddit', reddit) // Reddit
app.route('/news', news) // NewsAPI
app.route('/moviedb', movieDB) // TheMovieDB
app.route('/flixquest', flixquest) // FlixQuest
app.route('/lyrics', lyrics) // Lyrics
app.route('/jsonplaceholder', jsonplaceholder) // JSON Placeholder
app.route('/bible',bible) // Bible
app.route('/restcountries', restcountries) // REST Countries
app.route("/nytimes", newyorktimes) // New York Times


//* ERROR HANDLING
app.onError((err, c) => {
  console.error(`${err}`)
  return c.json(err.message)
})

//* PORT
var port = Number.parseInt(process.env.PORT!) || 7000;
console.log(`Server is running on port ${port}`)

//* SERVER
serve({
  fetch: app.fetch,
  port
})

export default app;