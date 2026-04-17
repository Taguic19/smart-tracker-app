import {} from "@/schema/profile-grouped-schema-types";
import prisma from "@/configs/prisma-config";
const profileSelect = {
    id: true,
    firstName: true,
    lastName: true,
    birthDate: true,
    createdAt: true
};
export const createProfileService = async (profileData) => {
    return await prisma.profile.create({
        data: profileData,
        select: profileSelect
    });
};
export const updateProfileService = async (profileData, userId) => {
    return await prisma.profile.update({
        where: { id: userId },
        data: profileData,
        select: profileSelect
    });
};
export const deleteProfileService = async (userId) => {
    return await prisma.profile.delete({
        where: { id: userId },
        select: profileSelect
    });
};
export const findProfileService = async (userId) => {
    return await prisma.profile.findUnique({
        where: { id: userId },
        select: profileSelect
    });
};
