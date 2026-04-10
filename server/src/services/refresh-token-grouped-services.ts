import prisma from "@/configs/prisma-config";
import type { RefreshToken } from "@/types/token-types";


export const storeRefreshTokenService = async (tokenData: RefreshToken) => {
    return await prisma.refreshToken.create({
        data: tokenData
    });
}


export const deleteRefreshTokenService = async (token: string) => {
    return await prisma.refreshToken.delete({
        where: {token}
    });
}

