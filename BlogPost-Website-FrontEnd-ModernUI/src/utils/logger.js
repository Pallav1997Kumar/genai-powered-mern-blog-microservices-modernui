// src/utils/logger.js

function log(...args) {
    if (process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT") {
        console.log(...args);
    }
}

function error(...args) {
    if (process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT") {
        console.error(...args);
    }
}

function warn(...args) {
    if (process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT") {
        console.warn(...args);
    }
}

const logger = {
    log,
    error,
    warn,
};

export default logger;
