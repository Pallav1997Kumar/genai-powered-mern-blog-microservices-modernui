const dotenv = require("dotenv");

const {
    getDatabaseHealth
} = require("../config/database.config.js");
const logger = require("../utils/logger.js");


const FILE_NAME = "health.controller.js";



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
// Health Check - starts
// ============================================================
function getHealth(req, res) {

    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Health check request received`);
    }

    const databaseHealth = getDatabaseHealth();

    if (databaseHealth.connected) {

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Health check successful`);
        }

        return res.status(200).json({
            service: "blogpost-category-microservice",
            status: "UP",
            database: {
                type: "MongoDB Atlas",
                status: databaseHealth.status,
                connected: databaseHealth.connected
            },
            timestamp: new Date().toISOString()
        });
    }

    if(process.env.environment == "DEVELOPMENT"){
        logger.error(`[${FILE_NAME}] Health check failed`);
    }

    return res.status(503).json({
        service: "blogpost-category-microservice",
        status: "DOWN",
        database: {
            type: "MongoDB Atlas",
            status: databaseHealth.status,
            connected: databaseHealth.connected
        },
        timestamp: new Date().toISOString()
    });
}
// ============================================================
// Health Check - ends
// ============================================================



// ============================================================
// Controller Export - starts
// ============================================================
module.exports = {
    getHealth
};
// ============================================================
// Controller Export - ends
// ============================================================