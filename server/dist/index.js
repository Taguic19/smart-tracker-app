import "dotenv/config";
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { HTTPException } from "hono/http-exception";
import userRouter from "./routes/user-routes";
import authRouter from "./routes/auth-routes";
import taskRouter from "./routes/task-routes";
const app = new Hono().basePath("/api")
    .use(cors())
    .use(prettyJSON())
    .use(logger())
    .onError((err, c) => {
    if (err instanceof HTTPException) {
        return c.json({ succes: false, message: err.message }, err.status);
    }
    return c.json({ success: false, message: "Internal Server Error" }, 500);
})
    .notFound((c) => c.json({ success: false, status: "error", message: `${c.req.url} was not found` }))
    .route("/v1/user", userRouter)
    .route("/v1/auth", authRouter)
    .route("v1/task", taskRouter);
serve({
    fetch: app.fetch,
    port: 3000
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
