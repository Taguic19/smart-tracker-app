import prisma from "@/configs/prisma-config";
import type { CreateUser, IPaginatedUser } from "@/schema/user-grouped-schema-types";
import {type IUser } from "@/schema/user-grouped-schema-types";


const safeSelect = {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true
        } as const; 


export const createUserService = async (userData: CreateUser): Promise<IUser> => {
    return await prisma.user.create({
        data: userData,
        select: safeSelect
    });
}

export const updateUserEmailService = async (userId: string, newEmail: string): Promise<IUser> => {
    return await prisma.user.update({
        where: {id: userId},
        data: {email: newEmail},
        select: safeSelect
    });
}

export const getUserByEmailService = async (email: string): Promise<IUser | null> => {
    return await prisma.user.findUnique({
        where: {email},
        select: safeSelect
    });
}

export const getUserByIdService = async (userId: string): Promise<IUser | null> => {
    return await prisma.user.delete({
        where: {id: userId},
        select: safeSelect
    });
}

export const deleteUserByIdService = async (userId: string): Promise<IUser> => {
    return await prisma.user.delete({
        where: {id: userId},
        select: safeSelect
    });
}

export const findUsersService = async (pageNumber: number, pageSize: number): Promise<IPaginatedUser> => {
    const [users, totalCount] = await prisma.$transaction([
        prisma.user.findMany({
            select: safeSelect,
            take: pageSize,
            skip: (pageNumber -1) * pageSize
        }),
        prisma.user.count()
    ]);

    return {users, totalCount}
}

