import { Router } from "express";
import newsController from "../controllers/news.controller";

const newsRoutes = Router();
newsRoutes.post("/news", newsController.createNews);
newsRoutes.put("/news/:id", newsController.updateNews);
newsRoutes.get("/news", newsController.getAllNews);
newsRoutes.get("/news/:id", newsController.getNewsById);
newsRoutes.delete("/news/:id", newsController.deleteNews);

export { newsRoutes };
