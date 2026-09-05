const FILE_NAME = "health.controller.js";


// ============================================================
// Health Check - starts
// ============================================================
function getHealth(req, res) {
    console.log(`[${FILE_NAME}] Health check request received`);
    console.log(`[${FILE_NAME}] Health check successful`);

    return res.status(200).json({
        service: "image-upload-microservice",
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
