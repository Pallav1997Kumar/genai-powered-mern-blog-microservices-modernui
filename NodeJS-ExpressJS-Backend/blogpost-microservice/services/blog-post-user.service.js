const blogPostRepository = require("../repositories/blog-post.repository.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-post-user.service.js";



// ============================================================
// Get Blog Posts For Particular User With Pagination - starts
// ============================================================
async function getBlogPostForParticularUserWithPagination(userID, page, limit) {
    logger.info(`[${FILE_NAME}] Get blog posts for particular user with pagination request started`);

    try {
        logger.info(`[${FILE_NAME}] Calculating pagination skip value`);
        const skip = (page - 1) * limit;

        logger.info(`[${FILE_NAME}] Calling blog post repository to fetch user blog posts with pagination`);
        const blogPostData =
            await blogPostRepository.findBlogPostByUserWithPagination(
                userID,
                skip,
                limit
            );

        logger.info(`[${FILE_NAME}] Blog post user pagination repository response received`);

        logger.info(`[${FILE_NAME}] Calling blog post repository to count user blog posts`);
        const totalCount = await blogPostRepository.countBlogPostByUser(userID);

        logger.info(`[${FILE_NAME}] Blog post user count repository response received`);

        logger.info(`[${FILE_NAME}] Calculating total pages`);
        const totalPages = Math.ceil(totalCount / limit);

        logger.success(`[${FILE_NAME}] Blog posts for particular user with pagination fetched successfully`);

        return {
            currentPage: page,
            totalPages: totalPages,
            totalCount: totalCount,
            blogPostData: blogPostData
        };
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to get blog posts for particular user with pagination`, error);
        throw error;
    }
}
// ============================================================
// Get Blog Posts For Particular User With Pagination - ends
// ============================================================



// ============================================================
// Get Blog Posted Unique User IDs - starts
// ============================================================
async function getBlogPostedUniqueUserIds() {
    logger.info(`[${FILE_NAME}] Get unique blog posted user IDs request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling blog post repository to fetch unique user IDs`);
        const result = await blogPostRepository.findUniqueBlogPostUserIds();

        logger.info(`[${FILE_NAME}] Unique user IDs repository response received`);
        logger.success(`[${FILE_NAME}] Unique blog posted user IDs fetched successfully`);

        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to get unique blog posted user IDs`, error);
        throw error;
    }
}
// ============================================================
// Get Blog Posted Unique User IDs - ends
// ============================================================



// ============================================================
// Get Blog Posted Unique Categories For Particular User - starts
// ============================================================
async function getBlogPostedUniqueCategoriesForParticularUser(userID) {
    logger.info(`[${FILE_NAME}] Get unique blog posted categories for particular user request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling blog post repository to fetch unique categories for user`);
        const result = await blogPostRepository.findUniqueCategoriesByUser(userID);

        logger.info(`[${FILE_NAME}] Unique user categories repository response received`);
        logger.success(`[${FILE_NAME}] Unique categories for particular user fetched successfully`);

        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to get unique categories for particular user`, error);
        throw error;
    }
}
// ============================================================
// Get Blog Posted Unique Categories For Particular User - ends
// ============================================================



// ============================================================
// Service Exports - starts
// ============================================================
module.exports = {
    getBlogPostForParticularUserWithPagination,
    getBlogPostedUniqueUserIds,
    getBlogPostedUniqueCategoriesForParticularUser
};
// ============================================================
// Service Exports - ends
// ============================================================