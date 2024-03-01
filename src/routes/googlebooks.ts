import { Hono } from 'hono'
import axios from 'axios'

const app = new Hono()

//* INTRODUCTION
var welcomeMessage = "Welcome to Google's Books API route! Use /search to search for books.";
app.get("/", (c) => {
    return c.text(welcomeMessage)
})

//* SEARCH
app.get("/search", (c) => {
    var response = "/googlebooks/search/:book route fetches all results mentioning the searched book."
    return c.json(response);
})
app.get("/search/:book", async (c) => {
    var book = c.req.param("book")
    var result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}`)
    var books = result.data
    return c.json(books)
})

export default app;

