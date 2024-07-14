import { Router } from "express";
import restaurantController from "../controllers/restaurant.controller";

const restaurantRoutes = Router();
restaurantRoutes.post("/restaurant", restaurantController.createRestaurant);
restaurantRoutes.delete(
    "/restaurant/delete/:id",
    restaurantController.deleteRestaurant
);
restaurantRoutes.get("/restaurant", restaurantController.getAllRestaurants);
restaurantRoutes.get("/restaurant/:id", restaurantController.getRestaurantById);
restaurantRoutes.put("/restaurant/:id", restaurantController.updateRestaurant);

export { restaurantRoutes };
