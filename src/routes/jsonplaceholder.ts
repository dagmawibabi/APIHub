import { Hono } from 'hono'
import axios from 'axios'

const app = new Hono()

//* INTRODUCTION
const welcomeMessage = `Welcome to the JSON Placeholder API route! Here are the available endpoints:
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
    return c.json(welcomeMessage)
})

//* FETCH ALL POSTS
app.get("/posts", async (c) => {
    let result = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
    let placeHolderData = result.data
    return c.json(placeHolderData)
})

//* FETCH ALL POSTS WITH PAGINATION
app.get("/posts/:page?/:limit?", async (c) => {
    let page = c.req.param("page") || 1
    let limit = c.req.param("limit") || 5
    let result = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)
    return c.json(result.data)
})

//* FETCH SINGLE POST
app.get("/post", (c) => {
    var response = "/jsonplaceholder/post/:id route fetches the specified post using the ID specified."
    return c.json(response);
})
app.get("/post/:id", async (c) => {
    let id = c.req.param("id")
    let result = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return c.json(result.data)
})

//* FETCH ALL COMMENTS
app.get("/comments", async (c) => {
    let result = await axios.get(`https://jsonplaceholder.typicode.com/comments`)
    return c.json(result.data)
})

//* FETCH ALL ALBUMS
app.get("/albums", async (c) => {
    let result = await axios.get(`https://jsonplaceholder.typicode.com/albums`)
    return c.json(result.data)
})

//* FETCH ALL ALBUMS WITH PAGINATION
app.get("/albums/:page?/:limit?", async (c) => {
    let page = c.req.param("page") || 1
    let limit = c.req.param("limit") || 5
    let result = await axios.get(`https://jsonplaceholder.typicode.com/albums?_page=${page}&_limit=${limit}`)
    return c.json(result.data)
})

//* FETCH SINGLE ALBUM
app.get("/album/:id?", async (c) => {
    let id = c.req.param("id") || 1
    let result = await axios.get(`https://jsonplaceholder.typicode.com/albums/${id}`)
    return c.json(result.data)
})

//* FETCH ALL PHOTOS
app.get("/photos", async (c) => {
    let result = await axios.get(`https://jsonplaceholder.typicode.com/photos`)
    return c.json(result.data)
})

//* FETCH ALL PHOTOS WITH PAGINATION
app.get("/photos/:page?/:limit?", async (c) => {
    let page = c.req.param("page") || 1
    let limit = c.req.param("limit") || 5
    let result = await axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`)
    return c.json(result.data)
})

//* FETCH SINGLE PHOTO
app.get("/photo", (c) => {
    var response = "/jsonplaceholder/photo/:id route fetches the specified photo using the ID specified."
    return c.json(response);
})
app.get("/photo/:id", async (c) => {
    let id = c.req.param("id")
    let result = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`)
    return c.json(result.data)
})

//* FETCH ALL TODOS
app.get("/todos", async (c) => {
    let result = await axios.get(`https://jsonplaceholder.typicode.com/todos`)
    return c.json(result.data)
})

//* FETCH ALL USERS
app.get("/users", async (c) => {
    let result = await axios.get(`https://jsonplaceholder.typicode.com/users`)
    return c.json(result.data)
})

//* FETCH ALL USERS WITH PAGINATION
app.get("/users/:page?/:limit?", async (c) => {
    let page = c.req.param("page") || 1
    let limit = c.req.param("limit") || 5
    let result = await axios.get(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`)
    return c.json(result.data)
})

//* FETCH SINGLE USER
app.get("/user", (c) => {
    var response = "/jsonplaceholder/user/:id route fetches the specified user using the ID specified. /jsonplaceholder/user/:id/posts route fetches the posts of the current user. /jsonplaceholder/user/:id/todos route fetches the todos of the current user."
    return c.json(response);
})
app.get("/user/:id", async (c) => {
    let id = c.req.param("id") 
    let result = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    return c.json(result.data)
})

//* FETCH SINGLE USER'S POSTS
app.get("/user/:id/posts", async (c) => {
    let id = c.req.param("id")
    let result = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    return c.json(result.data)
})

//* FETCH SINGLE USER'S TODOS
app.get("/user/:id/todos", async (c) => {
    let id = c.req.param("id")
    let result = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
    return c.json(result.data)
})

export default app