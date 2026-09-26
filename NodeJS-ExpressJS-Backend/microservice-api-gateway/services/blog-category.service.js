const httpClient = require("../utils/httpClient.js");
const devLogger = require("../utils/dev-logger.js");

const {
    BLOG_CATEGORY_SERVICE
} = require("../config/services.js");


const FILE_NAME = "blog-category.service.js";



// ============================================================
// Get All Blog Categories Code Starts
// ============================================================
async function getAllBlogCategoryList() {
    devLogger.info(`[${FILE_NAME}] Get all blog categories request started`);
    try {
        devLogger.info(`[${FILE_NAME}] Calling blog category service to fetch all categories`);
        const response = await httpClient.get(
            `${BLOG_CATEGORY_SERVICE}/api/categories`
        );
        devLogger.info(`[${FILE_NAME}] Blog category service returned all categories successfully`);
        devLogger.success(`[${FILE_NAME}] Get all blog categories completed successfully`);

        devLogger.info(`[${FILE_NAME}] Returning all blog categories response`);
        return response.data;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog categories`, error);
        devLogger.warn(`[${FILE_NAME}] Get all blog categories request could not be completed`);

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
    devLogger.info(`[${FILE_NAME}] Get category by ID request started`);
    try {
        devLogger.info(`[${FILE_NAME}] Calling blog category service to fetch category by ID`);
        const response = await httpClient.get(
            `${BLOG_CATEGORY_SERVICE}/api/categories/id/${categoryID}`
        );
        devLogger.info(`[${FILE_NAME}] Category by ID fetched successfully`);

        devLogger.success(`[${FILE_NAME}] Get category by ID completed successfully`);
        devLogger.info(`[${FILE_NAME}] Returning category by ID response`);

        return response.data;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch category by ID`, error);
        devLogger.warn(`[${FILE_NAME}] Get category by ID request could not be completed`);

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
    devLogger.info(`[${FILE_NAME}] Get category by name request started`);
    try {
        devLogger.info(`[${FILE_NAME}] Calling blog category service to fetch category by name`);
        const response = await httpClient.get(
            `${BLOG_CATEGORY_SERVICE}/api/categories/name/${categoryName}`
        );
        devLogger.info(`[${FILE_NAME}] Category by name fetched successfully`);

        devLogger.success(`[${FILE_NAME}] Get category by name completed successfully`);
        devLogger.info(`[${FILE_NAME}] Returning category by name response`);

        return response.data;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch category by name`, error);
        devLogger.warn(`[${FILE_NAME}] Get category by name request could not be completed`);

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
    devLogger.info(`[${FILE_NAME}] Blog category search request started`);
    try {
        devLogger.info(`[${FILE_NAME}] Calling blog category service to search categories`);
        const response = await httpClient.get(
            `${BLOG_CATEGORY_SERVICE}/api/categories/search?searchText=${searchText}`
        );
        devLogger.info(`[${FILE_NAME}] Blog category search response received successfully`);

        devLogger.success(`[${FILE_NAME}] Blog category search completed successfully`);
        devLogger.info(`[${FILE_NAME}] Returning blog category search response`);

        return response.data;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to search blog categories`, error);
        devLogger.warn(`[${FILE_NAME}] Blog category search request could not be completed`);

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
