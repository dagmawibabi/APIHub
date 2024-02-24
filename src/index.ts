import { serve } from '@hono/node-server'
import { Hono } from 'hono'

//* APP
const app = new Hono()

//* Introduction
app.get('/', (c) => {
  return c.text('Welcome to Free APIs!')
})

//* Routes 
import github from "./routes/github"

// GitHub
app.route('/github', github)

//* ERROR HANDLING
app.onError((err, c) => {
  console.error(`${err}`)
  return c.json(err.message)
})

//* PORT
const port = 7000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})

export default app;