const dotenv = require("dotenv");

const devLogger = require("../utils/loggers/dev-logger.js")

const FILE_NAME = "health.controller.js";



// ============================================================
// Health Check - starts
// ============================================================
function getHealth(req, res) {
    devLogger.info(`[${FILE_NAME}] Health check request received`);
    devLogger.success(`[${FILE_NAME}] Health check successful`);

    return res.status(200).json({
        service: "generative-ai-microservice",
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
