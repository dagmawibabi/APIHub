import { Hono } from "hono";
import axios from "axios";

const app = new Hono();

//* INTRODUCTION
var welcomeMessage =
  "Welcome to the ApicAgent API route. Use /user-agent to get a response with your User-Agent string.";
app.get("/", (c) => {
  return c.text(welcomeMessage);
});

//* Get User-Agent Information
app.get("/user-agent", async (c) => {
  const userAgent = c.req.header("user-agent");
  if (!userAgent) {
    return c.json({
      error: "User-Agent header is missing from the request.",
    });
  } // URL encode the User-Agent string to safely pass it as a query parameter

  const encodedUserAgent = encodeURIComponent(userAgent);

  try {
    // Send the encoded User-Agent string to ApicAgent API
    const response = await axios.get(
      `https://api.apicagent.com/?ua=${encodedUserAgent}`
    ); // Return the response from ApicAgent API

    return c.json(response.data);
  } catch (error) {
    return c.json({
      error: "Failed to get response from ApicAgent API.",
      details: (error as any).message,
    });
  }
});

export default app;
