import z from "zod";



export const createProfileSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    birthDate: z.date(),
    userId: z.string()
});


export type CreateProfile = z.infer<typeof createProfileSchema>;