const {
    getDatabaseHealth
} = require("../config/database.config.js");


const FILE_NAME = "health.controller.js";


// ============================================================
// Health Check - starts
// ============================================================
function getHealth(req, res) {

    console.log(`[${FILE_NAME}] Health check request received`);

    const databaseHealth = getDatabaseHealth();

    if (databaseHealth.connected) {

        console.log(`[${FILE_NAME}] Health check successful`);

        return res.status(200).json({
            service: "user-microservice",
            status: "UP",
            database: {
                type: "MongoDB Atlas",
                status: databaseHealth.status,
                connected: databaseHealth.connected
            },
            timestamp: new Date().toISOString()
        });
    }

    console.error(`[${FILE_NAME}] Health check failed`);

    return res.status(503).json({
        service: "user-microservice",
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
// Module Exports - starts
// ============================================================
module.exports = {
    getHealth
};
// ============================================================
// Module Exports - ends
// ============================================================
