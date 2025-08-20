import z from "zod";

export const createEventSchema = z.object({
    name: z
        .string()
        .min(2, "O nome deve ter pelo menos 2 caracteres")
        .toLowerCase(),
    description: z.string(),
    startDate: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), { message: "Data inválida" }),
    local: z.string(),
    vacanciesLimit: z
        .number()
        .min(1, "O número de vagas deve ser pelo menos 1")
        .int()
        .positive("O número de vagas deve ser positivo"),
});

export const updateEventSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    startDate: z
        .string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), {
            message: "Data inválida",
        }),
    local: z.string().optional(),
    vacanciesLimit: z
        .number()
        .int()
        .positive("O número de vagas deve ser positivo")
        .optional(),
});

export const UserToEventSchema = z.object({
    userId: z.coerce
        .number()
        .int()
        .positive("O ID do usuário deve ser um número positivo"),
});
