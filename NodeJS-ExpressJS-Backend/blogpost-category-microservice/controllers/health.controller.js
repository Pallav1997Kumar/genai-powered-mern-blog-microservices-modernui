const {
    getDatabaseHealth
} = require("../config/database.config.js");
const devLogger = require("../utils/dev-logger.js");


const FILE_NAME = "health.controller.js";



// ============================================================
// Health Check - starts
// ============================================================
function getHealth(req, res) {
    devLogger.info(`[${FILE_NAME}] Health check request received`);

    const databaseHealth = getDatabaseHealth();

    if (databaseHealth.connected) {
        devLogger.success(`[${FILE_NAME}] Health check successful`);

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

    devLogger.error(`[${FILE_NAME}] Health check failed`);

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