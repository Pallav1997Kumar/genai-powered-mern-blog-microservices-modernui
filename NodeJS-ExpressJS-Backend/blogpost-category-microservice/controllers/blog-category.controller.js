const ErrorMessage = require("../constants/error-message.constant.js");
const SuccessMessage = require("../constants/success-message.constant.js");
const blogCategoryService = require("../services/blog-category.service.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "blog-category.controller.js";



// ============================================================
// Get all categories - starts
// ============================================================
async function getAllBlogCategoryList(req, res) {
    devLogger.info(`[${FILE_NAME}] Get all blog categories request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Calling blog category service to fetch all categories`);
        const result = await blogCategoryService.getAllBlogCategoryList();

        devLogger.success(`[${FILE_NAME}] All blog categories fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending all blog categories response to client`);
        
        return res.status(200).json({
            success: true,
            error: false,
            successMessage: SuccessMessage.BLOG_CATEGORY_LIST_FETCHED,
            errorMessage: "",
            resultData: result
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch all blog categories`, error);
        devLogger.warn(`[${FILE_NAME}] Get all blog categories request could not be completed`);

        return res.status(500).json({
            success: false,
            error: true,
            successMessage: "",
            errorMessage: error.message,
            resultData: []
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
    devLogger.info(`[${FILE_NAME}] Get blog category by ID request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting category ID from request parameters`);
        const result = await blogCategoryService.getBlogCategoryById(req.params.id);

        devLogger.success(`[${FILE_NAME}] Blog category fetched successfully by ID`);
        devLogger.info(`[${FILE_NAME}] Sending category by ID response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: SuccessMessage.BLOG_CATEGORY_FETCHED,
            errorMessage: "",
            resultData: result
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog category by ID`, error);
        devLogger.warn(`[${FILE_NAME}] Category by ID request could not be completed`);

        return res.status(404).json({
            success: false,
            error: true,
            successMessage: "",
            errorMessage: error.message,
            resultData: null
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
    devLogger.info(`[${FILE_NAME}] Get blog category by name request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting category name from request parameters`);
        const result = await blogCategoryService.getBlogCategoryByName(req.params.categoryName);

        devLogger.success(`[${FILE_NAME}] Blog category fetched successfully by name`);
        devLogger.info(`[${FILE_NAME}] Sending category by name response to client`);   

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: SuccessMessage.BLOG_CATEGORY_FETCHED,
            errorMessage: "",
            resultData: result
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog category by name`, error);
        devLogger.warn(`[${FILE_NAME}] Category by name request could not be completed`);

        return res.status(404).json({
            success: false,
            error: true,
            successMessage: "",
            errorMessage: error.message,
            resultData: null
        });
    }
}
// ============================================================
// Get category by category name - ends
// ============================================================



// ============================================================
// Search blog category - starts
// ============================================================
async function searchBlogCategory(req, res, next) {

    devLogger.info(`[${FILE_NAME}] Blog category search request received`);
    const searchText = req.query.searchText;
    devLogger.info(`[${FILE_NAME}] Search text extracted from request`);

    if (!searchText || searchText.trim().length < 3) {
        devLogger.warn(`[${FILE_NAME}] Blog category search text is missing or less than 3 characters`);

        return res.status(400).json({
            success: false,
            error: true,
            successMessage: "",
            errorMessage: ErrorMessage.SEARCH_TEXT_MIN_LENGTH,
            resultData: []
        });
    }

    try {
        devLogger.info(`[${FILE_NAME}] Calling blog category service for category suggestions`);
        const result = await blogCategoryService.getCategorySuggestions(searchText.trim());
        
        devLogger.success(`[${FILE_NAME}] Blog category search completed successfully`);
        devLogger.info(`[${FILE_NAME}] Sending blog category search response to client`);    

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: SuccessMessage.BLOG_CATEGORY_SEARCH_COMPLETED,
            errorMessage: "",
            resultData: result
        });
    } 
    catch (error) {
        devLogger.error(`[${FILE_NAME}] Blog category search failed`, error);
        devLogger.warn(`[${FILE_NAME}] Blog category search request could not be completed`);

        return res.status(500).json({
            success: false,
            error: true,
            successMessage: "",
            errorMessage: error.message,
            resultData: []
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