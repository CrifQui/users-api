import { LoginInput, RegisterInput } from "./schema.js";
import {
    getAccessToken,
    getRefreshToken,
    verifyRefreshToken,
} from "../../utils/jwt.js";

import { AppError } from "../../utils/errorHandler.js";
import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma.js";

export const registerUser = async (data: RegisterInput) => {
    const { email, password, name } = data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (user) throw new AppError("User already exist", 409);
    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = await prisma.role.findUnique({ where: { name: "USER" } });

    if (!userRole) throw new AppError("User role not found", 403);

    const userCreated = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            roleId: userRole.id,
        },
    });
    return {
        id: userCreated.id,
        email: userCreated.email,
        name: userCreated.name,
    };
};

export const loginUser = async (data: LoginInput) => {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
        where: { email },
        include: { role: true },
    });

    if (!user) throw new AppError("Invalid credentials", 401);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new AppError("Invalid credentials", 401);

    const accessToken = getAccessToken({ sub: user.id, role: user.role.name });
    const refreshToken = getRefreshToken({ sub: user.id });
    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });
    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            email: user.email,
            role: user.roleId,
            name: user.role.name,
        },
    };
};

export const refreshAccessToken = async (token: string) => {
    const storedToken = await prisma.refreshToken.findUnique({
        where: { token },
        include: { user: { include: { role: true } } },
    });

    if (!storedToken || storedToken.revoked)
        throw new AppError("Invalid refresh token", 401);

    if (storedToken.expiresAt < new Date())
        throw new AppError("Refresh token expired", 401);

    verifyRefreshToken(token);

    const accessToken = getAccessToken({
        sub: storedToken.user.id,
        role: storedToken.user.role.name,
    });

    return { accessToken };
};

export const logoutUser = async (refreshToken: string) => {
    if (!refreshToken) return;
    await prisma.refreshToken.updateMany({
        where: { token: refreshToken, revoked: false },
        data: {
            revoked: true,
        },
    });
};
