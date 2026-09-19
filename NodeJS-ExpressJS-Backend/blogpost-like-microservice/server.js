const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const {
    connectDatabase,
    disconnectDatabase
} = require("./config/database.config.js");

const healthRouter = require("./routes/health.route.js");
const blogPostLikeRoute = require("./routes/blog-post-like.routes.js");

const logger = require("./utils/logger.js");


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
    logger.info(`[${FILE_NAME}] Blogpost Like Service application initialized`);
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
// Health Routes Configuration - ends
// ============================================================



// ============================================================
// Blog Like Routes - starts
// ============================================================
app.use(
    "/api/blog-like",
    blogPostLikeRoute
);

if(process.env.environment == "DEVELOPMENT"){
    logger.info(`[${FILE_NAME}] Blog like routes registered successfully`);
}
// ============================================================
// Blog Like Routes - ends
// ============================================================


const port = 4003;


// ============================================================
// Start Server - starts
// ============================================================
async function startServer() {

    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Server startup request received`);
    }

    try {
        await connectDatabase();

        app.listen(
            port,
            function() {
                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Blogpost Like Microservice started successfully`);
                    logger.info(`[${FILE_NAME}] Server running on port ${port}`);
                    logger.info(`[${FILE_NAME}] Health endpoint available at /health`);
                }
            }
        );

    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Unable to start Blogpost Like Microservice`);
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
        await disconnectDatabase();

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
