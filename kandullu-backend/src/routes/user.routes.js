import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const userRoutes = Router();
userRoutes.post("/user", userController.add);
userRoutes.post("/user/address", authMiddleware, userController.addAddress);
userRoutes.get("/user", userController.getAllUsers);
userRoutes.get("/user/:id", userController.getUserById);
userRoutes.put("/user", authMiddleware, userController.updateUser);
userRoutes.delete("/user/:id", authMiddleware, userController.deleteUser);

export { userRoutes };
