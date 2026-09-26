const userService = require("../services/blog-user.service.js");

const handleError = require("../utils/errorHandler.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "blog-user.controller.js";



// ============================================================
// Update User Profile Photo Starts
// ============================================================
async function updateUserProfilePhoto(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Update user profile photo request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        const userID = req.params.userID;

        devLogger.info(`[${FILE_NAME}] Extracting profile photo request body`);
        const body = req.body;

        devLogger.info(`[${FILE_NAME}] Extracting request headers`);
        const headers = req.headers;

        devLogger.info(`[${FILE_NAME}] Calling user service to update profile photo`);
        const result = await userService.updateUserProfilePhoto(userID, body, headers);
        devLogger.info(`[${FILE_NAME}] User profile photo update service completed`);
        devLogger.success(`[${FILE_NAME}] User profile photo updated successfully`);

        devLogger.info(`[${FILE_NAME}] Sending profile photo update response to client`);

        return res.status(200).json(result);
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to update user profile photo`, error);
        devLogger.warn(`[${FILE_NAME}] User profile photo update request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Update User Profile Photo Ends
// ============================================================



// ============================================================
// Update User Basic Information Starts
// ============================================================
async function updateUserBasicInformation(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Update user basic information request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        const userID = req.params.userID;

        devLogger.info(`[${FILE_NAME}] Extracting basic information request body`);
        const body = req.body;

        devLogger.info(`[${FILE_NAME}] Extracting request headers`);
        const headers = req.headers;

        devLogger.info(`[${FILE_NAME}] Calling user service to update basic information`);
        const result = await userService.updateUserBasicInformation(userID, body, headers);

        devLogger.info(`[${FILE_NAME}] User basic information update service completed`);
        devLogger.success(`[${FILE_NAME}] User basic information updated successfully`);

        devLogger.info(`[${FILE_NAME}] Preparing basic information update response`);
        devLogger.info(`[${FILE_NAME}] Sending basic information update response to client`);

        return res.status(200).json(result);
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to update user basic information`, error);
        devLogger.warn(`[${FILE_NAME}] User basic information update request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Update User Basic Information Ends
// ============================================================



// ============================================================
// Update User Email Username Starts
// ============================================================
async function updateUserEmailUsername(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Update user email and username request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        const userID = req.params.userID;

        devLogger.info(`[${FILE_NAME}] Extracting email and username request body`);
        const body = req.body;

        devLogger.info(`[${FILE_NAME}] Extracting request headers`);
        const headers = req.headers;

        devLogger.info(`[${FILE_NAME}] Calling user service to update email and username`);
        const result = await userService.updateUserEmailUsername(userID, body, headers);

        devLogger.info(`[${FILE_NAME}] User email and username update service completed`);
        devLogger.success(`[${FILE_NAME}] User email and username updated successfully`);

        devLogger.info(`[${FILE_NAME}] Preparing email and username update response`);
        devLogger.info(`[${FILE_NAME}] Sending email and username update response to client`);

        return res.status(200).json(result);
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to update user email and username`, error);
        devLogger.warn(`[${FILE_NAME}] User email and username update request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Update User Email Username Ends
// ============================================================



// ============================================================
// Update User Password Starts
// ============================================================
async function updateUserPassword(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Update user password request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        const userID = req.params.userID;

        devLogger.info(`[${FILE_NAME}] Extracting password update request body`);
        const body = req.body;

        devLogger.info(`[${FILE_NAME}] Extracting request headers`);
        const headers = req.headers;

        devLogger.info(`[${FILE_NAME}] Calling user service to update password`);
        const result = await userService.updateUserPassword(userID, body, headers);

        devLogger.info(`[${FILE_NAME}] User password update service completed`);
        devLogger.success(`[${FILE_NAME}] User password updated successfully`);

        devLogger.info(`[${FILE_NAME}] Preparing password update response`);
        devLogger.info(`[${FILE_NAME}] Sending password update response to client`);

        return res.status(200).json(result);
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to update user password`, error);
        devLogger.warn(`[${FILE_NAME}] User password update request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Update User Password Ends
// ============================================================




// ============================================================
// Controller Exports Starts
// ============================================================
module.exports = {
    updateUserProfilePhoto,
    updateUserBasicInformation,
    updateUserEmailUsername,
    updateUserPassword
};
// ============================================================
// Controller Exports Ends
// ============================================================
