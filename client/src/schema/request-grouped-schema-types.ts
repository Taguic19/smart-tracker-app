import z from "zod";

export const tokenSchema = z.object({
    sub: z.string(),
    exp: z.int().positive(),
    iat: z.int().positive(),
    email: z.email(),
    role: z.enum(["USER", "ADMIN"])
});

export type TokenPayload = z.infer<typeof tokenSchema>;

export type RefreshTokenPayload = TokenPayload;

export type RefreshToken = {
    token: string;
    userId: string;
}

export type RefreshLoginPayload = {
    sub: string;
    exp: number;
    iat: number;
}

export type Variables  = {
    user: TokenPayload
}

export const paginationSchema = z.object({
    pageNumber: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().positive().default(10)
});

export type Pagination = z.infer<typeof paginationSchema>;

export const paramsSchema = z.object({
    id: z.string().startsWith("c")
});

export const emailSchema = z.object({
    email: z.email()
});

export const passwordSchema = z.object({
    password: z.string().min(8)
});


export type TaskQueryType = ["task", Pagination];