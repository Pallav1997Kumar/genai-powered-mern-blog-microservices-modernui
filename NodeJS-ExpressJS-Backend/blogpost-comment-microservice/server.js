const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDatabase } = require("./config/database.config.js");

const blogPostCommentRoute = require("./routes/blog-comment.routes.js");

const logger = require("./utils/logger.js");


const FILE_NAME = "server.js";



// ============================================================
// Express Application Initialization - starts
// ============================================================
const app = express();

logger.info(`[${FILE_NAME}] Blogpost Comment Service application initialized`);
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
// Blog Comment Routes - starts
// ============================================================
app.use(
    "/api/blog-comment",
    blogPostCommentRoute
);

logger.info(`[${FILE_NAME}] Blog comment routes registered successfully`);
// ============================================================
// Blog Comment Routes - ends
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
const port = process.env.PORT || 4004;

app.listen(port, function() {
    logger.success(
        `[${FILE_NAME}] Blogpost Comment Service running successfully on port ${port}`
    );
});
// ============================================================
// Start Server - ends
// ============================================================
