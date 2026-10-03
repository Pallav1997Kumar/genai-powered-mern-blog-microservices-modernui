const httpClient = require("../utils/http-client.js");
const devLogger = require("../utils/dev-logger.js");

const { CLOUDINARY_SERVICE } = require("../config/services.js");
const createServiceError = require("../utils/service-error.js");
const { ImageUploadServiceErrorMessage } = require("../constants/error-message.constant.js");


const FILE_NAME = "image-upload.service.js";


// ============================================================
// Upload Blog Image - starts
// ============================================================
async function uploadBlogImage(data){
    devLogger.info(`[${FILE_NAME}] Blog image upload request started`);
    try{
        devLogger.info(`[${FILE_NAME}] Calling image upload service to upload blog image`);
        const response = await httpClient.post(
            `${CLOUDINARY_SERVICE}/api/image-upload/blogImage`,
            data
        );
        devLogger.info(`[${FILE_NAME}] Blog image upload service response received successfully`);
        devLogger.success(`[${FILE_NAME}] Blog image uploaded successfully`);
        devLogger.info(`[${FILE_NAME}] Returning blog image upload response`);
        return response.data;
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to upload blog image`, error);
        devLogger.warn(`[${FILE_NAME}] Blog image upload request could not be completed`);
        throw createServiceError(ImageUploadServiceErrorMessage.UPLOAD_BLOG_IMAGE_FAILED, error);
    }
};
// ============================================================
// Upload Blog Image - ends
// ============================================================



// ============================================================
// Upload Profile Photo - starts
// ============================================================
async function uploadProfilePhoto(data){
    devLogger.info(`[${FILE_NAME}] Profile photo upload request started`);
    try{
        devLogger.info(`[${FILE_NAME}] Calling image upload service to upload profile photo`);
        const response = await httpClient.post(
            `${CLOUDINARY_SERVICE}/api/image-upload/profilePhoto`,
            data
        );
        devLogger.info(`[${FILE_NAME}] Profile photo upload service response received successfully`);
        devLogger.success(`[${FILE_NAME}] Profile photo uploaded successfully`);
        devLogger.info(`[${FILE_NAME}] Returning profile photo upload response`);
        return response.data;
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to upload profile photo`, error);
        devLogger.warn(`[${FILE_NAME}] Profile photo upload request could not be completed`);
        throw createServiceError(ImageUploadServiceErrorMessage.UPLOAD_PROFILE_PHOTO_FAILED, error);
    }
};
// ============================================================
// Upload Profile Photo - ends
// ============================================================



// ============================================================
// Service Exports - starts
// ============================================================
module.exports = {
    uploadBlogImage,
    uploadProfilePhoto
};
// ============================================================
// Service Exports - ends
// ============================================================