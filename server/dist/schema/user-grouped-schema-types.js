import z from "zod";
import { Role } from "@/generated/prisma/enums";
export const createUserSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
});
