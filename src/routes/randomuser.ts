import { Hono } from "hono";
import axios from "axios";

const app = new Hono();

//* INTRODUCTION
var welcomeMessage =
  "Welcome to the RandomUser API route. Use /user to get a random user data.";
app.get("/", (c) => {
  return c.text(welcomeMessage);
});

//* Get Random user
app.get("/user", async (c) => {
  var result = await axios.get("https://randomuser.me/api/");
  return c.json(result.data);
});

//* Get only random user data without seed, results, page, and version data.
app.get("/user/data", async (c) => {
  var result = await axios.get("https://randomuser.me/api/?noinfo");
  return c.json(result.data);
});

//* Get multiple random users
app.get("/users/:count", async (c) => {
  var count = c.req.param("count");
  var result = await axios.get(`https://randomuser.me/api/?results=${count}`);
  return c.json(result.data);
});

//* Specific user by Gender
app.get("/user/:gender", async (c) => {
  var gender = c.req.param("gender");
  var result = await axios.get(`https://randomuser.me/api?gender=${gender}`);
  return c.json(result.data);
});

//* Specific user by Nationality
app.get("/country/:nat", async (c) => {
  var nat = c.req.param("nat");
  var result = await axios.get(`https://randomuser.me/api?nat=${nat}`);
  return c.json(result.data);
});

//* Exclude specific user data
app.get("/exclude/:exclude", async (c) => {
  var exclude = c.req.param("exclude");
  var result = await axios.get(`https://randomuser.me/api/?exc=${exclude}`);
  return c.json(result.data);
});

//* Include specific user data
app.get("/include/:include", async (c) => {
  var include = c.req.param("include");
  var result = await axios.get(`https://randomuser.me/api/?inc=${include}`);
  return c.json(result.data);
});

//* Specify data format
app.get("/format/:format", async (c) => {
  var format = c.req.param("format");
  var result = await axios.get(`https://randomuser.me/api/?format=${format}`);
  return c.json(result.data);
});

//* Specify password strength
app.get("/password/:password", async (c) => {
  var password = c.req.param("password");
  var result = await axios.get(
    `https://randomuser.me/api/?password=${password}`
  );
  return c.json(result.data);
});


export default app;
