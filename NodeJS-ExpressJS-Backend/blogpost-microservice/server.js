const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const {
    connectDatabase,
    disconnectDatabase
} = require("./config/database.config.js");

const healthRouter = require("./routes/health.route.js");
const blogPostCategoryRoute = require("./routes/blog-post-category.route.js");
const blogPostFilterSortRoute = require("./routes/blog-post-filter-sort.route.js");
const blogPostReadRoute = require("./routes/blog-post-read.route.js");
const blogPostUserRoute = require("./routes/blog-post-user.route.js");
const blogPostWriteRoute = require("./routes/blog-post-write.route.js");

const logger = require("./utils/logger.js");


const FILE_NAME = "server.js";



// ============================================================
// Express Application Initialization - starts
// ============================================================
const app = express();

logger.info(`[${FILE_NAME}] Blogpost Service application initialized`);
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
// Health Routes Configuration - ends
// ============================================================



// ============================================================
// Blog Post Category Routes - starts
// ============================================================
app.use(
    "/api/blog-post/category",
    blogPostCategoryRoute
);

logger.info(`[${FILE_NAME}] Blog post category routes registered successfully`);
// ============================================================
// Blog Post Category Routes - ends
// ============================================================



// ============================================================
// Blog Post Filter Sort Routes - starts
// ============================================================
app.use(
    "/api/blog-post/filter-sort",
    blogPostFilterSortRoute
);

logger.info(`[${FILE_NAME}] Blog post filter-sort routes registered successfully`);
// ============================================================
// Blog Post Filter Sort Routes - ends
// ============================================================



// ============================================================
// Blog Post Read Routes - starts
// ============================================================
app.use(
    "/api/blog-post/read",
    blogPostReadRoute
);

logger.info(`[${FILE_NAME}] Blog post read routes registered successfully`);
// ============================================================
// Blog Post Read Routes - ends
// ============================================================



// ============================================================
// Blog Post User Routes - starts
// ============================================================
app.use(
    "/api/blog-post/user",
    blogPostUserRoute
);

logger.info(`[${FILE_NAME}] Blog post user routes registered successfully`);
// ============================================================
// Blog Post User Routes - ends
// ============================================================



// ============================================================
// Blog Post Write Routes - starts
// ============================================================
app.use(
    "/api/blog-post/write",
    blogPostWriteRoute
);

logger.info(`[${FILE_NAME}] Blog post write routes registered successfully`);
// ============================================================
// Blog Post Write Routes - ends
// ============================================================


const port = 4002;


// ============================================================
// Start Server - starts
// ============================================================
async function startServer() {

    logger.info(`[${FILE_NAME}] Server startup request received`);

    try {
        await connectDatabase();

        app.listen(
            port,
            function() {
                logger.info(`[${FILE_NAME}] Blogpost Microservice started successfully`);
                logger.info(`[${FILE_NAME}] Server running on port ${port}`);
                logger.info(`[${FILE_NAME}] Health endpoint available at /health`);
            }
        );

    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Unable to start Blogpost Microservice`);
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
        await disconnectDatabase();
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
