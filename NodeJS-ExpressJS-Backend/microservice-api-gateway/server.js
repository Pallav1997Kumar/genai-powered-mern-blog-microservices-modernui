// ============================================================
// Import Dependencies - starts
// ============================================================
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


// ============================================================
// Import Routes - starts
// ============================================================
const authorizationRoute = require("./routes/authorization.route.js");
const blogUserRoute = require("./routes/blog-user.route.js");
const blogPostRoute = require("./routes/blog-post.route.js");
const blogPostCommentRoute = require("./routes/blog-post-comment.route.js");
const blogPostLikeRoute = require("./routes/blog-post-like.route.js");
const blogCategoryListRoute = require("./routes/blog-category-list.route.js");
const searchUserCategoryBlogRoute = require("./routes/search-user-category-blog.route.js");
const generativeAIRoute = require("./routes/generative-AI.route.js");
// ============================================================
// Import Routes - ends
// ============================================================



// ============================================================
// Import Logger - starts
// ============================================================
const logger = require("./utils/logger.js");
// ============================================================
// Import Logger - ends
// ============================================================



const FILE_NAME = "server.js";



// ============================================================
// Environment Configuration - starts
// ============================================================
dotenv.config({
    path: "./config.env"
});

logger.info(`[${FILE_NAME}] Environment configuration loaded`);
// ============================================================
// Environment Configuration - ends
// ============================================================



// ============================================================
// Express Application Initialization - starts
// ============================================================
const app = express();

logger.info(`[${FILE_NAME}] Backend application initialized`);
// ============================================================
// Express Application Initialization - ends
// ============================================================



// ============================================================
// CORS Configuration - starts
// ============================================================
let corsOption;

if (process.env.environment === "DEVELOPMENT") {
    corsOption = {
        origin: "http://localhost:3000",
        credentials: true,
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    };
}
else if (process.env.environment === "PRODUCTION") {
    corsOption = {
        origin: process.env.frontEndHost,
        credentials: true,
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    };
}

app.use(cors(corsOption));

logger.info(`[${FILE_NAME}] CORS configuration applied successfully`);
// ============================================================
// CORS Configuration - ends
// ============================================================



// ============================================================
// Middleware Configuration - starts
// ============================================================
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

logger.info(`[${FILE_NAME}] Application middleware configured successfully`);
// ============================================================
// Middleware Configuration - ends
// ============================================================



// ============================================================
// Authorization Routes - starts
// ============================================================
app.use(
    "/api/authorization",
    authorizationRoute
);

logger.info(`[${FILE_NAME}] Authorization routes registered successfully`);
// ============================================================
// Authorization Routes - ends
// ============================================================



// ============================================================
// Blog User Routes - starts
// ============================================================
app.use(
    "/api/blogUser",
    blogUserRoute
);

logger.info(`[${FILE_NAME}] Blog user routes registered successfully`);
// ============================================================
// Blog User Routes - ends
// ============================================================



// ============================================================
// Blog Post Routes - starts
// ============================================================
app.use(
    "/api/blogPost",
    blogPostRoute
);

logger.info(`[${FILE_NAME}] Blog post routes registered successfully`);
// ============================================================
// Blog Post Routes - ends
// ============================================================



// ============================================================
// Blog Post Comment Routes - starts
// ============================================================
app.use(
    "/api/blogPost/comment",
    blogPostCommentRoute
);

logger.info(`[${FILE_NAME}] Blog post comment routes registered successfully`);
// ============================================================
// Blog Post Comment Routes - ends
// ============================================================



// ============================================================
// Blog Post Like Routes - starts
// ============================================================
app.use(
    "/api/blogPost/blogPostLike",
    blogPostLikeRoute
);

logger.info(`[${FILE_NAME}] Blog post like routes registered successfully`);
// ============================================================
// Blog Post Like Routes - ends
// ============================================================



// ============================================================
// Blog Category Routes - starts
// ============================================================
app.use(
    "/api/blog/categoryList",
    blogCategoryListRoute
);

logger.info(`[${FILE_NAME}] Blog category routes registered successfully`);
// ============================================================
// Blog Category Routes - ends
// ============================================================



// ============================================================
// Search Routes - starts
// ============================================================
app.use(
    "/api/searchBlogOrUserOrCategory",
    searchUserCategoryBlogRoute
);

logger.info(`[${FILE_NAME}] Search routes registered successfully`);
// ============================================================
// Search Routes - ends
// ============================================================



// ============================================================
// Generative AI Routes - starts
// ============================================================
app.use(
    "/api/generativeAI",
    generativeAIRoute
);

logger.info(`[${FILE_NAME}] Generative AI routes registered successfully`);
// ============================================================
// Generative AI Routes - ends
// ============================================================



// ============================================================
// Start Server - starts
// ============================================================
const port = process.env.PORT || 8080;

app.listen(port, function() {
    logger.success(
        `[${FILE_NAME}] Backend server running successfully on port ${port}`
    );
});
// ============================================================
// Start Server - ends
// ============================================================
