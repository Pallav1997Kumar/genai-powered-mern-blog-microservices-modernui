const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const healthRouter = require("./routes/health.route.js");
const imageUploadRoute = require("./routes/image-upload.route.js");

const logger = require("./utils/logger.js");


const FILE_NAME = "server.js";



// ============================================================
// Express Application Initialization - starts
// ============================================================
const app = express();

logger.info(`[${FILE_NAME}] Image Upload Service application initialized`);
// ============================================================
// Express Application Initialization - ends
// ============================================================



// ============================================================
// Middleware Configuration - starts
// ============================================================
app.use(
    cors({
        origin: true,
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());

logger.info(`[${FILE_NAME}] Application middleware configured successfully`);
// ============================================================
// Middleware Configuration - ends
// ============================================================



// ============================================================
// Health Routes Configuration - starts
// ============================================================
app.use(
    "/health",
    healthRouter
);

logger.info(`[${FILE_NAME}] Health routes configured successfully`);
// ============================================================
// ============================================================
// Health Routes Configuration - ends
// ============================================================



// ============================================================
// Image Upload Routes - starts
// ============================================================
app.use(
    "/api/image-upload",
    imageUploadRoute
);

logger.info(`[${FILE_NAME}] Image upload routes registered successfully`);
// ============================================================
// Image Upload Routes - ends
// ============================================================


const port = 4006;


// ============================================================
// Start Server - starts
// ============================================================
async function startServer() {
    logger.info(`[${FILE_NAME}] Server startup request received`);

    try {
        app.listen(
            port,
            function() {
                logger.success(`[${FILE_NAME}] Image Upload Service started successfully`);
                logger.info(`[${FILE_NAME}] Server running on port ${port}`);
                logger.info(`[${FILE_NAME}] Health endpoint available at /health`);
            }
        );

    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Unable to start Image Upload Service`);
        logger.error(error);

        process.exit(1);
    }
}
// ============================================================
// Start Server - ends
// ============================================================



// ============================================================
// Shutdown Server - starts
// ============================================================
async function shutdownServer(signal) {
    logger.info(`[${FILE_NAME}] ${signal} signal received`);
    logger.info(`[${FILE_NAME}] Server shutdown request started`);

    try {
        logger.info(`[${FILE_NAME}] Server shutdown completed successfully`);
        process.exit(0);
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Server shutdown failed`);
        logger.error(error);

        process.exit(1);
    }
}
// ============================================================
// Shutdown Server - ends
// ============================================================



// ============================================================
// Process Signal Handlers - starts
// ============================================================
process.on(
    "SIGINT",
    function() {
        shutdownServer("SIGINT");
    }
);

process.on(
    "SIGTERM",
    function() {
        shutdownServer("SIGTERM");
    }
);
// ============================================================
// Process Signal Handlers - ends
// ============================================================



// ============================================================
// Application Start - starts
// ============================================================
startServer();
// ============================================================
// Application Start - ends
// ============================================================
