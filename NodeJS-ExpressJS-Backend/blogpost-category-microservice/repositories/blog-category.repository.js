const BlogCategory = require("../database-models/blog-category.model.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-category.repository.js";



// ============================================================
// Get All Blog Categories - starts
// ============================================================
async function getAllBlogCategoryList() {
    logger.info(`[${FILE_NAME}] Get all blog categories request started`);

    try {
        logger.info(`[${FILE_NAME}] Fetching all blog categories from database`);
        const result = await BlogCategory.find();
        logger.info(`[${FILE_NAME}] Blog categories fetched from database`);

        logger.success(`[${FILE_NAME}] Get all blog categories completed successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch all blog categories`, error);
        throw error;
    }
}
// ============================================================
// Get All Blog Categories - ends
// ============================================================



// ============================================================
// Get Blog Category By ID - starts
// ============================================================
async function getBlogCategoryById(id) {
    logger.info(`[${FILE_NAME}] Get blog category by ID request started`);

    try {
        logger.info(`[${FILE_NAME}] Searching blog category by ID`);
        const result = await BlogCategory.findById(id);
        logger.info(`[${FILE_NAME}] Blog category by ID database query completed`);

        if (!result) {
            logger.warn(`[${FILE_NAME}] Blog category not found for provided ID`);
        }
        else {
            logger.success(`[${FILE_NAME}] Blog category fetched by ID successfully`);
        }

        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch blog category by ID`, error);
        throw error;
    }
}
// ============================================================
// Get Blog Category By ID - ends
// ============================================================



// ============================================================
// Get Blog Category By Name - starts
// ============================================================
async function getBlogCategoryByName(categoryName) {

    logger.info(`[${FILE_NAME}] Get blog category by name request started`);

    try {
        logger.info(`[${FILE_NAME}] Searching blog category by name`);
        const result = await BlogCategory.findOne({ categoryName });

        logger.info(`[${FILE_NAME}] Blog category by name database query completed`);

        if (!result) {
            logger.warn(`[${FILE_NAME}] Blog category not found for provided category name`);
        }
        else {
            logger.success(`[${FILE_NAME}] Blog category fetched by name successfully`);
        }

        return result;
    }
    catch(error) {

        logger.error(`[${FILE_NAME}] Failed to fetch blog category by name`, error);

        throw error;
    }
}
// ============================================================
// Get Blog Category By Name - ends
// ============================================================



// ============================================================
// Search Blog Categories By Name Ignore Case - starts
// ============================================================
async function findCategoriesByNameIgnoreCase(categoryName) {
    logger.info(`[${FILE_NAME}] Blog category search request started`);

    try {
        logger.info(`[${FILE_NAME}] Searching blog categories with case-insensitive name`);
        
        const result = await BlogCategory.find({
            categoryName: {
                $regex: categoryName,
                $options: "i"
            }
        })
        .limit(5)
        .select("_id categoryName");

        logger.info(`[${FILE_NAME}] Blog category search database query completed`);

        logger.success(`[${FILE_NAME}] Blog category search completed successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to search blog categories`, error);
        throw error;
    }
}
// ============================================================
// Search Blog Categories By Name Ignore Case - ends
// ============================================================



// ============================================================
// Repository Exports
// ============================================================
module.exports = {
    getAllBlogCategoryList,
    getBlogCategoryById,
    getBlogCategoryByName,
    findCategoriesByNameIgnoreCase
};
// ============================================================
// Repository Exports - ends
// ============================================================