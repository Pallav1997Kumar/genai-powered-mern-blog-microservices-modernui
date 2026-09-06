const { spawn } = require("child_process");
const net = require("net");

// ============================================================
// CONFIGURATION
// ============================================================

const HOST = "127.0.0.1";
const PORT_CHECK_INTERVAL = 5000;
const WAITING_MESSAGE_DELAY = 30000;

const services = {
    gateway: {
        name: "API Gateway",
        folder: "microservice-api-gateway",
        port: 8080
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
// RUNNING PROCESSES
// ============================================================

const runningProcesses = [];

// ============================================================
// PRINT HEADER
// ============================================================

function printHeader() {
    console.log("");
    console.log("============================================================");
    console.log("        BLOG APPLICATION MICROSERVICE STARTUP");
    console.log("============================================================");
    console.log("");
}

// ============================================================
// PRINT SERVICE INFORMATION
// ============================================================

function printServiceInfo(service) {
    console.log("--------------------------------------------");
    console.log(`Service : ${service.name}`);
    console.log(`Folder  : ${service.folder}`);
    console.log(`Port    : ${service.port}`);
    console.log("--------------------------------------------");
}

// ============================================================
// CHECK WHETHER PORT IS AVAILABLE
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
// WAIT FOR PORT
// ============================================================

function waitForPort(port, callback) {
    const startTime = Date.now();
    let waitingMessageDisplayed = false;

    function checkConnection() {
        checkPort(port, function (isOpen) {
            if (isOpen) {
                console.log(`✅ Port ${port} is ready`);
                callback();
                return;
            }

            const elapsedTime = Date.now() - startTime;

            if (elapsedTime >= WAITING_MESSAGE_DELAY && !waitingMessageDisplayed) {
                waitingMessageDisplayed = true;
                console.log(`⏳ Still waiting for port ${port}...`);
            }

            setTimeout(checkConnection, PORT_CHECK_INTERVAL);
        });
    }

    checkConnection();
}

// ============================================================
// START SERVICE
// ============================================================

function startService(service, callback) {
    console.log("");
    console.log("");
    console.log("============================================================");
    console.log(`🚀 STARTING ${service.name.toUpperCase()}`);
    console.log("============================================================");

    printServiceInfo(service);

    const childProcess = spawn("npm", ["--prefix", service.folder, "run", "dev"], {
        shell: true,
        stdio: "inherit"
    });

    runningProcesses.push({
        name: service.name,
        process: childProcess
    });

    childProcess.on("error", function (error) {
        console.error("");
        console.error(`❌ Error starting ${service.name}`);
        console.error(error);
    });

    childProcess.on("exit", function (code, signal) {
        console.log("");
        console.log(`⚠️ ${service.name} stopped`);

        if (code !== null) {
            console.log(`Exit code: ${code}`);
        }

        if (signal !== null) {
            console.log(`Signal: ${signal}`);
        }
    });

    waitForPort(service.port, function () {
        console.log("");
        console.log(`🎉 ${service.name} is running`);
        console.log(`🌐 http://localhost:${service.port}`);
        callback();
    });
}

// ============================================================
// START GATEWAY
// ============================================================

function startGateway() {
    startService(services.gateway, function () {
        console.log("");
        console.log("➡️ Gateway is ready.");
        console.log("➡️ Starting User Service...");
        startUser();
    });
}

// ============================================================
// START USER SERVICE
// ============================================================

function startUser() {
    startService(services.user, function () {
        console.log("");
        console.log("➡️ User Service is ready.");
        console.log("➡️ Starting Blog Post Service...");
        startBlogPost();
    });
}

// ============================================================
// START BLOG POST SERVICE
// ============================================================

function startBlogPost() {
    startService(services.blogpost, function () {
        console.log("");
        console.log("➡️ Blog Post Service is ready.");
        console.log("➡️ Starting Like Service...");
        startLike();
    });
}

// ============================================================
// START LIKE SERVICE
// ============================================================

function startLike() {
    startService(services.like, function () {
        console.log("");
        console.log("➡️ Like Service is ready.");
        console.log("➡️ Starting Comment Service...");
        startComment();
    });
}

// ============================================================
// START COMMENT SERVICE
// ============================================================

function startComment() {
    startService(services.comment, function () {
        console.log("");
        console.log("➡️ Comment Service is ready.");
        console.log("➡️ Starting Category Service...");
        startCategory();
    });
}

// ============================================================
// START CATEGORY SERVICE
// ============================================================

function startCategory() {
    startService(services.category, function () {
        console.log("");
        console.log("➡️ Category Service is ready.");
        console.log("➡️ Starting Image Upload Service...");
        startImageUpload();
    });
}

// ============================================================
// IMAGE UPLOAD SERVICE
// ============================================================

function startImageUpload() {
    startService(services.imageUpload, function () {
        console.log("");
        console.log("➡️ Image Upload Service is ready.");
        console.log("➡️ Starting Generative AI Service...");
        startGenerativeAI();
    });
}

// ============================================================
// START GENERATIVE AI SERVICE
// ============================================================

function startGenerativeAI() {
    startService(services.generativeAI, function () {
        console.log("");
        console.log("============================================================");
        console.log("             🎉 ALL SERVICES ARE RUNNING");
        console.log("============================================================");
        console.log("");
        console.log("API Gateway              : http://localhost:8080");
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
    });
}

// ============================================================
// STOP ALL SERVICES
// ============================================================

function stopAllServices() {
    console.log("");
    console.log("");
    console.log("============================================================");
    console.log("              🛑 STOPPING ALL SERVICES");
    console.log("============================================================");
    console.log("");

    runningProcesses.forEach(function (item) {
        console.log(`Stopping ${item.name}...`);

        if (item.process && !item.process.killed) {
            item.process.kill();
        }
    });

    console.log("");
    console.log("✅ All services stopped.");
    console.log("");
}

// ============================================================
// HANDLE CTRL + C
// ============================================================

process.on("SIGINT", function () {
    stopAllServices();
    process.exit(0);
});

// ============================================================
// HANDLE TERMINATION
// ============================================================

process.on("SIGTERM", function () {
    stopAllServices();
    process.exit(0);
});

// ============================================================
// START APPLICATION
// ============================================================

printHeader();

console.log("Starting services in the following order:");
console.log("");
console.log("1. API Gateway              → 8080");
console.log("2. User Service             → 4001");
console.log("3. Blog Post Service        → 4002");
console.log("4. Like Service             → 4003");
console.log("5. Comment Service          → 4004");
console.log("6. Category Service         → 4005");
console.log("7. Image Upload Service     → 4006");
console.log("8. Generative AI Service    → 4007");
console.log("");

// ============================================================
// START FIRST SERVICE
// ============================================================

startGateway();
