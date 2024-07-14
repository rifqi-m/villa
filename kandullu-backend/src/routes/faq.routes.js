import { Router } from "express";
import faqController from "../controllers/faq.controller";

const faqRoutes = Router();
faqRoutes.post("/faq/create", faqController.createFAQ);
faqRoutes.delete("/faq/delete/:id", faqController.deleteFAQ);
faqRoutes.get("/faq", faqController.getAllFAQs);
faqRoutes.get("/faq/:id", faqController.getFAQById);
faqRoutes.put("/faq/:id", faqController.updateFAQ);

export { faqRoutes };
