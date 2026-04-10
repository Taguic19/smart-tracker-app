import z from "zod";

export const tokenSchema = z.object({
    sub: z.string(),
    exp: z.int().positive(),
    iat: z.int().positive(),
    email: z.email(),
    role: z.enum(["USER", "ADMIN"])
});

export type TokenPayload = z.infer<typeof tokenSchema>;

export type RefreshToken = {
    token: string;
    userId: string;
}