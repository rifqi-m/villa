import * as Yup from "yup";
import Restaurant from "../models/Restaurant";
import { ValidationError, NotFoundError } from "../utils/ApiError";

const restaurantController = {
    // Get all restaurants
    getAllRestaurants: async (req, res, next) => {
        try {
            const restaurants = await Restaurant.findAll();
            return res.status(200).json(restaurants);
        } catch (error) {
            next(error);
        }
    },

    // Get a restaurant by ID
    getRestaurantById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const restaurant = await Restaurant.findByPk(id);
            if (!restaurant) {
                throw new NotFoundError("Restaurant not found");
            }
            return res.status(200).json(restaurant);
        } catch (error) {
            next(error);
        }
    },

    // Create a new restaurant
    createRestaurant: async (req, res, next) => {
        try {
            const schema = Yup.object().shape({
                title: Yup.string().required(),
                about: Yup.string().required(),
                menu: Yup.object().required(),
                timings: Yup.object().required(),
                gallery: Yup.object().required(),
                description: Yup.string().required(),
                summary: Yup.string().max(150).required(),
            });

            await schema.validate(req.body, { abortEarly: false });

            const {
                title,
                about,
                menu,
                timings,
                gallery,
                description,
                summary,
            } = req.body;

            const newRestaurant = await Restaurant.create({
                title,
                about,
                menu,
                timings,
                gallery,
                description,
                summary,
            });

            return res.status(201).json(newRestaurant);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = error.inner.map((err) => ({
                    field: err.path,
                    message: err.message,
                }));
                return res.status(400).json({ errors });
            }
            next(error);
        }
    },

    // Update a restaurant by ID
    updateRestaurant: async (req, res, next) => {
        try {
            const { id } = req.params;
            const {
                title,
                about,
                menu,
                timings,
                gallery,
                description,
                summary,
            } = req.body;

            const schema = Yup.object().shape({
                title: Yup.string(),
                about: Yup.string(),
                menu: Yup.object(),
                timings: Yup.object(),
                gallery: Yup.object(),
                description: Yup.string(),
                summary: Yup.string().max(150),
            });

            await schema.validate(req.body, { abortEarly: false });

            const restaurant = await Restaurant.findByPk(id);
            if (!restaurant) {
                throw new NotFoundError("Restaurant not found");
            }

            await restaurant.update({
                title: title || restaurant.title,
                about: about || restaurant.about,
                menu: menu || restaurant.menu,
                timings: timings || restaurant.timings,
                gallery: gallery || restaurant.gallery,
                description: description || restaurant.description,
                summary: summary || restaurant.summary,
            });

            return res.status(200).json(restaurant);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = error.inner.map((err) => ({
                    field: err.path,
                    message: err.message,
                }));
                return res.status(400).json({ errors });
            }
            next(error);
        }
    },

    // Delete a restaurant by ID
    deleteRestaurant: async (req, res, next) => {
        try {
            const { id } = req.params;

            const restaurant = await Restaurant.findByPk(id);
            if (!restaurant) {
                throw new NotFoundError("Restaurant not found");
            }

            await restaurant.destroy();

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    },
};

export default restaurantController;
