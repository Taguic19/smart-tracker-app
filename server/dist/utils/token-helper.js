import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";
export const generateToken = async (payload, secret, alg) => {
    const token = await sign(payload, secret, alg);
    return { token };
};
export const setAuthCookie = (c, refreshToken) => {
    setCookie(c, "refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        sameSite: "Lax"
    });
};
