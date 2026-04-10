import type { TokenPayload } from "@/types/token-types";
import {sign} from "hono/jwt";
import { setCookie } from "hono/cookie";
import type { Context } from "hono";


export const generateToken = async (payload: TokenPayload | Omit<TokenPayload,"email" | "role">, secret: string, alg: "HS256") => {
    const token = await sign(payload, secret, alg);
    return {token};
}


export const setAuthCookie = (c: Context, refreshToken: string) => {
    setCookie(c,"refreshToken", refreshToken,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        sameSite: "Lax"
    });
}