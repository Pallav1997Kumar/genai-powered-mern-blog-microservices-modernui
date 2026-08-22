const dotenv = require("dotenv");
const mongoose = require("mongoose");


const FILE_NAME = "database.config.js";



// ============================================================
// Environment Configuration - starts
// ============================================================
dotenv.config({
    path: "./config.env"
});

const databaseURL = process.env.databaseURL;
// ============================================================
// Environment Configuration - ends
// ============================================================



// ============================================================
// Database Connection - starts
// ============================================================
const connectDatabase = async function() {
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
// Module Exports - starts
// ============================================================
module.exports = {
    connectDatabase
};
// ============================================================
// Module Exports - ends
// ============================================================
