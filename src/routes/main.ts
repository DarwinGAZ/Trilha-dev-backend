import Router from "express";
import * as pingController from "../controllers/ping.controller";
import * as eventController from "../controllers/event.controller";
import * as userController from "../controllers/user.controller";

export const routes = Router();

routes.get("/ping", pingController.ping);

routes.post("/event", eventController.createEvent);
routes.get("/event/:id", eventController.getEventById);
routes.patch("/event/:id", eventController.updateEvent);
routes.delete("/event/:id", eventController.deleteEvent);
routes.get("/event/:id/users/export", eventController.exportEventUsers);

routes.post("/event/:eventId/register", eventController.registerUserToEvent);
routes.delete(
    "/event/:eventId/unregister",
    eventController.unregisterUserFromEvent
);
routes.get("/event/:eventId/users", eventController.getAllUsersInEvent);

routes.post("/user", userController.createUser);
routes.get("/users", userController.getAllUsers);
routes.get("/user", userController.getUserByEmail);
routes.patch("/user/:id", userController.updateUser);
routes.delete("/user/:id", userController.deleteUser);
routes.get("/user/:userId/events", userController.getUserEvents);
