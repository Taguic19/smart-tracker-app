import "dotenv/config";
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import type { Env } from "./types/env";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { routes } from "./routes";


const app = new Hono<Env>().basePath("/api");

app.use(logger());
app.use(cors());
app.use(prettyJSON());

app.onError((err, c) => {
  return c.json({
    success: false,
    status: "error",
    message: err.message
  });
});

app.notFound((c) => c.json({success: false, status: "error", message: `${c.req.url} was not found`}));

app.get('/', (c) => {
  return c.text('Hello Hono!')
});

app.get("/test", (c) => c.text("You are authorized!"));

// Routes

routes.forEach(route => {
  app.route("/", route);
})


serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
