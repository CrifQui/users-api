import { CreateUserInput, UpdateUserInput } from "./users.schema.js";

import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma.js";

const getUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id },
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

const getUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: { select: { name: true } },
            createdAt: true,
        },
    });
    if (!users) throw new Error("Users table is empty");
    return users;
};

const createUser = async (data: CreateUserInput) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (user) throw new Error("User already exist");
    const newUser = await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            password: hashedPassword,
            roleId: data.roleId,
        },
    });
    return newUser;
};

const updateUser = async (id: string, data: UpdateUserInput) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found");
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    const updatedUser = await prisma.user.update({ where: { id }, data });
    return updatedUser;
};

const deleteUser = async (id: string) => {
    //soft delete, you need a new field isActive
};

export default { getUser, getUsers, createUser, updateUser, deleteUser };
