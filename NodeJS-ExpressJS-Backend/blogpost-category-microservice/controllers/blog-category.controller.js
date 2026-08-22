const blogCategoryService = require("../services/blog-category.service.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-category.controller.js";



// ============================================================
// Get all categories - starts
// ============================================================
async function getAllBlogCategoryList(req, res) {
    logger.info(`[${FILE_NAME}] Get all blog categories request received`);

    try {
        logger.info(`[${FILE_NAME}] Calling blog category service to fetch all categories`);

        const result =
            await blogCategoryService.getAllBlogCategoryList();

        logger.success(`[${FILE_NAME}] All blog categories fetched successfully`);

        logger.info(`[${FILE_NAME}] Sending all blog categories response to client`);
        res.status(200).json(result);
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch all blog categories`, error);
        logger.warn(`[${FILE_NAME}] Get all blog categories request could not be completed`);

        res.status(500).json({
            message:error.message
        });
    }
}
// ============================================================
// Get all categories - ends
// ============================================================



// ============================================================
// Get category by id - starts
// ============================================================
async function getBlogCategoryById(req, res) {
    logger.info(`[${FILE_NAME}] Get blog category by ID request received`);

    try {
        logger.info(`[${FILE_NAME}] Extracting category ID from request parameters`);

        const result =
            await blogCategoryService.getBlogCategoryById(
                req.params.id
            );

        logger.success(`[${FILE_NAME}] Blog category fetched successfully by ID`);

        logger.info(`[${FILE_NAME}] Sending category by ID response to client`);
        res.status(200).json(result);
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch blog category by ID`, error);
        logger.warn(`[${FILE_NAME}] Category by ID request could not be completed`);

        res.status(404).json({
            message:error.message
        });
    }
}
// ============================================================
// Get category by id - ends
// ============================================================



// ============================================================
// Get category by category name - starts
// ============================================================
async function getBlogCategoryByCategoryName(req, res) {
    logger.info(`[${FILE_NAME}] Get blog category by name request received`);

    try {
        logger.info(`[${FILE_NAME}] Extracting category name from request parameters`);

        const result =
            await blogCategoryService.getBlogCategoryByName(
                req.params.categoryName
            );

        logger.success(`[${FILE_NAME}] Blog category fetched successfully by name`);

        logger.info(`[${FILE_NAME}] Sending category by name response to client`);
        res.status(200).json(result);
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch blog category by name`, error);
        logger.warn(`[${FILE_NAME}] Category by name request could not be completed`);

        res.status(404).json({
            message:error.message
        });
    }
}
// ============================================================
// Get category by category name - ends
// ============================================================



// ============================================================
// Search blog category - starts
// ============================================================
const searchBlogCategory = async function(req, res, next) {
    logger.info(`[${FILE_NAME}] Blog category search request received`);

    const searchText = req.query.searchText;

    logger.info(`[${FILE_NAME}] Search text extracted from request`);

    if (!searchText || searchText.trim().length < 3) {
        logger.warn(`[${FILE_NAME}] Blog category search text is missing or less than 3 characters`);

        return res.status(400).json({
            error: "Search Text must be at least 3 characters long."
        });
    }

    try {
        logger.info(`[${FILE_NAME}] Calling blog category service for category suggestions`);
        const result = await blogCategoryService.getCategorySuggestions(searchText.trim());

        logger.success(`[${FILE_NAME}] Blog category search completed successfully`);

        logger.info(`[${FILE_NAME}] Sending blog category search response to client`);
        return res.status(200).json(result);
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Blog category search failed`, error);
        logger.warn(`[${FILE_NAME}] Blog category search request could not be completed`);

        return res.status(500).json({
            message: error.message
        });
    }
};
// ============================================================
// Search blog category - ends
// ============================================================



// ============================================================
// Controller Exports - starts
// ============================================================
module.exports = {
    getAllBlogCategoryList,
    getBlogCategoryById,
    getBlogCategoryByCategoryName,
    searchBlogCategory
};
// ============================================================
// Controller Exports - ends
// ============================================================