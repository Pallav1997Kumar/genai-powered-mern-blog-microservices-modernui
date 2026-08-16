const userService = require("../services/blog-user.service.js");

const handleError = require("../utils/errorHandler.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "authorization.controller.js";



// ============================================================
// Blog User Registration Starts
// ============================================================
async function blogUserRegistration(req,res){
    logger.info(`[${FILE_NAME}] Blog user registration request received`);

    try{
        logger.info(`[${FILE_NAME}] Extracting registration request body`);
        const body = req.body;

        logger.info(`[${FILE_NAME}] Calling user service for registration`);
        const result = await userService.registerUser(body);
        logger.success(`[${FILE_NAME}] Blog user registration completed successfully`);

        logger.info(`[${FILE_NAME}] Sending registration response to client`);
        return res.status(200).json(result);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Blog user registration failed: `, error);
        logger.warn(`[${FILE_NAME}] Registration request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Blog User Registration Ends
// ============================================================



// ============================================================
// Blog User Login Starts
// ============================================================
async function blogUserLogin(req,res){
    logger.info(`[${FILE_NAME}] Blog user login request received`);

    try{
        logger.info(`[${FILE_NAME}] Extracting login request body`);
        const body = req.body;

        logger.info(`[${FILE_NAME}] Calling user service for login`);
        const result = await userService.loginUser(body);
        logger.info(`[${FILE_NAME}] Login service execution completed`);

        if(result.cookies){
            logger.info(`[${FILE_NAME}] Authentication cookie received from login service`);
            res.setHeader(
                "Set-Cookie",
                result.cookies
            );
            logger.success(`[${FILE_NAME}] Authentication cookie attached to response`);
        }
        else {
            logger.warn(`[${FILE_NAME}] Login completed without authentication cookie`);
        }

        logger.success(`[${FILE_NAME}] Blog user login completed successfully`);

        logger.info(`[${FILE_NAME}] Sending login response to client`);
        return res.status(200).json(result.data);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Blog user login failed: `, error);
        logger.warn(`[${FILE_NAME}] Login request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Blog User Login Ends
// ============================================================



// ============================================================
// Delete User Account Starts
// ============================================================
async function blogUserAccountDelete(req,res){
    logger.warn(`[${FILE_NAME}] Blog user account deletion request received`);

    try{
        logger.info(`[${FILE_NAME}] Extracting authentication token from cookies`);
        const token = req.body.token || req.cookies?.jwt_access_token;

        logger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        const userID = req.params.userID;

        if (!token) {
            logger.warn(`[${FILE_NAME}] Account deletion requested without authentication token`);
        }

        if (!userID) {
            logger.warn(`[${FILE_NAME}] Account deletion requested without user ID`);
        }

        logger.info(`[${FILE_NAME}] Calling user service for account deletion`);
        const result = await userService.deleteUser(userID, token);
        logger.info(`[${FILE_NAME}] User service completed account deletion`);

        logger.info(`[${FILE_NAME}] Clearing authentication cookie`);
        res.clearCookie("jwt_access_token");
        logger.info(`[${FILE_NAME}] Cleared authentication cookie`);

        logger.success(`[${FILE_NAME}] Blog user account deleted successfully`);

        logger.info(`[${FILE_NAME}] Sending account deletion response to client`);
        return res.status(200).json(result);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Blog user account deletion failed: `,error);
        logger.warn(`[${FILE_NAME}] Account deletion request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Delete User Account Ends
// ============================================================



// ============================================================
// Logout User Starts
// ============================================================
async function blogUserLogout(req,res){
    logger.info(`[${FILE_NAME}] Blog user logout request received`);

    try{
        logger.info(`[${FILE_NAME}] Extracting authentication token from cookies`);
        const token = req.cookies?.jwt_access_token;

        if (!token) {
            logger.warn(`[${FILE_NAME}] Logout requested without authentication token`);
        }

        logger.info(`[${FILE_NAME}] Calling user service for logout`);
        const result = await userService.logout(token);
        logger.info(`[${FILE_NAME}] Logout service execution completed`);

        logger.info(`[${FILE_NAME}] Clearing authentication cookie`);
        res.clearCookie("jwt_access_token");
        logger.info(`[${FILE_NAME}] Cleared authentication cookie`);

        logger.success(`[${FILE_NAME}] Blog user logout completed successfully`);

        logger.info(`[${FILE_NAME}] Sending logout response to client`);
        return res.status(200).json(result);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Blog user logout failed`, error);
        logger.warn(`[${FILE_NAME}] Logout request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Logout User Ends
// ============================================================




// ============================================================
// Controller Exports Starts
// ============================================================
module.exports = {
    blogUserRegistration,
    blogUserLogin,
    blogUserAccountDelete,
    blogUserLogout
};
// ============================================================
// Controller Exports Ends
// ============================================================