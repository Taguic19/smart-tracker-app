import z from "zod";

export const createProfileSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    birthDate: z.date(),
    userId: z.string()
});


export const updateProfileSchema = createProfileSchema.partial().omit({userId: true});
export type CreateProfile = z.infer<typeof createProfileSchema>;

export interface IProfile {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    createdAt: Date;
}

export type ProfileUpdate = z.infer<typeof updateProfileSchema>;

