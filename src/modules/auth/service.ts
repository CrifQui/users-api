import { RegisterInput } from "./schema.js";
import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma.js";

export const registerUser = async (data: RegisterInput) => {
    const { email, password, name } = data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (user) throw new Error("User already exist");
    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = await prisma.role.findUnique({ where: { name: "USER" } });

    if (!userRole) throw new Error("User role not found");

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
