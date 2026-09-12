const dotenv = require("dotenv");
const mongoose = require("mongoose");


const FILE_NAME = "database.config.js";



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

const databaseURL = process.env.databaseURL;
// ============================================================
// Environment Configuration - ends
// ============================================================



// ============================================================
// Database Connection - starts
// ============================================================
async function connectDatabase() {
    console.log(`[${FILE_NAME}] Database connection request started`);

    try {
        console.log(`[${FILE_NAME}] Connecting to MongoDB database`);

        await mongoose.connect(databaseURL);

        console.log(`[${FILE_NAME}] Connected to MongoDB database successfully`);
    }
    catch(error) {
        console.error(`[${FILE_NAME}] Unable to connect to MongoDB database`);
        console.error(error);

        process.exit(1);
    }
};
// ============================================================
// Database Connection - ends
// ============================================================



// ============================================================
// Database Disconnection - starts
// ============================================================
async function disconnectDatabase() {
    console.log(`[${FILE_NAME}] Database disconnection request started`);

    try {
        console.log(`[${FILE_NAME}] Disconnecting from MongoDB database`);

        await mongoose.connection.close();

        console.log(`[${FILE_NAME}] MongoDB Atlas disconnected successfully`);

    } 
    catch (error) {
        console.error(`[${FILE_NAME}] MongoDB Atlas disconnection failed`);

        throw error;
    }
}
// ============================================================
// Database Disconnection - ends
// ============================================================



// ============================================================
// Database Health Check - starts
// ============================================================
function getDatabaseHealth() {

    console.log(`[${FILE_NAME}] Database health check request started`);

    const state = mongoose.connection.readyState;

    const states = {
        0: "disconnected",
        1: "connected",
        2: "connecting",
        3: "disconnecting"
    };

    const databaseStatus = states[state] || "unknown";
    const connected = state === 1;

    console.log(`[${FILE_NAME}] Database health status: ${databaseStatus}`);

    console.log(`[${FILE_NAME}] Database connected: ${connected}`);

    return {
        status: databaseStatus,
        connected: connected
    };
}
// ============================================================
// Database Health Check - ends
// ============================================================



// ============================================================
// Module Exports - starts
// ============================================================
module.exports = {
    connectDatabase,
    disconnectDatabase,
    getDatabaseHealth
};
// ============================================================
// Module Exports - ends
// ============================================================
