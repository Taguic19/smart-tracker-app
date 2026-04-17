import z from "zod";
export const createProfileSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    birthDate: z.date(),
    userId: z.string()
});
