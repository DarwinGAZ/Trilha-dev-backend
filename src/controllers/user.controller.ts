import { RequestHandler } from "express";
import {
    createUserService,
    deleteUserService,
    getAllUsersService,
    getUserByEmailService,
    updateUserService,
} from "../services/users";
import {
    updateUserSchema,
    createUserSchema,
    getUserByEmailSchema,
} from "../schemas/userSchema";

export const createUser: RequestHandler = async (req, res) => {
    const data = await createUserSchema.safeParse(req.body);

    if (!data.success) {
        return res.json({ error: data.error.flatten().fieldErrors });
    }

    const validatedData = data.data;

    const existingUser = await getUserByEmailService(validatedData.email);
    if (existingUser) {
        return res.status(400).json({ error: "Usuário já existe!" });
    }

    const newUser = await createUserService(validatedData);

    return res.status(201).json(newUser);
};

export const getAllUsers: RequestHandler = async (req, res) => {
    const users = await getAllUsersService();

    return res.json(users);
};

export const getUserByEmail: RequestHandler = async (req, res) => {
    const data = await getUserByEmailSchema.safeParse(req.body);

    if (!data.success) {
        return res.json({ error: data.error.flatten().fieldErrors });
    }

    const user = await getUserByEmailService(data.data.email);

    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
    }

    return res.json(user);
};

export const updateUser: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const data = await updateUserSchema.safeParse(req.body);

    if (!data.success) {
        return res.json({ error: data.error.flatten().fieldErrors });
    }

    const updatedUser = await updateUserService(Number(id), data.data);

    if (!updatedUser.id) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
    }

    if (data.data.email && updatedUser.email !== data.data.email) {
        const existingUser = await getUserByEmailService(data.data.email);
        if (existingUser) {
            return res.status(400).json({ error: "Email já está em uso!" });
        }
    }

    return res.status(200).json(updatedUser);
};

export const deleteUser: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const deletedUser = await deleteUserService(Number(id));

    if (!deletedUser.id) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
    }

    return res
        .status(200)
        .json({ OK: "usuario deletado com sucesso", deletedUser });
};
