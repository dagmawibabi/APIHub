import { Hono } from 'hono'
import axios from 'axios'

const app = new Hono()

//* INTRODUCTION
var welcomeMessage = "Welcome to The Bible API route! ";
app.get("/", (c) => {
    return c.text(welcomeMessage)
})

//* BOOKS
app.get("/books", async (c)=>{
    var Bible_apikey = process.env.BIBLEAPIKEY
    const options = {
        method: 'GET',
        url: 'https://ajith-holy-bible.p.rapidapi.com/GetBooks',
        headers: {
          'X-RapidAPI-Key': Bible_apikey,
          'X-RapidAPI-Host': 'ajith-holy-bible.p.rapidapi.com'
        }
      };
    var result = await axios.request(options);
    return c.json(result.data)    
})

//* CHAPTER
app.get("/books/chapter", async (c)=>{
    var Bible_apikey = process.env.BIBLEAPIKEY
    const options = {
        method: 'GET',
        url: 'https://ajith-holy-bible.p.rapidapi.com/GetChapter',
        params: {
          Book: 'Luke',
          chapter: '8'
        },
        headers: {
          'X-RapidAPI-Key': Bible_apikey,
          'X-RapidAPI-Host': 'ajith-holy-bible.p.rapidapi.com'
        }
      };
    var result = await axios.request(options);
    return c.json(result.data)    
})

//* VERSES
app.get("/books/chapter/verses", async (c)=>{
    var Bible_apikey = process.env.BIBLEAPIKEY
    const options = {
        method: 'GET',
        url: 'https://ajith-holy-bible.p.rapidapi.com/GetVerses',
        params: {
          Book: 'Luke',
          chapter: '1',
          VerseFrom: '5',
          VerseTo: '8'
        },
        headers: {
          'X-RapidAPI-Key': Bible_apikey,
          'X-RapidAPI-Host': 'ajith-holy-bible.p.rapidapi.com'
        }
      };
    var result = await axios.request(options);
    return c.json(result.data)    
})

//* VERSE OF CHAPTER
app.get("/books/chapter/verse", async (c)=>{
    var Bible_apikey = process.env.BIBLEAPIKEY
    const options = {
        method: 'GET',
        url: 'https://ajith-holy-bible.p.rapidapi.com/GetVerseOfaChapter',
        params: {
          Book: 'Luke',
          chapter: '1',
          Verse: '1'
        },
        headers: {
          'X-RapidAPI-Key': Bible_apikey,
          'X-RapidAPI-Host': 'ajith-holy-bible.p.rapidapi.com'
        }
      };
    var result = await axios.request(options);
    return c.json(result.data)    
})

export default app;

