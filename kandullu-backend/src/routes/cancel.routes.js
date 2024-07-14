import { Router } from "express";
import cancelController from "../controllers/bookingCancel.controller";

const cancelRoutes = new Router();

cancelRoutes.get("/cancel-booking/approve/:id", cancelController.approveRequest);
cancelRoutes.get("/cancel-booking/deny/:id", cancelController.denyRequest);
cancelRoutes.get("/cancel-booking", cancelController.getAllRequests);
cancelRoutes.post("/cancel-booking", cancelController.createRequest);

export {cancelRoutes};
