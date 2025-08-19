import z, { email } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(11, "Telefone deve ter pelo menos 11 caracteres"),
});

export const getUserByEmailSchema = z.object({
    email: z.string().email("Email inválido"),
});

export const updateUserSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").optional(),
    email: z.string().email("Email inválido").optional(),
    phone: z
        .string()
        .min(11, "Telefone deve ter pelo menos 11 caracteres")
        .optional(),
});
