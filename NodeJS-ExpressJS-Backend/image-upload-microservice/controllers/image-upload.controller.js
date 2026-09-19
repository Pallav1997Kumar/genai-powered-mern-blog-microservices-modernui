const dotenv = require("dotenv");

const logger = require("../utils/logger.js");

const FILE_NAME = "image-upload.controller.js";



// ============================================================
// Environment Configuration - starts
// ============================================================
const configPath =
    process.env.DEPLOYMENT_STRUCTURE ===
    "ALL_MICROSERVICES_ONE_DEPLOYMENT"
        ? "../config.env"
        : "./config.env";

dotenv.config({
    path: configPath
});
// ============================================================
// Environment Configuration - ends
// ============================================================



// ============================================================
// Upload Blog Image Starts
// ============================================================
function uploadBlogImageController(req, res) {
    if (process.env.environment === "development") {
        logger.info(`[${FILE_NAME}] Blog image upload request received`);
    }

    try {
        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Checking uploaded blog image`);
        }

        if (!req.file) {
            if (process.env.environment === "development") {
                logger.warn(`[${FILE_NAME}] No blog image was uploaded`);
            }

            return res.status(400).json({
                message: "Blog image is required"
            });
        }

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Blog image received: ${req.file.originalname}`);
            logger.success(`[${FILE_NAME}] Blog image uploaded successfully`);
            logger.info(`[${FILE_NAME}] Sending blog image upload response`);
        }

        return res.status(200).json({
            message: "Blog image uploaded successfully!",
            file: req.file
        });
    }
    catch (error) {
        logger.error(`[${FILE_NAME}] Blog image upload failed: `, error);

        return res.status(500).json({
            message: "Blog image upload failed"
        });
    }
}
// ============================================================
// Upload Blog Image Ends
// ============================================================



// ============================================================
// Upload Profile Photo Starts
// ============================================================
function uploadProfilePhotoController(req, res) {
    if (process.env.environment === "development") {
        logger.info(`[${FILE_NAME}] Profile photo upload request received`);
    }

    try {
        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Checking uploaded profile photo`);
        }

        if (!req.file) {
            if (process.env.environment === "development") {
                logger.warn(`[${FILE_NAME}] No profile photo was uploaded`);
            }

            return res.status(400).json({
                message: "Profile photo is required"
            });
        }

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Profile photo received: ${req.file.originalname}`);
            logger.info(`[${FILE_NAME}] Profile photo MIME type: ${req.file.mimetype}`);
            logger.success(`[${FILE_NAME}] Profile photo uploaded successfully`);
            logger.info(`[${FILE_NAME}] Sending profile photo upload response`);
        }

        return res.status(200).json({
            message: "Profile photo uploaded successfully!",
            file: req.file
        });
    }
    catch (error) {
        logger.error(`[${FILE_NAME}] Profile photo upload failed: `, error);

        return res.status(500).json({
            message: "Profile photo upload failed"
        });
    }
}
// ============================================================
// Upload Profile Photo Ends
// ============================================================



// ============================================================
// Controller Exports Starts
// ============================================================
module.exports = {
    uploadBlogImageController,
    uploadProfilePhotoController
};
// ============================================================
// Controller Exports Ends
// ============================================================