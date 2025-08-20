import { prisma } from "../libs/prisma";

interface createEventInput {
    name: string;
    description: string;
    local: string;
    startDate: string;
    vacanciesLimit: number;
}

interface updateEventInput {
    name?: string;
    description?: string;
    local?: string;
    startDate?: string;
    vacanciesLimit?: number;
}

export const createEventService = async (data: createEventInput) => {
    const newEvent = await prisma.events.create({
        data: {
            ...data,
            startDate: new Date(data.startDate),
        },
    });

    return newEvent;
};

export const getEventByIdService = async (id: string) => {
    const event = await prisma.events.findUnique({
        where: {
            id: Number(id),
        },
    });

    return event;
};

export const updateEventService = async (
    id: number,
    data: updateEventInput
) => {
    const updatedEvent = await prisma.events.update({
        where: { id },
        data: {
            ...data,
            startDate: data.startDate ? new Date(data.startDate) : undefined,
        },
    });

    return updatedEvent;
};

export const deleteEventService = async (id: number) => {
    try {
        const deletedEvent = await prisma.events.delete({
            where: { id },
        });
        return deletedEvent;
    } catch (err) {
        console.error("Erro ao deletar evento:", err);
        return null;
    }
};

export const getEventByNameService = async (name: string) => {
    const event = await prisma.events.findUnique({
        where: {
            name: name.toLowerCase(),
        },
    });

    return event;
};

export const registerUserToEventService = async (
    eventId: number,
    userId: number
) => {
    const registration = await prisma.registrations.create({
        data: {
            eventId: Number(eventId),
            userId,
        },
    });

    return registration;
};

export const unregisterUserFromEventService = async (
    eventId: number,
    userId: number
) => {
    try {
        const registration = await prisma.registrations.delete({
            where: {
                userId_eventId: {
                    userId,
                    eventId,
                },
            },
        });
        return registration;
    } catch (err) {
        console.error("Erro ao cancelar inscrição:", err);
        return null;
    }
};

export const getAllUsersInEventService = async (eventId: number) => {
    const registrations = await prisma.registrations.findMany({
        where: {
            eventId,
        },
        include: {
            user: true,
        },
    });

    return registrations.map((registration) => registration.user);
};

export const registrationCountService = async (eventId: number) => {
    const count = await prisma.registrations.count({
        where: {
            eventId,
        },
    });

    return count;
};

export const exportEventUsersService = async (id: number) => {
    const registrations = await prisma.registrations.findMany({
        where: { id },
        include: { user: true },
    });

    const jsonData = JSON.stringify(registrations, null, 2);

    return jsonData;
};
