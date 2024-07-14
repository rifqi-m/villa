import * as Yup from "yup";
import Review from "../models/Review";
import User from "../models/User";
import Villa from "../models/Villa";
import {
    BadRequestError,
    ValidationError,
    NotFoundError,
} from "../utils/ApiError";

const reviewController = {
    // Create a new review
    add: async (req, res, next) => {
        try {
            const schema = Yup.object().shape({
                stars: Yup.number().required().min(1).max(5),
                message: Yup.string().required(),
                user_id: Yup.number().required(),
                villa_id: Yup.number().required(),
            });

            if (!(await schema.isValid(req.body))) {
                throw new ValidationError("Validation failed");
            }

            const { user_id, villa_id } = req.body;

            // Check if user and villa exist
            const user = await User.findByPk(user_id);
            if (!user) {
                throw new NotFoundError("User not found");
            }

            const villa = await Villa.findByPk(villa_id);
            if (!villa) {
                throw new NotFoundError("Villa not found");
            }

            const newReview = await Review.create(req.body);

            return res.status(201).json(newReview);
        } catch (error) {
            next(error);
        }
    },

    // Get all reviews
    getAllReviews: async (req, res, next) => {
        try {
            const reviews = await Review.findAll();
            return res.status(200).json(reviews);
        } catch (error) {
            next(error);
        }
    },

    // Get a review by ID
    getReviewById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const review = await Review.findByPk(id);
            if (!review) {
                throw new NotFoundError("Review not found");
            }
            return res.status(200).json(review);
        } catch (error) {
            next(error);
        }
    },

    // Update a review by ID
    updateReview: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { stars, message } = req.body;

            const schema = Yup.object().shape({
                stars: Yup.number().min(1).max(5),
                message: Yup.string(),
            });

            if (!(await schema.isValid(req.body))) {
                throw new ValidationError("Validation failed");
            }

            const review = await Review.findByPk(id);
            if (!review) {
                throw new NotFoundError("Review not found");
            }

            await review.update({
                stars: stars || review.stars,
                message: message || review.message,
            });

            return res.status(200).json(review);
        } catch (error) {
            next(error);
        }
    },

    // Delete a review by ID
    deleteReview: async (req, res, next) => {
        try {
            const { id } = req.params;

            const review = await Review.findByPk(id);
            if (!review) {
                throw new NotFoundError("Review not found");
            }

            await review.destroy();

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    },

    getReviewsByVillaId: async (req, res, next) => {
        try {
            const { villa_id } = req.params;

            const schema = Yup.number().required();

            if (!(await schema.isValid(villa_id))) {
                throw new ValidationError("Invalid villa_id");
            }

            const villa = await Villa.findByPk(villa_id);
            if (!villa) {
                throw new NotFoundError("Villa not found");
            }

            const reviews = await Review.findAll({
                where: { villa_id },
            });

            return res.status(200).json(reviews);
        } catch (error) {
            next(error);
        }
    },
};

export default reviewController;
