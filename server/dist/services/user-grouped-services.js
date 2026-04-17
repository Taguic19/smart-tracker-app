import prisma from "@/configs/prisma-config";
import {} from "@/schema/user-grouped-schema-types";
export const userSafeSelect = {
    id: true,
    email: true,
    role: true,
    createdAt: true,
    updatedAt: true
};
export const createUserService = async (userData) => {
    return await prisma.user.create({
        data: userData,
        select: userSafeSelect
    });
};
export const updateUserEmailService = async (userId, newEmail) => {
    return await prisma.user.update({
        where: { id: userId },
        data: { email: newEmail },
        select: userSafeSelect
    });
};
export const findUserByEmailService = async (email) => {
    return await prisma.user.findUnique({
        where: { email },
        select: {
            ...userSafeSelect,
            password: true
        }
    });
};
export const findUserByIdService = async (userId) => {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: userSafeSelect
    });
};
export const deleteUserByIdService = async (userId) => {
    return await prisma.user.delete({
        where: { id: userId },
        select: userSafeSelect
    });
};
export const findUsersService = async (pageNumber, pageSize) => {
    const [users, totalCount] = await prisma.$transaction([
        prisma.user.findMany({
            select: userSafeSelect,
            take: pageSize,
            skip: (pageNumber - 1) * pageSize
        }),
        prisma.user.count()
    ]);
    return { users, totalCount };
};
export const updatePasswordService = async (userId, password) => {
    return await prisma.user.update({
        where: { id: userId },
        data: { password },
        select: userSafeSelect
    });
};
