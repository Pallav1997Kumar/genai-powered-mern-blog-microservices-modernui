const { createProxyMiddleware } = require("http-proxy-middleware");
const dotenv = require("dotenv");

const { CLOUDINARY_SERVICE } = require("../config/services.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "image-service.proxy.js";



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
// Handle Proxy Request Starts
// ============================================================
function handleProxyReq(proxyReq, req) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] ${req.method} ${req.originalUrl} -> IMAGE SERVICE`);
    }
}
// ============================================================
// Handle Proxy Request Ends
// ============================================================


// ============================================================
// Handle Proxy Response Starts
// ============================================================
function handleProxyRes(proxyRes, req) {
    if(proxyRes.statusCode >= 200 && proxyRes.statusCode < 300) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Image service response ${proxyRes.statusCode} ${req.originalUrl}`);
        }
    }
    else {
        if(process.env.environment == "DEVELOPMENT"){
            logger.warn(`[${FILE_NAME}] Image service response ${proxyRes.statusCode} ${req.originalUrl}`);
        }
    }
}
// ============================================================
// Handle Proxy Response Ends
// ============================================================


// ============================================================
// Handle Proxy Error Starts
// ============================================================
function handleProxyError(error, req, res) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.error(`[${FILE_NAME}] Image service proxy failed: `, error);
    }

    if(process.env.environment == "DEVELOPMENT"){
        logger.warn(`[${FILE_NAME}] Image service request could not be completed`);
    }

    if(!res.headersSent) {
        res.status(502).json({
            message: "Image service unavailable"
        });
    }
}
// ============================================================
// Handle Proxy Error Ends
// ============================================================


// ============================================================
// Image Service Proxy Starts
// ============================================================
const imageServiceProxy = createProxyMiddleware({
    target: CLOUDINARY_SERVICE,
    changeOrigin: true,
    pathRewrite: function(path) {
        return `/api/image-upload${path}`;
    },
    proxyTimeout: 120000,
    timeout: 120000,
    on: {
        proxyReq: handleProxyReq,
        proxyRes: handleProxyRes,
        error: handleProxyError
    }
});
// ============================================================
// Image Service Proxy Ends
// ============================================================


// ============================================================
// Proxy Export Starts
// ============================================================
module.exports = imageServiceProxy;
// ============================================================
// Proxy Export Ends
// ============================================================
