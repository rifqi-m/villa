import * as Yup from "yup";
import LocalAmenity from "../models/LocalAmenities";
import { ValidationError, NotFoundError } from "../utils/ApiError";

const localAmenityController = {
    // Get all local amenities
    getAllLocalAmenities: async (req, res, next) => {
        try {
            const localAmenities = await LocalAmenity.findAll();
            return res.status(200).json(localAmenities);
        } catch (error) {
            next(error);
        }
    },

    // Get a local amenity by ID
    getLocalAmenityById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const localAmenity = await LocalAmenity.findByPk(id);
            if (!localAmenity) {
                throw new NotFoundError("Local amenity not found");
            }
            return res.status(200).json(localAmenity);
        } catch (error) {
            next(error);
        }
    },

    // Create a new local amenity
    createLocalAmenity: async (req, res, next) => {
        try {
            const schema = Yup.object().shape({
                title: Yup.string().max(100).required(),
                description: Yup.string().max(200).required(),
                image: Yup.string().required(),
                path: Yup.string().required(),
            });

            await schema.validate(req.body, { abortEarly: false });

            const { title, description, image, path } = req.body;

            const newLocalAmenity = await LocalAmenity.create({
                title,
                description,
                image,
                path,
            });

            return res.status(201).json(newLocalAmenity);
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

    // Update a local amenity by ID
    updateLocalAmenity: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, description, image, path } = req.body;

            const schema = Yup.object().shape({
                title: Yup.string().max(100),
                description: Yup.string().max(200),
                image: Yup.string(),
                path: Yup.string(),
            });

            await schema.validate(req.body, { abortEarly: false });

            const localAmenity = await LocalAmenity.findByPk(id);
            if (!localAmenity) {
                throw new NotFoundError("Local amenity not found");
            }

            await localAmenity.update({
                title: title || localAmenity.title,
                description: description || localAmenity.description,
                image: image || localAmenity.image,
                path: path || localAmenity.path,
            });

            return res.status(200).json(localAmenity);
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

    // Delete a local amenity by ID
    deleteLocalAmenity: async (req, res, next) => {
        try {
            const { id } = req.params;

            const localAmenity = await LocalAmenity.findByPk(id);
            if (!localAmenity) {
                throw new NotFoundError("Local amenity not found");
            }

            await localAmenity.destroy();

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    },
};

export default localAmenityController;
