import z from "zod";

export const createUserSchema = z.object({
    email: z.email(),
    password: z.string().min(8,{error:"Password must be 8 characters or above"}),
    confirmPassword: z.string().min(8, {error: "Password must be 8 characters or above"})
});


export type CreateUser = z.infer<typeof createUserSchema>;
export type LoginUser = Omit<CreateUser,"confirmPassword">;

export const loginSchema = z.object({
     email: z.email(),
    password: z.string().min(8,{error:"Password must be 8 characters or above"}),
});

export type Role = "USER" | "ADMIN"

export interface IUser {
    id: string;
    email: string;
    role: Role;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPaginatedUser {
    users: Array<IUser>,
    totalCount: number
}

