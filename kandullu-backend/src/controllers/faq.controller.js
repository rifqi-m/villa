import * as Yup from "yup";
import FAQ from "../models/FAQ";
import { ValidationError, NotFoundError } from "../utils/ApiError";

const faqController = {
    // Get all FAQs
    getAllFAQs: async (req, res, next) => {
        try {
            const faqs = await FAQ.findAll();
            return res.status(200).json(faqs);
        } catch (error) {
            next(error);
        }
    },

    // Get a FAQ by ID
    getFAQById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const faq = await FAQ.findByPk(id);
            if (!faq) {
                throw new NotFoundError("FAQ not found");
            }
            return res.status(200).json(faq);
        } catch (error) {
            next(error);
        }
    },

    // Create a new FAQ
    createFAQ: async (req, res, next) => {
        try {
            const schema = Yup.object().shape({
                question: Yup.string().required(),
                answer: Yup.string().required(),
            });

            await schema.validate(req.body, { abortEarly: false });

            const { question, answer } = req.body;

            const newFAQ = await FAQ.create({
                question,
                answer,
            });

            return res.status(201).json(newFAQ);
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

    // Update a FAQ by ID
    updateFAQ: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { question, answer } = req.body;

            const schema = Yup.object().shape({
                question: Yup.string(),
                answer: Yup.string(),
            });

            await schema.validate(req.body, { abortEarly: false });

            const faq = await FAQ.findByPk(id);
            if (!faq) {
                throw new NotFoundError("FAQ not found");
            }

            await faq.update({
                question: question || faq.question,
                answer: answer || faq.answer,
            });

            return res.status(200).json(faq);
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

    // Delete a FAQ by ID
    deleteFAQ: async (req, res, next) => {
        try {
            const { id } = req.params;

            const faq = await FAQ.findByPk(id);
            if (!faq) {
                throw new NotFoundError("FAQ not found");
            }

            await faq.destroy();

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    },
};

export default faqController;
