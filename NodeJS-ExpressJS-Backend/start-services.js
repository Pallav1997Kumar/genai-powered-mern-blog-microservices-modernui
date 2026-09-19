const dotenv = require("dotenv");
const { spawn } = require("child_process");
const net = require("net");

// ============================================================
// Environment Configuration - starts
// ============================================================
dotenv.config({
    path: "./config.env"
});
// ============================================================
// Environment Configuration - ends
// ============================================================

// ============================================================
// CONFIGURATION - starts
// ============================================================
const HOST = "127.0.0.1";
const PORT_CHECK_INTERVAL = 5000;
const WAITING_MESSAGE_DELAY = 30000;

const ENVIRONMENT = (process.env.environment || "DEVELOPMENT").toUpperCase();

const IS_DEVELOPMENT = ENVIRONMENT === "DEVELOPMENT";
const IS_PRODUCTION = ENVIRONMENT === "PRODUCTION";

const API_GATEWAY_PORT = process.env.PORT || 8080;

const API_GATEWAY_URL = IS_DEVELOPMENT
    ? `http://localhost:${API_GATEWAY_PORT}`
    : process.env.API_GATEWAY_URL;

if (IS_PRODUCTION && !API_GATEWAY_URL) {
    console.error("[ERROR] API_GATEWAY_URL is required in PRODUCTION environment.");
    process.exit(1);
}

const services = {
    gateway: {
        name: "API Gateway",
        folder: "microservice-api-gateway",
        port: API_GATEWAY_PORT
    },
    user: {
        name: "User Service",
        folder: "user-microservice",
        port: 4001
    },
    blogpost: {
        name: "Blog Post Service",
        folder: "blogpost-microservice",
        port: 4002
    },
    like: {
        name: "Blog Post Like Service",
        folder: "blogpost-like-microservice",
        port: 4003
    },
    comment: {
        name: "Blog Post Comment Service",
        folder: "blogpost-comment-microservice",
        port: 4004
    },
    category: {
        name: "Blog Post Category Service",
        folder: "blogpost-category-microservice",
        port: 4005
    },
    imageUpload: {
        name: "Cloudinary Image Upload Service",
        folder: "image-upload-microservice",
        port: 4006
    },
    generativeAI: {
        name: "Generative AI Service",
        folder: "generative-ai-microservice",
        port: 4007
    }
};
// ============================================================
// CONFIGURATION - ends
// ============================================================

// ============================================================
// RUNNING PROCESSES - starts
// ============================================================
const runningProcesses = [];
// ============================================================
// RUNNING PROCESSES - ends
// ============================================================

// ============================================================
// PRINT HEADER - starts
// ============================================================
function printHeader() {
    if (IS_DEVELOPMENT) {
        console.log("");
        console.log("============================================================");
        console.log("        BLOG APPLICATION MICROSERVICE STARTUP");
        console.log("============================================================");
        console.log("");
    }

    if (IS_PRODUCTION) {
        console.log("[STARTUP] Blog application microservices starting...");
    }
}
// ============================================================
// PRINT HEADER - ends
// ============================================================

// ============================================================
// PRINT SERVICE INFORMATION - starts
// ============================================================
function printServiceInfo(service) {
    if (!IS_DEVELOPMENT) {
        return;
    }

    console.log("--------------------------------------------");
    console.log(`Service : ${service.name}`);
    console.log(`Folder  : ${service.folder}`);
    console.log(`Port    : ${service.port}`);
    console.log("--------------------------------------------");
}
// ============================================================
// PRINT SERVICE INFORMATION - ends
// ============================================================

// ============================================================
// CHECK WHETHER PORT IS AVAILABLE - starts
// ============================================================
function checkPort(port, callback) {
    const socket = new net.Socket();
    let finished = false;

    socket.setTimeout(1000);

    socket.on("connect", function () {
        if (finished) {
            return;
        }

        finished = true;
        socket.destroy();
        callback(true);
    });

    socket.on("error", function () {
        if (finished) {
            return;
        }

        finished = true;
        socket.destroy();
        callback(false);
    });

    socket.on("timeout", function () {
        if (finished) {
            return;
        }

        finished = true;
        socket.destroy();
        callback(false);
    });

    socket.connect(port, HOST);
}
// ============================================================
// CHECK WHETHER PORT IS AVAILABLE - ends
// ============================================================

// ============================================================
// WAIT FOR PORT - starts
// ============================================================
function waitForPort(port, callback) {
    const startTime = Date.now();
    let waitingMessageDisplayed = false;

    function checkConnection() {
        checkPort(port, function (isOpen) {
            if (isOpen) {
                if (IS_DEVELOPMENT) {
                    console.log(`✅ Port ${port} is ready`);
                }

                callback();
                return;
            }

            const elapsedTime = Date.now() - startTime;

            if (
                IS_DEVELOPMENT &&
                elapsedTime >= WAITING_MESSAGE_DELAY &&
                !waitingMessageDisplayed
            ) {
                waitingMessageDisplayed = true;
                console.log(`⏳ Still waiting for port ${port}...`);
            }

            setTimeout(checkConnection, PORT_CHECK_INTERVAL);
        });
    }

    checkConnection();
}
// ============================================================
// WAIT FOR PORT - ends
// ============================================================

// ============================================================
// START SERVICE - starts
// ============================================================
function startService(service, callback) {
    if (IS_DEVELOPMENT) {
        console.log("");
        console.log("============================================================");
        console.log(`🚀 STARTING ${service.name.toUpperCase()}`);
        console.log("============================================================");
        printServiceInfo(service);
    }

    if (IS_PRODUCTION) {
        console.log(`[STARTUP] Starting ${service.name}...`);
    }

    const command = IS_PRODUCTION ? "start" : "dev";
    const childProcess = spawn(
        "npm",
        ["--prefix", service.folder, "run", command],
        {
            shell: true,
            stdio: IS_DEVELOPMENT ? "inherit" : "ignore"
        }
    );

    runningProcesses.push({
        name: service.name,
        process: childProcess
    });

    childProcess.on("error", function (error) {
        console.error(
            `[ERROR] Failed to start ${service.name}:`,
            error.message
        );
    });

    childProcess.on("exit", function (code, signal) {
        if (code !== null && code !== 0) {
            console.error(
                `[ERROR] ${service.name} stopped with exit code ${code}`
            );
        }

        if (signal !== null) {
            console.error(
                `[ERROR] ${service.name} stopped by signal ${signal}`
            );
        }
    });

    waitForPort(service.port, function () {
        if (IS_DEVELOPMENT) {
            console.log("");
            console.log(`🎉 ${service.name} is running`);

            if (service.name === "API Gateway") {
                console.log(`🌐 ${API_GATEWAY_URL}`);
            } else {
                console.log(`🌐 http://localhost:${service.port}`);
            }
        }

        if (IS_PRODUCTION) {
            console.log(`[READY] ${service.name} is running`);
        }

        callback();
    });
}
// ============================================================
// START SERVICE - ends
// ============================================================

// ============================================================
// START GATEWAY - starts
// ============================================================
function startGateway() {
    startService(services.gateway, function () {
        if (IS_DEVELOPMENT) {
            console.log("");
            console.log("➡️ Gateway is ready.");
            console.log("➡️ Starting User Service...");
        }

        startUser();
    });
}
// ============================================================
// START GATEWAY - ends
// ============================================================

// ============================================================
// START USER SERVICE - starts
// ============================================================
function startUser() {
    startService(services.user, function () {
        if (IS_DEVELOPMENT) {
            console.log("");
            console.log("➡️ User Service is ready.");
            console.log("➡️ Starting Blog Post Service...");
        }

        startBlogPost();
    });
}
// ============================================================
// START USER SERVICE - ends
// ============================================================

// ============================================================
// START BLOG POST SERVICE - starts
// ============================================================
function startBlogPost() {
    startService(services.blogpost, function () {
        if (IS_DEVELOPMENT) {
            console.log("");
            console.log("➡️ Blog Post Service is ready.");
            console.log("➡️ Starting Like Service...");
        }

        startLike();
    });
}
// ============================================================
// START BLOG POST SERVICE - ends
// ============================================================

// ============================================================
// START LIKE SERVICE - starts
// ============================================================
function startLike() {
    startService(services.like, function () {
        if (IS_DEVELOPMENT) {
            console.log("");
            console.log("➡️ Like Service is ready.");
            console.log("➡️ Starting Comment Service...");
        }

        startComment();
    });
}
// ============================================================
// START LIKE SERVICE - ends
// ============================================================

// ============================================================
// START COMMENT SERVICE - starts
// ============================================================
function startComment() {
    startService(services.comment, function () {
        if (IS_DEVELOPMENT) {
            console.log("");
            console.log("➡️ Comment Service is ready.");
            console.log("➡️ Starting Category Service...");
        }

        startCategory();
    });
}
// ============================================================
// START COMMENT SERVICE - ends
// ============================================================

// ============================================================
// START CATEGORY SERVICE - starts
// ============================================================
function startCategory() {
    startService(services.category, function () {
        if (IS_DEVELOPMENT) {
            console.log("");
            console.log("➡️ Category Service is ready.");
            console.log("➡️ Starting Image Upload Service...");
        }

        startImageUpload();
    });
}
// ============================================================
// START CATEGORY SERVICE - ends
// ============================================================

// ============================================================
// START IMAGE UPLOAD SERVICE - starts
// ============================================================
function startImageUpload() {
    startService(services.imageUpload, function () {
        if (IS_DEVELOPMENT) {
            console.log("");
            console.log("➡️ Image Upload Service is ready.");
            console.log("➡️ Starting Generative AI Service...");
        }

        startGenerativeAI();
    });
}
// ============================================================
// START IMAGE UPLOAD SERVICE - ends
// ============================================================

// ============================================================
// START GENERATIVE AI SERVICE - starts
// ============================================================
function startGenerativeAI() {
    startService(services.generativeAI, function () {
        if (IS_DEVELOPMENT) {
            console.log("");
            console.log("============================================================");
            console.log("             🎉 ALL SERVICES ARE RUNNING");
            console.log("============================================================");
            console.log("");
            console.log(`API Gateway              : ${API_GATEWAY_URL}`);
            console.log("User Service             : http://localhost:4001");
            console.log("Blog Post Service        : http://localhost:4002");
            console.log("Like Service             : http://localhost:4003");
            console.log("Comment Service          : http://localhost:4004");
            console.log("Category Service         : http://localhost:4005");
            console.log("Image Upload Service     : http://localhost:4006");
            console.log("Generative AI Service    : http://localhost:4007");
            console.log("");
            console.log("Press CTRL + C to stop all services.");
            console.log("");
        }

        if (IS_PRODUCTION) {
            console.log("[STARTUP] All services are running successfully.");
            console.log(`[STARTUP] API Gateway: ${API_GATEWAY_URL}`);
        }
    });
}
// ============================================================
// START GENERATIVE AI SERVICE - ends
// ============================================================

// ============================================================
// STOP ALL SERVICES - starts
// ============================================================
function stopAllServices() {
    if (IS_DEVELOPMENT) {
        console.log("");
        console.log("");
        console.log("============================================================");
        console.log("              🛑 STOPPING ALL SERVICES");
        console.log("============================================================");
        console.log("");
    }

    if (IS_PRODUCTION) {
        console.log("[SHUTDOWN] Stopping all services...");
    }

    runningProcesses.forEach(function (item) {
        if (IS_DEVELOPMENT) {
            console.log(`Stopping ${item.name}...`);
        }

        if (item.process && !item.process.killed) {
            item.process.kill();
        }
    });

    if (IS_DEVELOPMENT) {
        console.log("");
        console.log("✅ All services stopped.");
        console.log("");
    }

    if (IS_PRODUCTION) {
        console.log("[SHUTDOWN] All services stopped.");
    }
}
// ============================================================
// STOP ALL SERVICES - ends
// ============================================================

// ============================================================
// HANDLE CTRL + C - starts
// ============================================================
process.on("SIGINT", function () {
    stopAllServices();
    process.exit(0);
});
// ============================================================
// HANDLE CTRL + C - ends
// ============================================================

// ============================================================
// HANDLE TERMINATION - starts
// ============================================================
process.on("SIGTERM", function () {
    stopAllServices();
    process.exit(0);
});
// ============================================================
// HANDLE TERMINATION - ends
// ============================================================

// ============================================================
// VALIDATE ENVIRONMENT - starts
// ============================================================
if (!IS_DEVELOPMENT && !IS_PRODUCTION) {
    console.error(
        `[ERROR] Unsupported environment: ${ENVIRONMENT}. Use DEVELOPMENT or PRODUCTION.`
    );

    process.exit(1);
}
// ============================================================
// VALIDATE ENVIRONMENT - ends
// ============================================================

// ============================================================
// START APPLICATION - starts
// ============================================================
printHeader();

if (IS_DEVELOPMENT) {
    console.log("Starting services in the following order:");
    console.log("");
    console.log(`1. API Gateway              → ${API_GATEWAY_PORT}`);
    console.log("2. User Service             → 4001");
    console.log("3. Blog Post Service        → 4002");
    console.log("4. Like Service             → 4003");
    console.log("5. Comment Service          → 4004");
    console.log("6. Category Service         → 4005");
    console.log("7. Image Upload Service     → 4006");
    console.log("8. Generative AI Service    → 4007");
    console.log("");
    console.log(`API Gateway URL             → ${API_GATEWAY_URL}`);
}

if (IS_PRODUCTION) {
    console.log("[STARTUP] Environment: PRODUCTION");
}

// ============================================================
// START FIRST SERVICE
// ============================================================
startGateway();
// ============================================================
// START APPLICATION - ends
// ============================================================
