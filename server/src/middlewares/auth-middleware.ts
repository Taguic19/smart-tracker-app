import { type Variables } from "@/schema/request-grouped-schema-types";
import type { Next } from "hono";
import { createFactory } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { verify } from "hono/jwt";
import {StatusCodes} from "http-status-codes";
import { tokenSchema } from "@/types/token-types";

const factory = createFactory<{Variables: Variables}>();


export const authenticationMiddleware = factory.createMiddleware(async (c,next: Next) => {
    const authHeader = c.req.header("Authorization");
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new HTTPException(StatusCodes.UNAUTHORIZED, {message: "Authorization header missing"});
    }
    const token = authHeader.split(" ")[1];
    if(!token) {
        throw new HTTPException(StatusCodes.UNAUTHORIZED, {message: "Invalid or Expired Token"});
    }
    try{
        const decoded = await verify(token, process.env.JWT_ACCESS_KEY!, "HS256");
        const parsed = tokenSchema.safeParse(decoded);
        if(!parsed.success) {
            throw new HTTPException(StatusCodes.UNAUTHORIZED, {message: "Invalid or Expired token"});
        }
        c.set("user", parsed.data);
        await next();
    }
    catch{
        throw new HTTPException(StatusCodes.UNAUTHORIZED, {message: "Invalid or Expired Token"});
    }
});
