import { prisma } from "../../config/prisma.js";

export const getUser = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            name: true,
            role: { select: { name: true } },
            createdAt: true,
        },
    });
    if (!user) throw new Error("User not found");
    return user;
};
