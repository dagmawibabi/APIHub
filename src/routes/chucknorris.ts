import { Hono } from "hono";
import axios from "axios";

const app = new Hono();

//* INTRODUCTION
var welcomeMessage = `Welcome to the Chuck Norris API service! Use the following endpoints to access country data:
- Fetch a random joke: /jokes/random
- Fetch all joke categories: /jokes/categories
- Fetch a random joke by category: /jokes/random/:category
- Search for a joke: /jokes/search/:query`;

app.get("/", (c) => {
  return c.text(welcomeMessage);
});

//* RANDOM JOKE
app.get("/jokes/random", async (c) => {
  var result = await axios.get(`https://api.chucknorris.io/jokes/random`);
  var joke = result.data;
  return c.json(joke);
});

//* FETCH ALL CATEGORIES
app.get("/jokes/categories", async (c) => {
  var result = await axios.get(`https://api.chucknorris.io/jokes/categories`);
  var categories = result.data;
  return c.json(categories);
});

//* FETCH RANDOM JOKE BY CATEGORY
app.get("/jokes/random/:category", async (c) => {
  var category = c.req.param("category");
  var result = await axios.get(
    `https://api.chucknorris.io/jokes/random?category=${category}`
  );
  var joke = result.data;
  return c.json(joke);
});

//* SEARCH JOKE
app.get("/jokes/search/:query", async (c) => {
  var query = c.req.param("query");
  var result = await axios.get(
    `https://api.chucknorris.io/jokes/search?query=${query}`
  );
  var jokes = result.data;
  return c.json(jokes);
});

export default app;
