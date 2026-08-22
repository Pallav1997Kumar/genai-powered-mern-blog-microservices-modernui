const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDatabase } = require("./config/database.config.js");

const blogCategoryRoute = require("./routes/blog-category.route.js");

const logger = require("./utils/logger.js");


const FILE_NAME = "server.js";



// ============================================================
// Express Application Initialization - starts
// ============================================================
const app = express();

logger.info(`[${FILE_NAME}] Blogpost Category Service application initialized`);
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
// Blog Category Routes - starts
// ============================================================
app.use(
    "/api",
    blogCategoryRoute
);

logger.info(`[${FILE_NAME}] Blog category routes registered successfully`);
// ============================================================
// Blog Category Routes - ends
// ============================================================



// ============================================================
// Database Connection - starts
// ============================================================
connectDatabase();

logger.info(`[${FILE_NAME}] Database connection initialization completed`);
// ============================================================
// Database Connection - ends
// ============================================================



// ============================================================
// Start Server - starts
// ============================================================
const port = process.env.PORT || 4005;

app.listen(port, function() {
    logger.success(
        `[${FILE_NAME}] Blogpost Category Service running successfully on port ${port}`
    );
});
// ============================================================
// Start Server - ends
// ============================================================
