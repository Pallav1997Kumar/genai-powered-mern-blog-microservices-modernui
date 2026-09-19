const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const healthRouter = require("./routes/health.route.js");
const blogContentRoute = require("./routes/blog-content.routes.js");
const blogGenerationRoute = require("./routes/blog-generation.routes.js");

const logger = require("./utils/loggers/logger.js");


const FILE_NAME = "server.js";



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
// Express Application Initialization - starts
// ============================================================
const app = express();

if(process.env.environment == "DEVELOPMENT"){
    logger.info(`[${FILE_NAME}] Generative AI Service application initialized`);
}
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

if(process.env.environment == "DEVELOPMENT"){
    logger.info(`[${FILE_NAME}] Application middleware configured successfully`);
}
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

if(process.env.environment == "DEVELOPMENT"){
    logger.info(`[${FILE_NAME}] Health routes configured successfully`);
}
// ============================================================
// ============================================================
// Health Routes Configuration - ends
// ============================================================



// ============================================================
// Blog Description Routes - starts
// ============================================================
app.use(
    "/api/gen-ai/blog-description",
    blogContentRoute
);

if(process.env.environment == "DEVELOPMENT"){
    logger.info(`[${FILE_NAME}] Blog description routes registered successfully`);
}
// ============================================================
// Blog Description Routes - ends
// ============================================================



// ============================================================
// Blog Generation Routes - starts
// ============================================================
app.use(
    "/api/gen-ai/blog-generation",
    blogGenerationRoute
);

if(process.env.environment == "DEVELOPMENT"){
    logger.info(`[${FILE_NAME}] Blog generation routes registered successfully`);
}
// ============================================================
// Blog Generation Routes - ends
// ============================================================


const port = 4007;


// ============================================================
// Start Server - starts
// ============================================================
async function startServer() {

    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Server startup request received`);
    }

    try {

        app.listen(
            port,
            function() {
                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Generative AI Service started successfully`);
                    logger.info(`[${FILE_NAME}] Server running on port ${port}`);
                    logger.info(`[${FILE_NAME}] Health endpoint available at /health`);
                }
            }
        );

    }
    catch(error) {

        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Unable to start Generative AI Service`);
            logger.error(error);
        }

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

    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] ${signal} signal received`);
        logger.info(`[${FILE_NAME}] Server shutdown request started`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Server shutdown completed successfully`);
        }

        process.exit(0);
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Server shutdown failed`);
            logger.error(error);
        }

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
