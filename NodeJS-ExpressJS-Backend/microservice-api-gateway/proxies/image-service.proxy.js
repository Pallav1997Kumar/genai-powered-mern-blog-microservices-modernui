const { createProxyMiddleware } = require("http-proxy-middleware");

const { CLOUDINARY_SERVICE } = require("../config/services.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "image-service.proxy.js";



// ============================================================
// Handle Proxy Request Starts
// ============================================================
function handleProxyReq(proxyReq, req) {
    devLogger.info(`[${FILE_NAME}] ${req.method} ${req.originalUrl} -> IMAGE SERVICE`);
}
// ============================================================
// Handle Proxy Request Ends
// ============================================================


// ============================================================
// Handle Proxy Response Starts
// ============================================================
function handleProxyRes(proxyRes, req) {
    if(proxyRes.statusCode >= 200 && proxyRes.statusCode < 300) {
        devLogger.success(`[${FILE_NAME}] Image service response ${proxyRes.statusCode} ${req.originalUrl}`);
    }
    else {
        devLogger.warn(`[${FILE_NAME}] Image service response ${proxyRes.statusCode} ${req.originalUrl}`);
    }
}
// ============================================================
// Handle Proxy Response Ends
// ============================================================


// ============================================================
// Handle Proxy Error Starts
// ============================================================
function handleProxyError(error, req, res) {
    devLogger.error(`[${FILE_NAME}] Image service proxy failed: `, error);
    devLogger.warn(`[${FILE_NAME}] Image service request could not be completed`);

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
