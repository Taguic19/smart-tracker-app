import type { Variables } from "@/schema/request-grouped-schema-types";
import { createFactory } from "hono/factory";
import { StatusCodes } from "http-status-codes";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema } from "@/schema/user-grouped-schema-types";
import { findUserByEmailService } from "@/services/user-grouped-services";
import { HTTPException } from "hono/http-exception";
import { checkPassword } from "@/utils/password-helper";
import { generateToken, setAuthCookie } from "@/utils/token-helper";
import type { TokenPayload } from "@/types/token-types";
import { deleteRefreshTokenService, storeRefreshTokenService } from "@/services/refresh-token-grouped-services";
import { deleteCookie, getCookie } from "hono/cookie";

const factory = createFactory<{Variables: Variables}>();

export const loginUserController = factory.createHandlers(zValidator("json", createUserSchema), async (c) => {
    const {email, password} = c.req.valid("json");
    const matchedUser = await findUserByEmailService(email);
    if(!matchedUser) {
        throw new HTTPException(StatusCodes.UNAUTHORIZED, {message: "Invalid email or password"});
    }
    const isMatchedPassword = await checkPassword(password, matchedUser.password!);
    if(!isMatchedPassword) {
        throw new HTTPException(StatusCodes.UNAUTHORIZED, {message: "Invalid email or password"});
    }
    const accessPayload: TokenPayload = {
        sub: matchedUser.id,
        iat: Math.floor(Date.now()),
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        email: matchedUser.email,
        role: matchedUser.role
    } as const;

    const refreshPayload = {
    sub: matchedUser.id,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
    } as const;

    const {token: accessToken} = await generateToken(accessPayload,process.env.JWT_ACCESS_KEY!,"HS256");
    const {token: refreshToken} = await generateToken(refreshPayload, process.env.JWT_REFRESH_KEY!, "HS256");
    setAuthCookie(c,refreshToken);
    await storeRefreshTokenService({token: refreshToken, userId: matchedUser.id});
    return c.json({
        success: true,
        message: "Logged in successfully",
        accessToken
    });
});

export const logoutUserController = factory.createHandlers(async (c) => {
    const refreshToken = getCookie(c,"refreshToken");
    if(!refreshToken) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, {message: "Failed to retrieved Refresh token"});
    }
    deleteCookie(c, "refreshToken");
    await deleteRefreshTokenService(refreshToken);
})




