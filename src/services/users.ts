import { prisma } from "../libs/prisma";

export interface createUserInput {
    name: string;
    email: string;
    phone: string;
}

interface updateUserInput {
    name?: string;
    email?: string;
    phone?: string;
}

export const createUserService = async (data: createUserInput) => {
    const newUser = await prisma.users.create({ data });

    return newUser;
};

export const getUserByEmailService = async (email: string) => {
    const user = await prisma.users.findUnique({
        where: { email },
    });

    return user;
};

export const getAllUsersService = async () => {
    const users = await prisma.users.findMany();

    return users;
};

export const updateUserService = async (id: number, data: updateUserInput) => {
    const updatedUser = await prisma.users.update({
        where: { id },
        data,
    });

    return updatedUser;
};

export const deleteUserService = async (id: number) => {
    const deletedUser = await prisma.users.delete({
        where: { id },
    });

    return deletedUser;
};

export const getUserEventsService = async (userId: number) => {
    const userEvents = await prisma.users.findUnique({
        where: { id: userId },
        include: {
            registrations: {
                include: { event: true },
            },
        },
    });

    if (!userEvents) {
        return null;
    }

    return userEvents.registrations;
};

export const getUserByIdService = async (id: number) => {
    const user = await prisma.users.findUnique({
        where: { id },
    });

    return user;
};
