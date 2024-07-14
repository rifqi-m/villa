// controllers/newsLetterController.js
import * as Yup from 'yup';
import NewsLetter from '../models/NewsLetter';
import { ValidationError, NotFoundError } from '../utils/ApiError';

const newsLetterController = {
    getAllSubscriptions: async (req, res, next) => {
        try {
            const subscriptions = await NewsLetter.findAll();
            return res.status(200).json(subscriptions);
        } catch (error) {
            next(error);
        }
    },

    getSubscriptionById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const subscription = await NewsLetter.findByPk(id);
            if (!subscription) {
                throw new NotFoundError("Subscription not found");
            }
            return res.status(200).json(subscription);
        } catch (error) {
            next(error);
        }
    },

    createSubscription: async (req, res, next) => {
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email().required(),
            });

            await schema.validate(req.body, { abortEarly: false });

            const { email } = req.body;

            const newSubscription = await NewsLetter.create({
                email,
            });

            return res.status(201).json(newSubscription);
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

    updateSubscription: async (req, res, next) => {
        try {
            const { id } = req.params;
            const schema = Yup.object().shape({
                email: Yup.string().email(),
            });

            await schema.validate(req.body, { abortEarly: false });

            const subscription = await NewsLetter.findByPk(id);
            if (!subscription) {
                throw new NotFoundError("Subscription not found");
            }

            const updatedSubscription = await subscription.update(req.body);

            return res.status(200).json(updatedSubscription);
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

    deleteSubscription: async (req, res, next) => {
        try {
            const { id } = req.params;

            const subscription = await NewsLetter.findByPk(id);
            if (!subscription) {
                throw new NotFoundError("Subscription not found");
            }

            await subscription.destroy();

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    },
};

export default newsLetterController;
