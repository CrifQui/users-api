import { z } from "zod";
const password = z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .refine(
        (password) => /[A-Z]/.test(password),
        "password debe tener una mayuscula"
    )
    .refine(
        (password) => /[a-z]/.test(password),
        "password debe tener una minuscula"
    )
    .refine(
        (password) => /[0-9]/.test(password),
        "password debe tener un numero"
    )
    .refine(
        (password) => /[!@#$%^&*]/.test(password),
        "password debe tener un caracter especiala"
    );
const email = z.email("Invalid email format");
export const registerSchema = z.object({
    email,
    name: z.string().optional(),
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
