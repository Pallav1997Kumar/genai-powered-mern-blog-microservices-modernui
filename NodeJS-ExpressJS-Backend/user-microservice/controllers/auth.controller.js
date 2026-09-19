const dotenv = require("dotenv");

const authService = require("../services/auth.service.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "auth.controller.js";



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
// Register User - starts
// ============================================================
async function registerUser(req, res) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Register user request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling auth service for user registration`);
        }
        const result =
            await authService.registerUser(
                req.body
            );
        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User registered successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending registration response to client`);
        }
        res.status(201).json(result);
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to register user`, error);
            logger.warn(`[${FILE_NAME}] Register user request could not be completed`);
        }
        res.status(400).json({
            message:error.message
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
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Login user request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling auth service for user login`);
        }
        const result =
            await authService.loginUser(
                req.body.email,
                req.body.password
            );

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Setting authentication cookie`);
        }
        res.cookie(
            "jwt_access_token",
            result.token,
            {
                httpOnly:true
            }
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User logged in successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending login response to client`);
        }
        res.status(200).json(result);
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to login user`, error);
            logger.warn(`[${FILE_NAME}] Login user request could not be completed`);
        }
        res.status(401).json({
            message:error.message
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
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Logout user request received`);
    }

    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Clearing authentication cookie`);
    }
    res.clearCookie(
        "jwt_access_token"
    );

    if(process.env.environment == "DEVELOPMENT"){
        logger.success(`[${FILE_NAME}] User logged out successfully`);
    }

    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Sending logout response to client`);
    }
    res.json({
        message:"Logout successful"
    });
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
