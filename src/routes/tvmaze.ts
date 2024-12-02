import { Hono } from 'hono';
import axios from 'axios';

const app = new Hono();

//* INTRODUCTION
const welcomeMessage = "Welcome to the TVMaze route! Use /shows and /episodes to explore show and episode endpoints.";
app.get("/", (c) => {
    return c.text(welcomeMessage);
});

//* SHOWS
app.get("/shows", (c) => {
    return c.text('/shows/:id - show details, /shows/search/:query - search shows');
});

//* SEARCH SHOWS
app.get("/shows/search/:query", async (c) => {
    const query: string = c.req.param("query");
    const result = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
    return c.json(result.data);
});

//* SHOW DETAILS
app.get("/shows/:id", async (c) => {
    const showId: number = parseInt(c.req.param("id"), 10);
    const result = await axios.get(`http://api.tvmaze.com/shows/${showId}`);
    return c.json(result.data);
});

//* SHOW SEASONS
app.get("/shows/:id/seasons", async (c) => {
    const showId: number = parseInt(c.req.param("id"), 10);
    const result = await axios.get(`http://api.tvmaze.com/shows/${showId}/seasons`);
    return c.json(result.data);
});

//* SEASON EPISODES
app.get("/seasons/:id/episodes", async (c) => {
    const seasonId: number = parseInt(c.req.param("id"), 10);
    const result = await axios.get(`http://api.tvmaze.com/seasons/${seasonId}/episodes`);
    return c.json(result.data);
});

//* EPISODE DETAILS
app.get("/episodes/:id", async (c) => {
    const episodeId: number = parseInt(c.req.param("id"), 10);
    const result = await axios.get(`http://api.tvmaze.com/episodes/${episodeId}`);
    return c.json(result.data);
});

export default app;