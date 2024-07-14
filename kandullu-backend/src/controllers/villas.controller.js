import * as Yup from "yup";
import Villa from "../models/Villa";
import Booking from "../models/Booking";
import {
    BadRequestError,
    ValidationError,
    NotFoundError,
} from "../utils/ApiError";

const villaController = {
    // Create a new villa
    add: async (req, res, next) => {
        try {
            const schema = Yup.object().shape({
                title: Yup.string().required(),
                about: Yup.string().required(),
                facilities: Yup.object().required(),
                room_rates: Yup.object().required(),
                is_rented: Yup.boolean().required(),
                rent_start: Yup.date().nullable(),
                rent_end: Yup.date().nullable(),
                gallery: Yup.object().required(),
                booking_id: Yup.number().nullable(),
                baths: Yup.number().required(),
                beds: Yup.number().required(),
                max_guest: Yup.number().required(),
                description: Yup.string().required(),
                summary: Yup.string().required().max(150),
            });

            if (!(await schema.isValid(req.body))) {
                throw new ValidationError("Validation failed");
            }

            const { booking_id } = req.body;

            // Check if booking exists if booking_id is provided
            if (booking_id) {
                const booking = await Booking.findByPk(booking_id);
                if (!booking) {
                    throw new NotFoundError("Booking not found");
                }
            }

            const newVilla = await Villa.create(req.body);

            return res.status(201).json(newVilla);
        } catch (error) {
            next(error);
        }
    },

    // Get all villas
    getAllVillas: async (req, res, next) => {
        try {
            const villas = await Villa.findAll();
            return res.status(200).json(villas);
        } catch (error) {
            next(error);
        }
    },

    // Get a villa by ID
    getVillaById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const villa = await Villa.findByPk(id);
            if (!villa) {
                throw new NotFoundError("Villa not found");
            }
            return res.status(200).json(villa);
        } catch (error) {
            next(error);
        }
    },

    // Update a villa by ID
    updateVilla: async (req, res, next) => {
        try {
            const { id } = req.params;

            const schema = Yup.object().shape({
                title: Yup.string(),
                about: Yup.string(),
                facilities: Yup.object(),
                room_rates: Yup.object(),
                is_rented: Yup.boolean(),
                rent_start: Yup.date().nullable(),
                rent_end: Yup.date().nullable(),
                gallery: Yup.object(),
                booking_id: Yup.number().nullable(),
                baths: Yup.number(),
                beds: Yup.number(),
                max_guest: Yup.number(),
                description: Yup.string(),
                summary: Yup.string().max(150),
            });

            if (!(await schema.isValid(req.body))) {
                throw new ValidationError("Validation failed");
            }

            const villa = await Villa.findByPk(id);
            if (!villa) {
                throw new NotFoundError("Villa not found");
            }

            await villa.update(req.body);

            return res.status(200).json(villa);
        } catch (error) {
            next(error);
        }
    },

    getVillaNames: async (req, res, next) => {
        try {
            const villas = await Villa.findAll({
                attributes: ['id', 'title']
            });
            return res.status(200).json(villas);
        } catch (error) {
            next(error);
        }
    },

    // Delete a villa by ID
    deleteVilla: async (req, res, next) => {
        try {
            const { id } = req.params;

            const villa = await Villa.findByPk(id);
            if (!villa) {
                throw new NotFoundError("Villa not found");
            }

            await villa.destroy();

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    },

    // Rent a villa
    rentVilla: async (req, res, next) => {
        try {
            const { id } = req.params;

            const schema = Yup.object().shape({
                rent_start: Yup.date().required(),
                rent_end: Yup.date().required(),
            });

            if (!(await schema.isValid(req.body))) {
                throw new ValidationError("Validation failed");
            }

            const villa = await Villa.findByPk(id);
            if (!villa) {
                throw new NotFoundError("Villa not found");
            }

            const { rent_start, rent_end } = req.body;

            await villa.update({
                is_rented: true,
                rent_start,
                rent_end,
            });

            return res.status(200).json(villa);
        } catch (error) {
            next(error);
        }
    },
};

export default villaController;
