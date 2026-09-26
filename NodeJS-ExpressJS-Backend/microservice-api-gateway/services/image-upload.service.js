const httpClient = require("../utils/httpClient");
const devLogger = require("../utils/dev-logger.js");

const {
    CLOUDINARY_SERVICE
} = require("../config/services.js");


const FILE_NAME = "image-upload.service.js";


// Upload Blog Image
const uploadBlogImage = async function(data){
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
        throw {
            message:"Failed to upload blog image",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};


// Upload Profile Photo
const uploadProfilePhoto = async function(data){
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
        throw {
            message:"Failed to upload profile photo",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};


module.exports = {
    uploadBlogImage,
    uploadProfilePhoto
};