import { RequestHandler } from "express";
import { createEventSchema, updateEventSchema } from "../schemas/eventSchema";
import {
    createEventService,
    deleteEventService,
    getEventByIdService,
    updateEventService,
    getEventByNameService,
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
