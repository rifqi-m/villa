import { Router } from "express";
import reviewController from "../controllers/review.controller";

const reviewRoutes = Router();
reviewRoutes.post("/review", reviewController.add);
reviewRoutes.delete("/review/:id", reviewController.deleteReview);
reviewRoutes.get("/review", reviewController.getAllReviews);
reviewRoutes.get("/review/:id", reviewController.getReviewById);
reviewRoutes.put("/review/:id", reviewController.updateReview);
reviewRoutes.get(
    "/villa-reviews/:villa_id",
    reviewController.getReviewsByVillaId
);

export { reviewRoutes };
