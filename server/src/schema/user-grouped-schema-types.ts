import z from "zod";
import { Role } from "@/generated/prisma/enums";

export const createUserSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
});


export type CreateUser = z.infer<typeof createUserSchema>;
export type LoginUser = CreateUser;

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

