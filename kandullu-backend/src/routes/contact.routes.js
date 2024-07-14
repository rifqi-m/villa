import { Router } from "express";
import contactController from "../controllers/contact.controller";

const contactUsRoutes = Router();
contactUsRoutes.post("/contact-us", contactController.createContact);
contactUsRoutes.delete("/contact-us/:id", contactController.deleteContact);
contactUsRoutes.get("/contact-us", contactController.getAllContacts);
contactUsRoutes.get("/contact-us/:id", contactController.getContactById);
contactUsRoutes.put("/contact-us/:id", contactController.updateContact);

export { contactUsRoutes };