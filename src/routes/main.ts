import Router from "express";
import * as pingController from "../controllers/ping.controller";
import * as eventController from "../controllers/event.controller";

export const routes = Router();

routes.get("/ping", pingController.ping);

routes.post("/event", eventController.createEvent);
routes.get("/event/:id", eventController.getEventById);
routes.patch("/event/:id", eventController.updateEvent);
routes.delete("/event/:id", eventController.deleteEvent);
