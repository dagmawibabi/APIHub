import { Hono } from 'hono'
import axios from 'axios'

const app = new Hono()

//* HELPERS
import { getMealObject, Meal  } from "../helpers/mealdb"

//* INTRODUCTION
var welcomeMessage = "Welcome to MealDB API route!";
app.get("/", (c) => {
    return c.text(welcomeMessage)
})

//* SEARCH FOR MEALS 
app.get("/search", (c) => {
    var response = "/mealdb/search/:seqrchQuery route fetches meal data."
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

//* FIND SPECIFIC MEAL BY ID
app.get("/meal", (c) =>{
    var response = "/mealdb/meal/:mealID route will return a single meal"
    return c.json(response)
})

app.get("/meal/:mealID", async(c) =>{
    var mealID = c.req.param("mealID")
    var result = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    var resultMeal = result.data.meals
    if (resultMeal){
        return c.json(getMealObject(resultMeal[0]))
    } else {
        return c.json({})
    }
})

//* GET ALL CATEGORIES
app.get("/categories", async(c) =>{
    var result = await axios.get(`https://themealdb.com/api/json/v1/1/categories.php`)
    return c.json(result.data.categories)
})

//* GET A SPECIFIC CATEGORY
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