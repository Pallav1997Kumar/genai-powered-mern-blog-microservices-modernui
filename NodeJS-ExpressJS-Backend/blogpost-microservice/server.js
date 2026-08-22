const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDatabase } = require("./config/database.config.js");

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
const port = process.env.PORT || 4002;

app.listen(port, function() {
    logger.success(
        `[${FILE_NAME}] Blogpost Service running successfully on port ${port}`
    );
});
// ============================================================
// Start Server - ends
// ============================================================
