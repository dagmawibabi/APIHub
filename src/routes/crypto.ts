import { Hono } from 'hono'
import axios from 'axios'

const app = new Hono()

//* INTRODUCTION
var welcomeMessage = "Welcome to Crypto API route! Use /market to get current prices and general market information.";
app.get("/", (c) => {
    return c.text(welcomeMessage)
})

//* ALL MARKET INFORMATION
app.get("/market", async (c) => {
    var result = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`)
    var marketData = result.data
    return c.json(marketData)
})

export default app;








