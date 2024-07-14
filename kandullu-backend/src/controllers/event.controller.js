import * as Yup from "yup";
import Event from "../models/Event";

const eventController = {
    createEvent: async (req, res, next) => {
        try {
            const schema = Yup.object().shape({
                href: Yup.string().required(),
                name: Yup.string().required(),
                description: Yup.string().required(),
                thumbnail: Yup.string().required(),
            });

            await schema.validate(req.body, { abortEarly: false });

            const { href, name, description, thumbnail } = req.body;

            const newEvent = await Event.create({
                href,
                name,
                description,
                thumbnail,
            });

            return res.status(201).json(newEvent);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = error.inner.map(err => ({
                    field: err.path,
                    message: err.message,
                }));
                return res.status(400).json({ errors });
            }
            next(error);
        }
    },

    getAllEvents: async (req, res, next) => {
        try {
            const events = await Event.findAll();
            return res.status(200).json(events);
        } catch (error) {
            next(error);
        }
    },

    getEventById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const event = await Event.findByPk(id);

            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }

            return res.status(200).json(event);
        } catch (error) {
            next(error);
        }
    },

    updateEvent: async (req, res, next) => {
        try {
            const schema = Yup.object().shape({
                href: Yup.string(),
                name: Yup.string(),
                description: Yup.string(),
                thumbnail: Yup.string(),
            });

            await schema.validate(req.body, { abortEarly: false });

            const { id } = req.params;
            const event = await Event.findByPk(id);

            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }

            await event.update(req.body);

            return res.status(200).json(event);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = error.inner.map(err => ({
                    field: err.path,
                    message: err.message,
                }));
                return res.status(400).json({ errors });
            }
            next(error);
        }
    },

    deleteEvent: async (req, res, next) => {
        try {
            const { id } = req.params;
            const event = await Event.findByPk(id);

            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }

            await event.destroy();

            return res.status(200).json({ message: "Event deleted" });
        } catch (error) {
            next(error);
        }
    },
};

export default eventController;