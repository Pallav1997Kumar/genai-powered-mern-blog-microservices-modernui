const dotenv = require("dotenv");

const httpClient = require("../utils/httpClient.js");
const logger = require("../utils/logger.js");

const {
    BLOG_CATEGORY_SERVICE
} = require("../config/services.js");


const FILE_NAME = "blog-category.service.js";



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
// Get All Blog Categories Code Starts
// ============================================================
async function getAllBlogCategoryList() {

    if (process.env.environment == "DEVELOPMENT") {
        logger.info(`[${FILE_NAME}] Get all blog categories request started`);
    }

    try {

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Calling blog category service to fetch all categories`);
        }

        const response = await httpClient.get(
            `${BLOG_CATEGORY_SERVICE}/api/categories`
        );

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Blog category service returned all categories successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.success(`[${FILE_NAME}] Get all blog categories completed successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Returning all blog categories response`);
        }

        return response.data;
    }
    catch(error) {

        if (process.env.environment == "DEVELOPMENT") {
            logger.error(`[${FILE_NAME}] Failed to fetch blog categories`, error);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.warn(`[${FILE_NAME}] Get all blog categories request could not be completed`);
        }

        throw {
            message: "Failed to fetch blog categories",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
}
// ============================================================
// Get All Blog Categories Code Ends
// ============================================================



// ============================================================
// Get Category By ID Code Starts
// ============================================================
async function getBlogCategoryByID(categoryID) {

    if (process.env.environment == "DEVELOPMENT") {
        logger.info(`[${FILE_NAME}] Get category by ID request started`);
    }

    try {

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Calling blog category service to fetch category by ID`);
        }

        const response = await httpClient.get(
            `${BLOG_CATEGORY_SERVICE}/api/categories/id/${categoryID}`
        );

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Category by ID fetched successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.success(`[${FILE_NAME}] Get category by ID completed successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Returning category by ID response`);
        }

        return response.data;
    }
    catch(error) {

        if (process.env.environment == "DEVELOPMENT") {
            logger.error(`[${FILE_NAME}] Failed to fetch category by ID`, error);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.warn(`[${FILE_NAME}] Get category by ID request could not be completed`);
        }

        throw {
            message: "Failed to fetch category by ID",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
}
// ============================================================
// Get Category By ID Code Ends
// ============================================================



// ============================================================
// Get Category By Name Code Starts
// ============================================================
async function getBlogCategoryByName(categoryName) {

    if (process.env.environment == "DEVELOPMENT") {
        logger.info(`[${FILE_NAME}] Get category by name request started`);
    }

    try {

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Calling blog category service to fetch category by name`);
        }

        const response = await httpClient.get(
            `${BLOG_CATEGORY_SERVICE}/api/categories/name/${categoryName}`
        );

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Category by name fetched successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.success(`[${FILE_NAME}] Get category by name completed successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Returning category by name response`);
        }

        return response.data;
    }
    catch(error) {

        if (process.env.environment == "DEVELOPMENT") {
            logger.error(`[${FILE_NAME}] Failed to fetch category by name`, error);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.warn(`[${FILE_NAME}] Get category by name request could not be completed`);
        }

        throw {
            message: "Failed to fetch category by name",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
}
// ============================================================
// Get Category By Name Code Ends
// ============================================================



// ============================================================
// Search Blog Categories Code Starts
// ============================================================
async function searchBlogCategory(searchText) {

    if (process.env.environment == "DEVELOPMENT") {
        logger.info(`[${FILE_NAME}] Blog category search request started`);
    }

    try {

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Calling blog category service to search categories`);
        }

        const response = await httpClient.get(
            `${BLOG_CATEGORY_SERVICE}/api/categories/search?searchText=${searchText}`
        );

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Blog category search response received successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.success(`[${FILE_NAME}] Blog category search completed successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Returning blog category search response`);
        }

        return response.data;
    }
    catch(error) {

        if (process.env.environment == "DEVELOPMENT") {
            logger.error(`[${FILE_NAME}] Failed to search blog categories`, error);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.warn(`[${FILE_NAME}] Blog category search request could not be completed`);
        }

        throw {
            message: "Failed to search blog categories",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
}
// ============================================================
// Search Blog Categories Code Ends
// ============================================================



// ============================================================
// Service Exports Starts
// ============================================================
module.exports = {
    getAllBlogCategoryList,
    getBlogCategoryByID,
    getBlogCategoryByName,
    searchBlogCategory
};
// ============================================================
// Service Exports Ends
// ============================================================
