const express = require("express");
const multer = require("multer");

const {
    uploadBlogImage,
    uploadProfilePhoto
} = require("../config/multer.config.js");

const {
    uploadBlogImageController,
    uploadProfilePhotoController
} = require("../controllers/image-upload.controller.js");

const logger = require("../utils/logger.js");

const router = express.Router();

const FILE_NAME = "image-upload.routes.js";



// ============================================================
// Blog Image Upload Route Starts
// ============================================================
router.post(
    "/blogImage",
    uploadBlogImage.single("blogImage"),
    uploadBlogImageController
);
// ============================================================
// Blog Image Upload Route Ends
// ============================================================


// ============================================================
// Profile Photo Upload Route Starts
// ============================================================
router.post(
    "/profilePhoto",
    uploadProfilePhoto.single("profilePhoto"),
    uploadProfilePhotoController
);
// ============================================================
// Profile Photo Upload Route Ends
// ============================================================


// ============================================================
// Image Upload Error Handler Starts
// ============================================================
router.use(function (error, req, res, next) {
    logger.error(`[${FILE_NAME}] Image upload request failed: `, error);

    if (error instanceof multer.MulterError) {
        logger.warn(`[${FILE_NAME}] Multer error: ${error.code}`);
        if (error.code === "LIMIT_FILE_SIZE") {
            logger.warn(`[${FILE_NAME}] Uploaded image exceeds the 10 MB limit`);
            return res.status(413).json({
                message: "Image exceeds the 10 MB limit"
            });
        }
        return res.status(400).json({
            message: error.message
        });
    }

    if (error) {
        const statusCode = error.statusCode || 500;
        const message = statusCode === 500
            ? "Image upload failed"
            : error.message;

        logger.warn(`[${FILE_NAME}] Returning image upload error with status ${statusCode}`);
        return res.status(statusCode).json({
            message
        });
    }
    next();
});
// ============================================================
// Image Upload Error Handler Ends
// ============================================================


// ============================================================
// Router Export Starts
// ============================================================
module.exports = router;
// ============================================================
// Router Export Ends
// ============================================================