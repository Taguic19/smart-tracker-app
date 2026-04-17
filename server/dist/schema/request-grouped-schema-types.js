import z from "zod";
export const paginationSchema = z.object({
    pageNumber: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().positive().default(10)
});
export const paramsSchema = z.object({
    id: z.string().startsWith("c")
});
export const emailSchema = z.object({
    email: z.email()
});
export const passwordSchema = z.object({
    password: z.string().min(8)
});
