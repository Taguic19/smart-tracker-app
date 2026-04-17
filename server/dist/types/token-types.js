import z from "zod";
export const tokenSchema = z.object({
    sub: z.string(),
    exp: z.int().positive(),
    iat: z.int().positive(),
    email: z.email(),
    role: z.enum(["USER", "ADMIN"])
});
