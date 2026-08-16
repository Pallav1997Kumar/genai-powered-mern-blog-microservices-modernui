const userService = require("../services/blog-user.service.js");
const blogPostService = require("../services/blog-post.service.js");
const blogCategoryService = require("../services/blog-category.service.js");

const handleError = require("../utils/errorHandler.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "search-user-category-blog.controller.js";


// ============================================================
// Search User Or Category Or Blog Starts
// ============================================================
const searchUserOrCategoryOrBlog = async function(req, res, next) {
    logger.info(`[${FILE_NAME}] Search user, category or blog request received`);

    const searchText = req.query.searchText;

    logger.info(`[${FILE_NAME}] Extracting search text from request query`);

    if (!searchText || searchText.trim().length < 3) {
        logger.warn(`[${FILE_NAME}] Search text is missing or contains less than 3 characters`);

        return res.status(400).json({ 
            error: "Search Text must be at least 3 characters long." 
        });
    }

    logger.info(`[${FILE_NAME}] Search text validation completed successfully`);

    try {
        logger.info(`[${FILE_NAME}] Fetching unique blog user IDs`);

        // Get user IDs who have at least one blog post
        const blogUsersId = await blogPostService.getUniqueUserIds();

        logger.info(`[${FILE_NAME}] Unique blog user IDs fetched successfully`);

        logger.info(`[${FILE_NAME}] Starting blog post title search`);
        logger.info(`[${FILE_NAME}] Starting blog category search`);
        logger.info(`[${FILE_NAME}] Starting blog user search`);

        const [blogPostTitleResults, blogCategoryResults, blogUserResults] = await Promise.all([
            blogPostService.searchBlogPostByTitle(searchText),
            blogCategoryService.searchBlogCategory(searchText),
            userService.searchBlogUserByName(searchText, blogUsersId)
        ]);

        logger.info(`[${FILE_NAME}] Blog post title search completed`);
        logger.info(`[${FILE_NAME}] Blog category search completed`);
        logger.info(`[${FILE_NAME}] Blog user search completed`);

        let combinedPostTitleUserCategoryResults = [];

        logger.info(`[${FILE_NAME}] Preparing combined search results`);

        blogPostTitleResults.forEach(function(eachPost) {
            combinedPostTitleUserCategoryResults.push({
                type: "Blog Post",
                _id: eachPost._id,
                postTitle: eachPost.postTitle
            });
        });

        logger.info(`[${FILE_NAME}] Blog post search results added to combined results`);

        blogCategoryResults.forEach(function(eachCategory) {
            combinedPostTitleUserCategoryResults.push({
                type: "Blog Category",
                _id: eachCategory._id,
                categoryName: eachCategory.categoryName
            });
        });

        logger.info(`[${FILE_NAME}] Blog category search results added to combined results`);

        blogUserResults.forEach(function(eachBlogUser) {
            combinedPostTitleUserCategoryResults.push({
                type: "Blog User",
                _id: eachBlogUser._id,
                username: eachBlogUser.username,
                fullName: eachBlogUser.fullName
            });
        });

        logger.info(`[${FILE_NAME}] Blog user search results added to combined results`);

        logger.info(`[${FILE_NAME}] Combined search results prepared successfully`);

        logger.info(`[${FILE_NAME}] Limiting combined search results to first 5 results`);

        combinedPostTitleUserCategoryResults = combinedPostTitleUserCategoryResults.slice(0, 5);

        logger.success(`[${FILE_NAME}] Search completed successfully`);

        logger.info(`[${FILE_NAME}] Sending search results response to client`);

        return res.status(200).json(combinedPostTitleUserCategoryResults);
        
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Search user, category or blog failed`, error);
        logger.warn(`[${FILE_NAME}] Search request could not be completed`);
        return handleError(res, error);
    }
};
// ============================================================
// Search User Or Category Or Blog Ends
// ============================================================



// ============================================================
// Controller Exports Starts
// ============================================================
module.exports = {
    searchUserOrCategoryOrBlog,
};
// ============================================================
// Controller Exports Ends
// ============================================================