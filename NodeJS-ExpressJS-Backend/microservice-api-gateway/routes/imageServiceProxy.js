const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = express.Router();


function handleProxyReq(proxyReq, req) {
    console.log(
        `[API GATEWAY] ${req.method} ${req.originalUrl} -> IMAGE SERVICE`
    );
}

function handleProxyRes(proxyRes, req) {
    console.log(
        `[IMAGE SERVICE RESPONSE] ${proxyRes.statusCode} ${req.originalUrl}`
    );
}

function handleProxyError(error, req, res) {
    console.error("[IMAGE SERVICE PROXY ERROR]", error.message);

    if (!res.headersSent) {
        res.status(502).json({
            message: "Image service unavailable",
        });
    }
}


const imageServiceProxy = createProxyMiddleware({
    target: process.env.IMAGE_SERVICE_URL,

    changeOrigin: true,

    proxyTimeout: 120000,
    timeout: 120000,

    on: {
        proxyReq: handleProxyReq,
        proxyRes: handleProxyRes,
        error: handleProxyError,
    },
});

router.use("/", imageServiceProxy);

module.exports = router;
