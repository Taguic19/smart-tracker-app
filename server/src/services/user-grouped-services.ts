import prisma from "@/configs/prisma-config";
import type { CreateUser, IPaginatedUser } from "@/schema/user-grouped-schema-types";
import {type IUser } from "@/schema/user-grouped-schema-types";


export const userSafeSelect = {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true
        } as const; 


export const createUserService = async (userData: CreateUser): Promise<IUser> => {
    return await prisma.user.create({
        data: userData,
        select: userSafeSelect
    });
}

export const updateUserEmailService = async (userId: string, newEmail: string): Promise<IUser> => {
    return await prisma.user.update({
        where: {id: userId},
        data: {email: newEmail},
        select: userSafeSelect
    });
}

export const findUserByEmailService = async (email: string): Promise<IUser | null> => {
    return await prisma.user.findUnique({
        where: {email},
        select: {
            ...userSafeSelect,
            password: true
        }
    });
}

export const findUserByIdService = async (userId: string): Promise<IUser | null> => {
    return await prisma.user.findUnique({
        where: {id: userId},
        select: userSafeSelect
    });
}

export const deleteUserByIdService = async (userId: string): Promise<IUser> => {
    return await prisma.user.delete({
        where: {id: userId},
        select: userSafeSelect
    });
}

export const findUsersService = async (pageNumber: number, pageSize: number): Promise<IPaginatedUser> => {
    const [users, totalCount] = await prisma.$transaction([
        prisma.user.findMany({
            select: userSafeSelect,
            take: pageSize,
            skip: (pageNumber -1) * pageSize
        }),
        prisma.user.count()
    ]);

    return {users, totalCount}
}

export const updatePasswordService = async (userId: string, password: string): Promise<IUser> => {
    return await prisma.user.update({
        where: {id: userId},
        data: {password},
        select: userSafeSelect
    });
}

export const findLoggedUserService = async (userId: string) => {
    return await prisma.user.findUnique({
        where: {id: userId},
        select: {
            id: true,
            email: true,
            role: true
        }
    });
}