const blogCategoryRepository = require("../repositories/blog-category.repository.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-category.service.js";



// ============================================================
// Get All Categories - starts
// ============================================================
async function getAllBlogCategoryList() {
    logger.info(`[${FILE_NAME}] Get all blog categories request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling blog category repository`);
        const result =
            await blogCategoryRepository.getAllBlogCategoryList();
        logger.info(`[${FILE_NAME}] Blog category repository response received`);
        
        logger.success(`[${FILE_NAME}] Get all blog categories completed successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to get all blog categories`, error);
        throw error;
    }
}
// ============================================================
// Get All Categories - ends
// ============================================================



// ============================================================
// Get Category By ID - starts
// ============================================================
async function getBlogCategoryById(id) {
    logger.info(`[${FILE_NAME}] Get blog category by ID request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling blog category repository by ID`);
        const category =
            await blogCategoryRepository.getBlogCategoryById(id);
        logger.info(`[${FILE_NAME}] Blog category repository response received`);

        if(!category) {
            logger.warn(`[${FILE_NAME}] Blog category not found by ID`);
            throw new Error(
                "Blog category not found"
            );
        }

        logger.success(`[${FILE_NAME}] Blog category fetched by ID successfully`);
        return category;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to get blog category by ID`, error);
        throw error;
    }
}
// ============================================================
// Get Category By ID - ends
// ============================================================



// ============================================================
// Get Category By Name - starts
// ============================================================
async function getBlogCategoryByName(categoryName) {
    logger.info(`[${FILE_NAME}] Get blog category by name request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling blog category repository by name`);
        const category =
            await blogCategoryRepository.getBlogCategoryByName(categoryName);
        logger.info(`[${FILE_NAME}] Blog category repository response received`);

        if (!category) {
            logger.warn(`[${FILE_NAME}] Blog category not found by name`);
            throw new Error("Blog category not found");
        }

        logger.success(`[${FILE_NAME}] Blog category fetched by name successfully`);
        return category;

    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to get blog category by name`, error);
        throw error;
    }
}
// ============================================================
// Get Category By Name - ends
// ============================================================



// ============================================================
// Get Category Suggestions - starts
// ============================================================
async function getCategorySuggestions(categoryName) {
    logger.info(`[${FILE_NAME}] Get category suggestions request started`);

    try {
        if (!categoryName || categoryName.trim() === "") {
            logger.warn(`[${FILE_NAME}] Empty category name received for suggestions`);
            return [];
        }

        logger.info(`[${FILE_NAME}] Searching category suggestions`);
        const categories = 
            await blogCategoryRepository.findCategoriesByNameIgnoreCase(
                categoryName.trim()
            );
        logger.info(`[${FILE_NAME}] Category suggestion repository response received`);
        
        logger.success(`[${FILE_NAME}] Category suggestions fetched successfully`);
        return categories;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to get category suggestions`, error);
        throw error;
    }
}
// ============================================================
// Get Category Suggestions - ends
// ============================================================



// ============================================================
// Service Exports
// ============================================================
module.exports = {
    getAllBlogCategoryList,
    getBlogCategoryById,
    getBlogCategoryByName,
    getCategorySuggestions
};
// ============================================================
// Service Exports - ends
// ============================================================