import "dotenv/config";
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import type { Env } from "./types/env";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { HTTPException } from "hono/http-exception";
import { routes } from "./routes";


const app = new Hono<Env>().basePath("/api");

app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(prettyJSON());
app.use(logger());
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ success: false, message: err.message }, err.status)
  }
  return c.json({ success: false, message: "Internal Server Error" }, 500)
})
app.notFound((c) =>
  c.json({ success: false, status: "error", message: `${c.req.url} was not found` })
);

/* Routes */
routes.forEach((route) => {
  app.route("/", route);
})




serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})