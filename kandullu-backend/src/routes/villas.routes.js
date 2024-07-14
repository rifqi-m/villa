import { Router } from "express";
import villaController from "../controllers/villas.controller";

const villaRoutes = Router();
villaRoutes.post("/villa", villaController.add);
villaRoutes.put("/villa/:id", villaController.updateVilla);
villaRoutes.get("/villa", villaController.getAllVillas);
villaRoutes.get("/villa-options", villaController.getVillaNames);
villaRoutes.get("/villa/:id", villaController.getVillaById);
villaRoutes.delete("/villa/:id", villaController.deleteVilla);

export { villaRoutes };
