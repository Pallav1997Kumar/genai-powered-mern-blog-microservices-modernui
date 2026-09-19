const dotenv = require("dotenv");
const mongoose = require("mongoose");


const logger = require("../utils/logger.js");


const FILE_NAME = "database.config.js";



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

const databaseURL = process.env.databaseURL;
// ============================================================
// Environment Configuration - ends
// ============================================================



// ============================================================
// Database Connection - starts
// ============================================================
async function connectDatabase() {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Database connection request started`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Connecting to MongoDB database`);
        }

        await mongoose.connect(databaseURL);

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Connected to MongoDB database successfully`);
        }
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Unable to connect to MongoDB database`);
            logger.error(error);
        }

        process.exit(1);
    }
};
// ============================================================
// Database Connection - ends
// ============================================================



// ============================================================
// Database Disconnection - starts
// ============================================================
async function disconnectDatabase() {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Database disconnection request started`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Disconnecting from MongoDB database`);
        }

        await mongoose.connection.close();

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] MongoDB Atlas disconnected successfully`);
        }

    } 
    catch (error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] MongoDB Atlas disconnection failed`);
            logger.error(error);
        }

        throw error;
    }
}
// ============================================================
// Database Disconnection - ends
// ============================================================



// ============================================================
// Database Health Check - starts
// ============================================================
function getDatabaseHealth() {

    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Database health check request started`);
    }
    const state = mongoose.connection.readyState;

    const states = {
        0: "disconnected",
        1: "connected",
        2: "connecting",
        3: "disconnecting"
    };

    const databaseStatus = states[state] || "unknown";
    const connected = state === 1;

    if(process.env.environment == "DEVELOPMENT"){
        logger.success(`[${FILE_NAME}] Database health status: ${databaseStatus}`);
    }

    if(process.env.environment == "DEVELOPMENT"){
        logger.success(`[${FILE_NAME}] Database connected: ${connected}`);
    }

    return {
        status: databaseStatus,
        connected: connected
    };
}
// ============================================================
// Database Health Check - ends
// ============================================================



// ============================================================
// Module Exports - starts
// ============================================================
module.exports = {
    connectDatabase,
    disconnectDatabase,
    getDatabaseHealth
};
// ============================================================
// Module Exports - ends
// ============================================================
