import { Hono } from 'hono'
import axios from 'axios'

const app = new Hono()

//* INTRODUCTION
var welcomeMessage = `Welcome to the Rest Countries service! Use the following endpoints to access country data: 
- Fetch all countries: /all 
- Fetch a country by name: /:name 
- Fetch a country by code: /code/:code 
- Fetch a list of countries by codes: /codes/:codes 
- Fetch countries by currency: /currency/:currency 
- Fetch countries by language: /language/:language 
- Fetch countries by capital city: /capital/:capital 
- Fetch countries by region: /region/:region 
- Fetch countries by subregion: /subregion/:subregion`;
app.get("/", (c) => {
    return c.text(welcomeMessage)
})

//* FETCH COUNTRIES ALL
app.get("/all", async (c) => {
    var result = await axios.get(`https://restcountries.com/v3.1/all`)
    var countries = result.data
    return c.json(countries)
})

//* FETCH COUNTRIEs BY NAME
app.get("/:name", async (c) => {
    var name = c.req.param("name")
    var result = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
    var country = result.data
    return c.json(country)
})

//* FETCH COUNTRIES BY CODE
app.get("/code/:code", async (c) => {
    var code = c.req.param("code")
    var result = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`)
    var country = result.data
    return c.json(country)
})

//* FETCH COUNTRIES LIST BY CODES
app.get("/codes/:codes", async (c) => {
    var codes = c.req.param("codes")
    var result = await axios.get(`https://restcountries.com/v3.1/alpha?codes=${codes}`)
    var countries = result.data
    return c.json(countries)
})

//* FETCH COUNTRIES BY CURRENCY
app.get("/currency/:currency", async (c) => {
    var currency = c.req.param("currency")
    var result = await axios.get(`https://restcountries.com/v3.1/currency/${currency}`)
    var countries = result.data
    return c.json(countries)
})

//* FETCH COUNTRIES BY LANGUAGE
app.get("/language/:language", async (c) => {
    var language = c.req.param("language")
    var result = await axios.get(`https://restcountries.com/v3.1/lang/${language}`)
    var countries = result.data
    return c.json(countries)
})

//* FETCH COUNTRIES BY CAPITAL CITY
app.get("/capital/:capital", async (c) => {
    var capital = c.req.param("capital")
    var result = await axios.get(`https://restcountries.com/v3.1/capital/${capital}`)
    var countries = result.data
    return c.json(countries)
})

//* FETCH COUNTRIES BY REGION
app.get("/region/:region", async (c) => {
    var region = c.req.param("region")
    var result = await axios.get(`https://restcountries.com/v3.1/region/${region}`)
    var countries = result.data
    return c.json(countries)
})

//* FETCH COUNTRIES BY SUBREGIONS
app.get("/subregion/:subregion", async (c) => {
    var subregion = c.req.param("subregion")
    var result = await axios.get(`https://restcountries.com/v3.1/subregion/${subregion}`)
    var countries = result.data
    return c.json(countries)
})

export default app;
