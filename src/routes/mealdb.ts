import { Hono } from 'hono'
import axios from 'axios'

// helpers
import { getMealObject, Meal  } from "../helpers/mealdb"

const app = new Hono()


//* INTRODUCTION
var welcomeMessage = "Welcome to GitHub API route!";
app.get("/", (c) => {
    return c.text(welcomeMessage)
})


//* Search 
app.get("/search", (c) => {
    var response = "/mealdb/search/:seqrchQuery route searchs and gives search result meals."
    return c.json(response);
})

app.get("/search/:searchQuery", async (c) => {
    var query = c.req.param("searchQuery")
    var searchResults = await axios.get(`https://themealdb.com/api/json/v1/1/search.php?s=${query}`)
    if(searchResults.data.meals){
        var meals = searchResults.data.meals.map((meal:Meal) =>{
            return getMealObject(meal)
        })
        return c.json(meals)
    } else {
        return c.json([])
    }
})


//* Find One Meal
app.get("/meal", (c) =>{
    var response = "/mealdb/meal/:mealId route will return a single meal"
    return c.json(response)
})

app.get("/meal/:mealId", async(c) =>{
    var mealId = c.req.param("mealId")
    var result = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    var resultMeal = result.data.meals
    if (resultMeal){
        return c.json(getMealObject(resultMeal[0]))
    } else {
        return c.json({})
    }
})

app.get("/categories", async(c) =>{
    var result = await axios.get(`https://themealdb.com/api/json/v1/1/categories.php`)
    return c.json(result.data.categories)
})
app.get("/category/:category",async (c) => {
    var category = c.req.param("category")
    var result = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    var resultMeal = result.data.meals
    if (resultMeal){
        var meals = resultMeal.map((meal:Meal) =>{
            return getMealObject(meal)
        })

        return c.json(meals)
    } else {
        return c.json([])
    }
})

export default app