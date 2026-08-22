const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const blogContentRoute = require("./routes/blog-content.routes.js");
const blogGenerationRoute = require("./routes/blog-generation.routes.js");

const logger = require("./utils/loggers/logger.js");


const FILE_NAME = "server.js";



// ============================================================
// Express Application Initialization - starts
// ============================================================
const app = express();

logger.info(`[${FILE_NAME}] Generative AI service application initialized`);
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
// Blog Description Routes - starts
// ============================================================
app.use(
    "/api/gen-ai/blog-description",
    blogContentRoute
);

logger.info(`[${FILE_NAME}] Blog description routes registered successfully`);
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

logger.info(`[${FILE_NAME}] Blog generation routes registered successfully`);
// ============================================================
// Blog Generation Routes - ends
// ============================================================



// ============================================================
// Start Server - starts
// ============================================================
const port = process.env.PORT || 4007;

app.listen(port, function() {
    logger.success(
        `[${FILE_NAME}] Generative AI Service running successfully on port ${port}`
    );
});
// ============================================================
// Start Server - ends
// ============================================================
