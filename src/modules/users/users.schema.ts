import { email } from "../../validators/email.schema.js";
import { name } from "../../validators/name.schema.js";
import { password } from "../../validators/password.schema.js";
import { z } from "zod";

const roleId = z.uuid();
export const createUserSchema = z.object({
    email,
    password,
    name,
    roleId,
});

export const updateUserSchema = z.object({
    email: email.optional(),
    password: password.optional(),
    name: name.optional(),
    roleId: roleId,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof createUserSchema>;
