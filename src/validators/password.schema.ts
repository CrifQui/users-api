import { z } from "zod";

export const password = z
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
