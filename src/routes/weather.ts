import { Hono } from 'hono'
import axios from 'axios'

const app = new Hono()

//* INTRODUCTION
var welcomeMessage = "Welcome to Weather API route!";
app.get("/", (c) => {
    return c.text(welcomeMessage)
})

//* FORECAST 
app.get("/forecast", (c) => {
    var response = "/weather/forecast/:location/:numberOfDays route fetches weather forecast information of the specified location. AND /weather/forecast/:latitude/:longitude route can be used to get weather informaton on specific locations."
    return c.json(response);
})
app.get("/forecast/:location/:numberOfDays", async (c) => {
    var location = c.req.param("location")
    var numberOfDays = c.req.param("numberOfDays")
    var weatherAPI = process.env.WEATHERAPI
    var result = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${weatherAPI}&q=${location}&days=${numberOfDays}&aqi=yes&alerts=no`)
    var forecast = result.data
    return c.json(forecast)
})
app.get("/forecast/:latitude/:longitude", async (c) => {
    var latitude = c.req.param("latitude")
    var longitude = c.req.param("longitude")
    var weatherAPI = process.env.WEATHERAPI
    var result = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${weatherAPI}&q=${latitude},${longitude}&aqi=yes`)
    var forecast = result.data
    return c.json(forecast)
})

//* SEARCH 
app.get("/search", (c) => {
    var response = "/weather/search/:location route searchs for the chosen location's weather data."
    return c.json(response);
})
app.get("/search/:location", async (c) => {
    var location = c.req.param("location")
    var weatherAPI = process.env.WEATHERAPI;
    var result = await axios.get(`https://api.weatherapi.com/v1/search.json?key=${weatherAPI}&q=${location}`)
    var searchResult = result.data
    return c.json(searchResult)
})

export default app;



