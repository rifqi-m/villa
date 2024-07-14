import { Router } from "express";
import eventController from "../controllers/event.controller";

const eventRoutes = new Router();

eventRoutes.post("/event", eventController.createEvent);
eventRoutes.get("/event", eventController.getAllEvents);
eventRoutes.get("/event/:id", eventController.getEventById);
eventRoutes.put("/event/:id", eventController.updateEvent);
eventRoutes.delete("/event/:id", eventController.deleteEvent);

export {eventRoutes};
