import { Router } from "express";
import fileController from "../controllers/file.controller";

const fileRoutes = Router();
fileRoutes.post("/file/uploadMedia", fileController.uploadFiles);
// fileRoutes.delete("/faq/delete/:id", faqController.deleteFAQ);
// fileRoutes.get("/faq", faqController.getAllFAQs);
// fileRoutes.get("/faq/:id", faqController.getFAQById);
// fileRoutes.put("/faq/:id", faqController.updateFAQ);

export { fileRoutes };
