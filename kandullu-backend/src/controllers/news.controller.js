import * as Yup from "yup";
import News from "../models/News";
import User from "../models/User";
import { ValidationError, NotFoundError } from "../utils/ApiError";

const newsController = {
    // Get all news
    getAllNews: async (req, res, next) => {
        try {
            const news = await News.findAll({
                include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }],
            });
            return res.status(200).json(news);
        } catch (error) {
            next(error);
        }
    },

    // Get news by ID
    getNewsById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const news = await News.findByPk(id, {
                include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }],
            });
            if (!news) {
                throw new NotFoundError("News not found");
            }
            return res.status(200).json(news);
        } catch (error) {
            next(error);
        }
    },

    // Create a new news
    createNews: async (req, res, next) => {
        try {
            const schema = Yup.object().shape({
                user_id: Yup.number().required(),
                title: Yup.string().required(),
                subtitle: Yup.string(),
                main_image: Yup.string(),
                content: Yup.string().required(),
            });

            await schema.validate(req.body, { abortEarly: false });

            const { user_id, title, subtitle, main_image, content } = req.body;

            const newNews = await News.create({
                user_id,
                title,
                subtitle,
                main_image,
                content,
            });

            return res.status(201).json(newNews);
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

    // Update news by ID
    updateNews: async (req, res, next) => {
        try {
            const { id } = req.params;
            const schema = Yup.object().shape({
                user_id: Yup.number(),
                title: Yup.string(),
                subtitle: Yup.string(),
                main_image: Yup.string(),
                content: Yup.string(),
            });

            await schema.validate(req.body, { abortEarly: false });

            const news = await News.findByPk(id);
            if (!news) {
                throw new NotFoundError("News not found");
            }

            const updatedNews = await news.update(req.body);

            return res.status(200).json(updatedNews);
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

    // Delete news by ID
    deleteNews: async (req, res, next) => {
        try {
            const { id } = req.params;

            const news = await News.findByPk(id);
            if (!news) {
                throw new NotFoundError("News not found");
            }

            await news.destroy();

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    },
};

export default newsController;
