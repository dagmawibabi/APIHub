import { Hono } from 'hono'
import axios from 'axios'

const app = new Hono()

//* INTRODUCTION
const welcomeMessage = `
Welcome to the JSON Placeholder API route! Here are the available endpoints:

- Fetch all posts: /jsonplaceholder/posts
- Fetch posts with pagination: /jsonplaceholder/posts/:page/:limit
- Fetch a single post: /jsonplaceholder/post/:id
- Fetch all comments: /jsonplaceholder/comments
- Fetch all albums: /jsonplaceholder/albums
- Fetch albums with pagination: /jsonplaceholder/albums/:page/:limit
- Fetch a single album: /jsonplaceholder/album/:id
- Fetch all photos: /jsonplaceholder/photos
- Fetch photos with pagination: /jsonplaceholder/photos/:page/:limit
- Fetch a single photo: /jsonplaceholder/photo/:id
- Fetch all todos: /jsonplaceholder/todos
- Fetch all users: /jsonplaceholder/users
- Fetch users with pagination: /jsonplaceholder/users/:page/:limit
- Fetch a single user: /jsonplaceholder/user/:id
- Fetch a single user's posts: /jsonplaceholder/user/:id/posts
- Fetch a single user's todos: /jsonplaceholder/user/:id/todos
`;
app.get("/", (c) => {
    return c.text(welcomeMessage)
})

//* FETCH ALL POSTS
app.get("/jsonplaceholder/posts", async (c) => {
    try {
        let result = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
        return c.json(result.data)
    } catch (error) {
        console.error(error)
        return c.status(500).send('An error occurred while fetching the posts')
    }
})

//* FETCH ALL POSTS WITH PAGINATION
app.get("/jsonplaceholder/posts/:page/:limit", async (c) => {
    let page = parseInt(c.req.param("page"))
    let limit = parseInt(c.req.param("limit"))
    try {
        let result = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)
        return c.json(result.data)
    } catch (error) {
        console.error(error)
        return c.status(500).send('An error occurred while fetching the posts')
    }
})
//* FETCH SINGLE POST
app.get("/jsonplaceholder/post/:id", async (c) => {
    let id = parseInt(c.req.param("id"))
    try {
        let result = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        return c.json(result.data)
    } catch (error) {
        console.error(error)
        return c.status(500).send('An error occurred while fetching the post')
    }
})

//* FETCH ALL COMMENTS
app.get("/jsonplaceholder/comments", async (c) => {
    try {
        let result = await axios.get(`https://jsonplaceholder.typicode.com/comments`)
        return c.json(result.data)
    } catch (error) {
        console.error(error)
        return c.status(500).send('An error occurred while fetching the comments')
    }
})

//* FETCH ALL COMMENTS WITH PAGINATION
app.get("/jsonplaceholder/albums", async (c) => {
    try {
        let result = await axios.get(`https://jsonplaceholder.typicode.com/albums`)
        return c.json(result.data)
    } catch (error) {
        console.error(error)
        return c.status(500).send('An error occurred while fetching the albums')
    }
})

//* FETCH ALL ALBUMS WITH PAGINATION
app.get("/jsonplaceholder/albums/:page/:limit", async (c) => {
    let page = parseInt(c.req.param("page"))
    let limit = parseInt(c.req.param("limit"))
    try {
        let result = await axios.get(`https://jsonplaceholder.typicode.com/albums?_page=${page}&_limit=${limit}`)
        return c.json(result.data)
    } catch (error) {
        console.error(error)
        return c.status(500).send('An error occurred while fetching the albums')
    }
})

//* FETCH SINGLE ALBUM
app.get("/jsonplaceholder/album/:id", async (c) => {
    let id = parseInt(c.req.param("id"))
    try {
        let result = await axios.get(`https://jsonplaceholder.typicode.com/albums/${id}`)
        return c.json(result.data)
    } catch (error) {
        console.error(error)
        return c.status(500).send('An error occurred while fetching the album')
    }
})

//* FETCH ALL PHOTOS
app.get("/jsonplaceholder/photos", async (c) => {
    try {
        let result = await axios.get(`https://jsonplaceholder.typicode.com/photos`)
        return c.json(result.data)
    } catch (error) {
        console.error(error)
        return c.status(500).send('An error occurred while fetching the photos')
    }
})

//* FETCH ALL PHOTOS WITH PAGINATION
app.get("/jsonplaceholder/photos/:page/:limit", async (c) => {
    let page = parseInt(c.req.param("page"))
    let limit = parseInt(c.req.param("limit"))
    try {
        let result = await axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`)
        return c.json(result.data)
    } catch (error) {
        console.error(error)
        return c.status(500).send('An error occurred while fetching the photos')
    }
})

//* FETCH SINGLE PHOTO
app.get("/jsonplaceholder/photo/:id", async (c) => {
    let id = parseInt(c.req.param("id"))
    try {
        let result = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`)
        return c.json(result.data)
    } catch (error) {
        console.error(error)
        return c.status(500).send('An error occurred while fetching the photo')
    }
})

//* FETCH ALL TODOS
app.get("/jsonplaceholder/todos", async (c) => {
    try {
        let result = await axios.get(`https://jsonplaceholder.typicode.com/todos`)
        return c.json(result.data)
    } catch (error) {
        console.error(error)
        return c.status(500).send('An error occurred while fetching the todos')
    }
})

//* FETCH ALL TODOS WITH PAGINATION
app.get("/jsonplaceholder/users", async (c) => {
    try {
        let result = await axios.get(`https://jsonplaceholder.typicode.com/users`)
        return c.json(result.data)
    } catch (error) {
        console.error(error)
        return c.status(500).send('An error occurred while fetching the users')
    }
})

//* FETCH ALL USERS WITH PAGINATION
app.get("/jsonplaceholder/users/:page/:limit", async (c) => {
    let page = parseInt(c.req.param("page"))
    let limit = parseInt(c.req.param("limit"))
    try {
        let result = await axios.get(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`)
        return c.json(result.data)
    } catch (error) {
        console.error(error)
        return c.status(500).send('An error occurred while fetching the users')
    }
})

//* FETCH SINGLE USER
app.get("/jsonplaceholder/user/:id", async (c) => {
    let id = parseInt(c.req.param("id"))
    try {
        let result = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        return c.json(result.data)
    } catch (error) {
        console.error(error)
        return c.status(500).send('An error occurred while fetching the user')
    }
})

//* FETCH SINGLE USER'S POSTS
app.get("/jsonplaceholder/user/:id/posts", async (c) => {
    let id = parseInt(c.req.param("id"))
    try {
        let result = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
        return c.json(result.data)
    } catch (error) {
        console.error(error)
        return c.status(500).send('An error occurred while fetching the user\'s posts')
    }
})

//* FETCH SINGLE USER'S TODOS
app.get("/jsonplaceholder/user/:id/todos", async (c) => {
    let id = parseInt(c.req.param("id"))
    try {
        let result = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
        return c.json(result.data)
    } catch (error) {
        console.error(error)
        return c.status(500).send('An error occurred while fetching the user\'s todos')
    }
})

export default app