const dotenv = require("dotenv");

const SERVICE_NAME = 'BLOGPOST-LIKE-SERVICE';

const RESET = '\x1b[0m';
const BLUE = '\x1b[34m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';


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


function timestamp() {
    return new Date().toISOString();
}

function info(message, data = '') {
    if(process.env.environment == "DEVELOPMENT"){
        console.log(
            `${BLUE}[INFO]${RESET} ${timestamp()} [${SERVICE_NAME}] - ${message}`,
            data
        );
    }
}

function success(message, data = '') {
    if(process.env.environment == "DEVELOPMENT"){
        console.log(
            `${GREEN}[SUCCESS]${RESET} ${timestamp()} [${SERVICE_NAME}] - ${message}`,
            data
        );    
    }
}

function warn(message, data = '') {
    if(process.env.environment == "DEVELOPMENT"){
        console.warn(
            `${YELLOW}[WARN]${RESET} ${timestamp()} [${SERVICE_NAME}] - ${message}`,
            data
        );
    }
}

function error(message, data = '') {
    if(process.env.environment == "DEVELOPMENT"){
        console.error(
            `${RED}[ERROR]${RESET} ${timestamp()} [${SERVICE_NAME}] - ${message}`,
            data
        );
    }
}

module.exports = {
  info,
  success,
  warn,
  error
};