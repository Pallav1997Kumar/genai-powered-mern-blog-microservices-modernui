const SuccessMessage = require("../constants/success-message.constant.js");
const authService = require("../services/auth.service.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "auth.controller.js";



// ============================================================
// Register User - starts
// ============================================================
async function registerUser(req, res) {
    devLogger.info(`[${FILE_NAME}] Register user request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Calling auth service for user registration`);
        const result = await authService.registerUser(req.body);
        devLogger.success(`[${FILE_NAME}] User registered successfully`);

        devLogger.info(`[${FILE_NAME}] Sending registration response to client`);

        return res.status(201).json({
            success:true,
            error:false,
            successMessage:result,
            errorMessage:"",
            resultData:[]
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to register user`, error);
        devLogger.warn(`[${FILE_NAME}] Register user request could not be completed`);

        return res.status(400).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:error.message,
            resultData:[]
        });
    }
}
// ============================================================
// Register User - ends
// ============================================================



// ============================================================
// Login User - starts
// ============================================================
async function loginUser(req, res) {
    devLogger.info(`[${FILE_NAME}] Login user request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Calling auth service for user login`);
        const result =await authService.loginUser(req.body.email, req.body.password);

        devLogger.info(`[${FILE_NAME}] Setting authentication cookie`);
        res.cookie(
            "jwt_access_token",
            result.jwtToken,
            {
                httpOnly:true
            }
        );

        devLogger.success(`[${FILE_NAME}] User logged in successfully`);
        devLogger.info(`[${FILE_NAME}] Sending login response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.USER_LOGGED_IN,
            errorMessage:"",
            resultData:result
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to login user`, error);
        devLogger.warn(`[${FILE_NAME}] Login user request could not be completed`);

        return res.status(401).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:error.message,
            resultData:[]
        });
    }
}
// ============================================================
// Login User - ends
// ============================================================



// ============================================================
// Logout User - starts
// ============================================================
async function logoutUser(req, res) {
    devLogger.info(`[${FILE_NAME}] Logout user request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Clearing authentication cookie`);
        res.clearCookie("jwt_access_token");

        devLogger.success(`[${FILE_NAME}] User logged out successfully`);
        devLogger.info(`[${FILE_NAME}] Sending logout response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.LOGOUT_SUCCESSFUL,
            errorMessage:"",
            resultData:[]
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to logout user`, error);
        devLogger.warn(`[${FILE_NAME}] Logout user request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:error.message,
            resultData:[]
        });
    }
}
// ============================================================
// Logout User - ends
// ============================================================



// ============================================================
// Controller Exports - starts
// ============================================================
module.exports = {
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser
};
// ============================================================
// Controller Exports - ends
// ============================================================
