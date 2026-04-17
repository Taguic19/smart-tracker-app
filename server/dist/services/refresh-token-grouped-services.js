import prisma from "@/configs/prisma-config";
export const storeRefreshTokenService = async (tokenData) => {
    return await prisma.refreshToken.create({
        data: tokenData
    });
};
export const deleteRefreshTokenService = async (token) => {
    return await prisma.refreshToken.delete({
        where: { token }
    });
};
