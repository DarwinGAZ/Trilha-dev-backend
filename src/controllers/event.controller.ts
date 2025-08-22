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
    exportEventUsersService,
} from "../services/events";
import { createJwt, verifyJwt } from "../libs/jwt";
import { sendEmail } from "../libs/nodemailer";
import { getUserByIdService } from "../services/users";

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

    const token = createJwt(newEvent.id);

    return res.status(201).json({
        event: newEvent,
        token,
    });
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

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token não fornecido!" });
    }

    const verifyToken = verifyJwt(token);

    if (!verifyToken) {
        return res.status(401).json({ error: "Token inválido ou expirado!" });
    }

    if (verifyToken.eventId !== Number(id)) {
        return res.status(403).json({
            error: "Você não tem permissão para deletar este evento!",
        });
    }

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

    const user = await getUserByIdService(data.data.userId);

    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await sendEmail(
        user.name,
        user.email,
        event.name,
        event.startDate.toLocaleDateString(),
        event.local
    );

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

export const exportEventUsers: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const numberId = Number(id);

    const jsonData = await exportEventUsersService(numberId);

    res.setHeader(
        "Content-Disposition",
        "attachment; filename=registrations.json"
    );
    res.setHeader("Content-Type", "application/json");
    res.send(jsonData);

    return res
        .status(200)
        .json({ message: "Usuários do evento exportados com sucesso!" });
};
