import { Hono } from 'hono'
import axios from 'axios'

const app = new Hono()

//* INTRODUCTION
var welcomeMessage = "Welcome to Hacker News API route! Use /newstories /topstories and /beststories to get filtered news.";
app.get("/", (c) => {
    return c.text(welcomeMessage)
})

//* NEW STORIES 
app.get("/newstories", async (c) => {
    var result = await axios.get(`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`)
    var newsIDList = result.data
    if (newsIDList.length > 30) {
        newsIDList = newsIDList.slice(0, 30)
    }
    var newsContentList = []
    for (var i = 0; i < newsIDList.length; i++) {
        var currentNews = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${newsIDList[i]}.json?print=pretty`)
        newsContentList.push(currentNews.data);        
    }
    return c.json(newsContentList)
})

//* TOP STORIES
app.get("/topstories", async (c) => {
    var result = await axios.get(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`)
    var newsIDList = result.data
    if (newsIDList.length > 30) {
        newsIDList = newsIDList.slice(0, 30)
    }
    var newsContentList = []
    for (var i = 0; i < newsIDList.length; i++) {
        var currentNews = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${newsIDList[i]}.json?print=pretty`)
        newsContentList.push(currentNews.data);        
    }
    return c.json(newsContentList)
})

//* BEST STORIES
app.get("/beststories", async (c) => {
    var result = await axios.get(`https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty`)
    var newsIDList = result.data
    if (newsIDList.length > 30) {
        newsIDList = newsIDList.slice(0, 30)
    }
    var newsContentList = []
    for (var i = 0; i < newsIDList.length; i++) {
        var currentNews = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${newsIDList[i]}.json?print=pretty`)
        newsContentList.push(currentNews.data);        
    }
    return c.json(newsContentList)
})


export default app;
