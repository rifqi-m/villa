import Sequelize, { Model } from "sequelize";
import * as Yup from "yup";
import AWS from "aws-sdk";
import multer from "multer";
import File from "../models/File";
import { BadRequestError, ValidationError } from "../utils/ApiError";

// Initialize S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Set up Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// File upload endpoint
const fileController = {
    uploadFiles: async (req, res, next) => {
        upload.array("files")(req, res, async (err) => {
            console.log("file uploading");
            if (err) {
                return next(new BadRequestError("Error uploading files"));
            }

            const schema = Yup.object().shape({
                files: Yup.array()
                    .of(
                        Yup.object().shape({
                            originalname: Yup.string().required(),
                            mimetype: Yup.string().required(),
                            buffer: Yup.mixed().required(),
                        })
                    )
                    .required(),
                folder: Yup.string().required(),
            });

            const files = req.files;
            const folder = req.body.folder;

            const validationBody = { files, folder };
            if (!(await schema.isValid(validationBody))) {
                return next(new ValidationError("Validation failed"));
            }
            console.log("file uploading end");
            try {
                const uploadedFiles = await Promise.all(
                    files.map(async (file) => {
                        const params = {
                            Bucket: process.env.S3_BUCKET_NAME,
                            Key: `${folder}/${Date.now()}_${file.originalname}`,
                            Body: file.buffer,
                            ContentType: file.mimetype,
                        };

                        const s3Response = await s3.upload(params).promise();
                        const fileUrl = s3Response.Location;

                        const newFile = await File.create({
                            path: fileUrl,
                            folder,
                        });

                        return newFile;
                    })
                );

                return res.status(201).json({ files: uploadedFiles });
            } catch (error) {
                next(error);
            }
        });
    },
};

export default fileController;
