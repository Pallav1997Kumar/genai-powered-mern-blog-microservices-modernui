const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDatabase } = require("./config/database.config.js");

const authorizationRoute = require("./routes/auth.route.js");
const userRoute = require("./routes/user.route.js");
const updateUserInfoRoute = require("./routes/update-user-info.route.js");

const logger = require("./utils/logger.js");


const FILE_NAME = "server.js";



// ============================================================
// Express Application Initialization - starts
// ============================================================
const app = express();

logger.info(`[${FILE_NAME}] User Service application initialized`);
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
// Authorization Routes - starts
// ============================================================
app.use(
    "/api/users",
    authorizationRoute
);

logger.info(`[${FILE_NAME}] Authorization routes registered successfully`);
// ============================================================
// Authorization Routes - ends
// ============================================================



// ============================================================
// User Routes - starts
// ============================================================
app.use(
    "/api/users",
    userRoute
);

logger.info(`[${FILE_NAME}] User routes registered successfully`);
// ============================================================
// User Routes - ends
// ============================================================



// ============================================================
// Update User Information Routes - starts
// ============================================================
app.use(
    "/api/users/update",
    updateUserInfoRoute
);

logger.info(`[${FILE_NAME}] Update user information routes registered successfully`);
// ============================================================
// Update User Information Routes - ends
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
const port = process.env.PORT || 4001;

app.listen(port, function() {
    logger.success(
        `[${FILE_NAME}] User Service running successfully on port ${port}`
    );
});
// ============================================================
// Start Server - ends
// ============================================================
