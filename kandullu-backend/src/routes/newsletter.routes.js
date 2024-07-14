import { Router } from "express";
import newsLetterController from "../controllers/newsLetter.controller";

const newLetterRoutes = Router();
newLetterRoutes.post("/newsletter", newsLetterController.createSubscription);
newLetterRoutes.delete("/newsletter/:id", newsLetterController.deleteSubscription);
newLetterRoutes.get("/newsletter", newsLetterController.getAllSubscriptions);
newLetterRoutes.get("/newsletter/:id", newsLetterController.getSubscriptionById);
newLetterRoutes.put("/newsletter/:id", newsLetterController.updateSubscription);

export { newLetterRoutes };
