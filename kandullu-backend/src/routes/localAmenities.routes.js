import { Router } from "express";
import localAmenitiesController from "../controllers/localAmenities.controller";

const localAmenitiesRoutes = Router();
localAmenitiesRoutes.post(
    "/local-amenities",
    localAmenitiesController.createLocalAmenity
);
localAmenitiesRoutes.delete(
    "/local-amenities/delete/:id",
    localAmenitiesController.deleteLocalAmenity
);
localAmenitiesRoutes.get(
    "/local-amenities",
    localAmenitiesController.getAllLocalAmenities
);
localAmenitiesRoutes.get(
    "/local-amenities/:id",
    localAmenitiesController.getLocalAmenityById
);
localAmenitiesRoutes.put(
    "/local-amenities/:id",
    localAmenitiesController.updateLocalAmenity
);

export { localAmenitiesRoutes };
