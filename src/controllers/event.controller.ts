import { RequestHandler } from "express";
import {
    createEventSchema,
    updateEventSchema,
    UserToEventSchema,
} from "../schemas/eventSchema";
import {
    createEventService,
    deleteEventService,
    getEventByIdService,
    updateEventService,
    getEventByNameService,
    registerUserToEventService,
    unregisterUserFromEventService,
    getAllUsersInEventService,
    registrationCountService,
} from "../services/events";

export const createEvent: RequestHandler = async (req, res) => {
    const data = createEventSchema.safeParse(req.body);

    if (!data.success) {
        return res.json({ error: data.error.flatten().fieldErrors });
    }

    const validatedData = data.data;

    const existingEvent = await getEventByNameService(validatedData.name);
    if (existingEvent) {
        res.status(400).json({ error: "Evento já existe!" });
        return;
    }

    const newEvent = await createEventService(validatedData);

    return res.status(201).json(newEvent);
};

export const getEventById: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const event = await getEventByIdService(id);

    if (!event) {
        return res.status(404).json({ error: "Evento não encontrado!" });
    }

    return res.status(200).json(event);
};

export const updateEvent: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const data = updateEventSchema.safeParse(req.body);

    if (!data.success) {
        return res.json({ error: data.error.flatten().fieldErrors });
    }

    const validatedData = data.data;

    const updatedEvent = await updateEventService(Number(id), validatedData);

    if (!updatedEvent) {
        return res.status(404).json({ error: "Evento não encontrado!" });
    }

    return res.status(200).json(updatedEvent);
};

export const deleteEvent: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const deletedEvent = await deleteEventService(Number(id));

    if (!deletedEvent) {
        return res.status(404).json({ error: "Evento não encontrado!" });
    }

    return res.status(200).json({ message: "Evento deletado com sucesso!" });
};

export const registerUserToEvent: RequestHandler = async (req, res) => {
    const { eventId } = req.params;
    const eventIdNumber = Number(eventId);

    const data = UserToEventSchema.safeParse(req.body);

    if (!data.success) {
        return res.json({ error: data.error.flatten().fieldErrors });
    }

    const event = await getEventByIdService(eventId);

    if (!event) {
        return res.status(404).json({ error: "Evento não encontrado" });
    }

    const count = await registrationCountService(eventIdNumber);
    if (event.vacanciesLimit && count >= event.vacanciesLimit) {
        return res
            .status(400)
            .json({ error: "Limite de vagas atingido para este evento!" });
    }

    const registration = await registerUserToEventService(
        eventIdNumber,
        data.data.userId
    );

    if (!registration) {
        return res.status(404).json({ error: "Dados invalidos" });
    }

    return res
        .status(201)
        .json({ message: "Usuário registrado no evento com sucesso!" });
};

export const unregisterUserFromEvent: RequestHandler = async (req, res) => {
    const { eventId } = req.params;
    const eventIdNumber = Number(eventId);

    const data = UserToEventSchema.safeParse(req.body);

    if (!data.success) {
        return res.json({ error: data.error.flatten().fieldErrors });
    }

    const unresgistration = await unregisterUserFromEventService(
        eventIdNumber,
        data.data.userId
    );

    if (!unresgistration) {
        return res.status(404).json({ error: "Dados invalidos" });
    }

    return res
        .status(200)
        .json({ message: "Usuário removido do evento com sucesso!" });
};

export const getAllUsersInEvent: RequestHandler = async (req, res) => {
    const { eventId } = req.params;
    const eventIdNumber = Number(eventId);

    const users = await getAllUsersInEventService(eventIdNumber);

    if (!users || users.length === 0) {
        return res
            .status(404)
            .json({ error: "Nenhum usuário ou evento encontrado" });
    }

    return res.status(200).json(users);
};
