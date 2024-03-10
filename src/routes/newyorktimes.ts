import {Hono} from "hono";
import axios from "axios";


const app = new Hono();

//* INTRODUCTION
const welcomeMessage = `
    Welcome to the New York Times service! Use the following endpoints to access news data:

    - Fetch archived articles by year and month: /archive/:year/:month

    - Searching and Filtering articles: /articles/search/:q

    - Fetching Best seller Books: bestseller/books/:list-name
    - Fetch Best Seller Books by Date: bestseller/books/:bestseller-date/:list-name
    - Fetch Best Seller list names: bestseller/books/names
    - Fetch overview of best seller books by date: bestseller/books/overview/
    - Fetch Top 5 Best Seller Books: bestseller/books/overview/top5/

    - Fetch Popular Articles based on view: /popular/viewed/:period
    - Fetching most shared Articles: /popular/shared/:period
    - Fetching most shared articles via specific social media: /popular/shared/:period/:source
    
    - Fetching Top Stories: /topstories/:section
`

app.get("/", (c) => {
    return c.text(welcomeMessage)
})

//* ARCHIVE
app.get("/archive/:year/:month", async (c) => {
    console.log("Archive");
    const API_Key = process.env.NYTIMESAPIKEY;
    const year: number = parseInt(c.req.param("year"));
    const month: number = parseInt(c.req.param("month"));
    
    const result = await axios.get(`https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${API_Key}`);

    return c.json(result.data);
});

//* ARTICLES

app.get(`/articles/search/:q`, async (c) => {
  
    try {
        const API_Key = process.env.NYTIMESAPIKEY;
        const q: string = c.req.param("q") || "";
        const fq: string = c.req.query("fq") || "";
        const begin_date: string = c.req.query("begin_date") || "";
        const end_date: string = c.req.query("end_date") || "";
        const facet: string = c.req.query("facet") || "";
        const facet_fields: string = c.req.query("facet_fields") || "";
        const facet_filter: string = c.req.query("facet_filter") || "";
        const sort: string = c.req.query("sort") || "";
        const fl: string = c.req.query("fl") || "";
        const page: string = c.req.query("page") || "";

        // Construct the URL only with non-empty query parameters
        let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${q}&api-key=${API_Key}`;
        if (fq) url += `&fq=${fq}`;
        if (begin_date) url += `&begin_date=${begin_date}`;
        if (end_date) url += `&end_date=${end_date}`;
        if (facet) url += `&facet=${facet}`;
        if (facet_fields) url += `&facet_fields=${facet_fields}`;
        if (facet_filter) url += `&facet_filter=${facet_filter}`;
        if (sort) url += `&sort=${sort}`;
        if (fl) url += `&fl=${fl}`;
        if (page) url += `&page=${page}`;

        // Make asynchronous request to NYTimes API using axios
        const result = await axios.get(url);


        return c.json(result.data);
    } catch (error) {
        // Handle errors 
        console.error("Error:", error);
       
    }
});


// BOOKS by List Name
app.get("bestsellers/books/:list-name", async (c) => {
    const API_Key = process.env.NYTIMESAPIKEY;
    const list_name: string = c.req.param("list-name");
    const bestsellers_date: string = c.req.query("bestsellers-date") || "";
    const published_date: string = c.req.query("published-date") || "";
    const offset: string = c.req.query("offset") || "";

    let url : string = `https://api.nytimes.com/svc/books/v3/lists/${list_name}.json?api-key=${API_Key}`;
    if (bestsellers_date) url += `&bestsellers-date=${bestsellers_date}`;
    if (published_date) url += `&published-date=${published_date}`;
    if (offset) url += `&offset=${offset}`;

    const result = await axios.get(url);
    return c.json(result.data);
})

//Books by Best Seller Date
app.get("bestsellers/books/:bestseller-date/:list-name", async (c) => {
    const API_Key = process.env.NYTIMESAPIKEY;
    const bestsellers_date: string = c.req.param("bestseller-date");
    const list_name: string = c.req.param("list-name");
    const offset: string = c.req.query("offset") || "";

    let url : string = `https://api.nytimes.com/svc/books/v3/lists/${bestsellers_date}/${list_name}.json?api-key=${API_Key}`;
    if (offset) url += `&offset=${offset}`;

    const result = await axios.get(url);
    return c.json(result.data);
})


//Best seller Books by name
app.get("bestsellers/books/names", async (c)  => {
    const API_Key = process.env.NYTIMESAPIKEY;
    const result = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${API_Key}`);
    return c.json(result.data);
});

//Books Overview by Published Date
app.get("bestsellers/books/overview", async (c) => {
    const API_Key = process.env.NYTIMESAPIKEY;
    const published_date: string = c.req.query("published-date") || "";
    let url = `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=${API_Key}`;
    if (published_date) url += `&published_date=${published_date}`;
    const result = await axios.get(url);
    return c.json(result.data);
})

//Top 5 Best Seller Books
app.get("bestsellers/books/overview/top5", async (c) => {
    const API_Key = process.env.NYTIMESAPIKEY;
    const published_date: string = c.req.query("published-date") || "";
    let url = `https://api.nytimes.com/svc/books/v3/lists/best-sellers/overview.json?api-key=${API_Key}`;
    if (published_date) url += `&published_date=${published_date}`;
    const result = await axios.get(url);
    return c.json(result.data);
})

//popular articles based on view
app.get("popular/viewed/:period", async (c) => {
    const API_Key = process.env.NYTIMESAPIKEY;
    const period: string = c.req.param("period");
    const result = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/${period}.json?api-key=${API_Key}`);

    return c.json(result.data);
})

//popular articles based on shared
app.get("popular/shared/:period", async (c) => {
    const API_Key = process.env.NYTIMESAPIKEY;
    const period: string = c.req.param("period");
    const result = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/shared/${period}.json?api-key=${API_Key}`);

    return c.json(result.data);
})

//popular articles based shared via specific social media
app.get("popular/shared/:period/:source", async (c) => {
    const API_Key = process.env.NYTIMESAPIKEY;
    const period: string = c.req.param("period");
    const source: string = c.req.param("source");
    const result = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/shared/${period}/${source}.json?api-key=${API_Key}`);

    return c.json(result.data);
})

//Top Stories
app.get("topstories/:section", async (c) => {
    const API_Key = process.env.NYTIMESAPIKEY;
    const section: string = c.req.param("section");
    const result = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${API_Key}`);

    return c.json(result.data);
});

export default app;