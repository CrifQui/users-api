import { email } from "../../validators/email.schema.js";
import { name } from "../../validators/name.schema.js";
import { password } from "../../validators/password.schema.js";
import { z } from "zod";

export const registerSchema = z.object({
    email,
    name,
    password,
});

export const loginSchema = z.object({
    email,
    password,
});

export const refreshSchema = z.object({
    refreshToken: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export type RegisterInput = z.infer<typeof registerSchema>;
