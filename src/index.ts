import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { env } from 'hono/adapter'

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
var port = Number.parseInt(process.env.PORT!) || 7000;
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})

export default app;