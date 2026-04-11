import type { Variables } from "@/schema/request-grouped-schema-types";
import { createFactory } from "hono/factory";
import { StatusCodes } from "http-status-codes";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema } from "@/schema/user-grouped-schema-types";
import { createUserService, findUserByEmailService, findUserByIdService } from "@/services/user-grouped-services";
import { HTTPException } from "hono/http-exception";
import { checkPassword, hashPassword } from "@/utils/password-helper";
import { generateToken, setAuthCookie } from "@/utils/token-helper";
import type { RefreshLoginPayload, TokenPayload } from "@/types/token-types";
import { deleteRefreshTokenService, storeRefreshTokenService } from "@/services/refresh-token-grouped-services";
import { deleteCookie, getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

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

    const refreshPayload: RefreshLoginPayload= {
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

    return c.json({success: true, message: "User logged out."});
});


export const registerUserController = factory.createHandlers(zValidator("json",createUserSchema),async (c) => {
    const userData = c.req.valid("json");

    const matchedUser = await findUserByEmailService(userData.email);
    if(matchedUser) {
        throw new HTTPException(StatusCodes.CONFLICT, {message: "Email is already taken"});
    }
    
    const createdUser = await createUserService({...userData, password: await hashPassword(userData.password)});
    if(!createdUser) {
        throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, {message: "Failed to create user"});
    }
    return c.json({success: true, user: createdUser, message: "User registered successfully"},StatusCodes.CREATED);
});

export const issueAccessTokenController = factory.createHandlers(async (c) => {
    const refreshToken = getCookie(c, "refreshToken");
    console.log(refreshToken);
    if(!refreshToken) {
        throw new HTTPException(StatusCodes.UNPROCESSABLE_ENTITY, {message: "Failed to retrieve Token"});
    }
    const decoded = await verify(refreshToken, process.env.JWT_REFRESH_KEY!, "HS256") as RefreshLoginPayload;

    if(!decoded) {
        throw new HTTPException(StatusCodes.UNPROCESSABLE_ENTITY, {message: "Invalid or Expired toke"});
    }

    const signedUser = await findUserByIdService(decoded.sub);
    if(!signedUser) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {message: `User with Id: ${decoded.sub} was not found`});
    }
    const payload: TokenPayload = {
        ...decoded,
        role: signedUser.role,
        email: signedUser.email
    }
    const {token: accessToken} = await generateToken(payload,process.env.JWT_REFRESH_KEY!, "HS256");

    return c.json({accessToken});
})





