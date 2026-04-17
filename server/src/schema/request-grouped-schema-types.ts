import type { TokenPayload } from "@/types/token-types"
import z from "zod"

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