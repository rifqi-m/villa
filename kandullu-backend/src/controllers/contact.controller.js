import * as Yup from "yup";
import ContactUs from "../models/Contact";
import { ValidationError, NotFoundError } from "../utils/ApiError";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const contactUsController = {
    // Get all contact messages
    getAllContacts: async (req, res, next) => {
        try {
            const contacts = await ContactUs.findAll();
            return res.status(200).json(contacts);
        } catch (error) {
            next(error);
        }
    },

    // Get contact message by ID
    getContactById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const contact = await ContactUs.findByPk(id);
            if (!contact) {
                throw new NotFoundError("Contact message not found");
            }
            return res.status(200).json(contact);
        } catch (error) {
            next(error);
        }
    },

    // Create a new contact message
    createContact: async (req, res, next) => {
        try {
            const schema = Yup.object().shape({
                full_name: Yup.string().required(),
                email: Yup.string().email().required(),
                phone_no: Yup.string().required(),
                message: Yup.string().required(),
            });

            await schema.validate(req.body, { abortEarly: false });

            const { full_name, email, phone_no, message } = req.body;

            const newContact = await ContactUs.create({
                full_name,
                email,
                phone_no,
                message,
            });

            const msg = {
              to: 'raufshakeel@gmail.com',
              from: 'your-email@example.com',
              subject: 'New Contact Us Message',
              text: `You have received a new message from ${full_name} (${email}, ${phone_no}): ${message}`,
              html: `<p>You have received a new message from <strong>${full_name}</strong> (${email}, ${phone_no}):</p><p>${message}</p>`,
          };

          await sgMail.send(msg);

            return res.status(201).json(newContact);
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

    // Update contact message by ID
    updateContact: async (req, res, next) => {
        try {
            const { id } = req.params;
            const schema = Yup.object().shape({
                full_name: Yup.string(),
                email: Yup.string().email(),
                phone_no: Yup.string(),
                message: Yup.string(),
            });

            await schema.validate(req.body, { abortEarly: false });

            const contact = await ContactUs.findByPk(id);
            if (!contact) {
                throw new NotFoundError("Contact message not found");
            }

            const updatedContact = await contact.update(req.body);

            return res.status(200).json(updatedContact);
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

    // Delete contact message by ID
    deleteContact: async (req, res, next) => {
        try {
            const { id } = req.params;

            const contact = await ContactUs.findByPk(id);
            if (!contact) {
                throw new NotFoundError("Contact message not found");
            }

            await contact.destroy();

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    },
};

export default contactUsController;
