import * as Yup from "yup";
import User from "../models/User";
import { ValidationError, NotFoundError } from "../utils/ApiError";

const userController = {
    // Create a new user
    add: async (req, res, next) => {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().email().required(),
                phoneNumber: Yup.string().nullable(),
                password: Yup.string().required(),
            });

            if (!(await schema.isValid(req.body))) {
                throw new ValidationError("Validation failed");
            }

            const newUser = await User.create(req.body);

            return res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    },

    // Get all users
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },

    // Get a user by ID
    getUserById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                throw new NotFoundError("User not found");
            }
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    // Update a user by ID
    updateUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, email, phoneNumber, password_hash, role } = req.body;

            const schema = Yup.object().shape({
                name: Yup.string(),
                email: Yup.string().email(),
                phoneNumber: Yup.string().nullable(),
                role: Yup.string().nullable(),
            });

            if (!(await schema.isValid(req.body))) {
                throw new ValidationError("Validation failed");
            }

            const user = await User.findByPk(id);
            if (!user) {
                throw new NotFoundError("User not found");
            }

            await user.update({
                name: name || user.name,
                email: email || user.email,
                phoneNumber: phoneNumber || user.phoneNumber,
                role: role || user.role,
            });

            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    // Delete a user by ID
    deleteUser: async (req, res, next) => {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);
            if (!user) {
                throw new NotFoundError("User not found");
            }

            await user.destroy();

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    },

    addAddress: async (req, res, next) => {
        try {
            const { body, userId } = req;

            const schema = Yup.object().shape({
                city: Yup.string().required(),
                state: Yup.string().required(),
                neighborhood: Yup.string().required(),
                country: Yup.string().required(),
            });

            if (!(await schema.isValid(body.address)))
                throw new ValidationError();

            const user = await User.findByPk(userId);

            let address = await Address.findOne({
                where: { ...body.address },
            });

            if (!address) {
                address = await Address.create(body.address);
            }

            await user.addAddress(address);

            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },
};

export default userController;
