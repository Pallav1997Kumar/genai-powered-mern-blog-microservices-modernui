const dotenv = require("dotenv");

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
        console.log(`[${FILE_NAME}] Health check request received`);
    }

    if(process.env.environment == "DEVELOPMENT"){
        console.log(`[${FILE_NAME}] Health check successful`);
    }

    return res.status(200).json({
        service: "microservice-api-gateway",
        status: "UP",
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
