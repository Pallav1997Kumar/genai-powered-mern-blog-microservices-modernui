const userService = require("../services/blog-user.service.js");
const blogPostService = require("../services/blog-post.service.js");
const blogCategoryService = require("../services/blog-category.service.js");

const handleError = require("../utils/errorHandler.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "search-user-category-blog.controller.js";



// ============================================================
// Search User Or Category Or Blog Starts
// ============================================================
async function searchUserOrCategoryOrBlog(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Search user, category or blog request received`);
    const searchText = req.query.searchText;

    devLogger.info(`[${FILE_NAME}] Extracting search text from request query`);
    if (!searchText || searchText.trim().length < 3) {
        devLogger.warn(`[${FILE_NAME}] Search text is missing or contains less than 3 characters`);
        return res.status(400).json({ 
            error: "Search Text must be at least 3 characters long." 
        });
    }

    devLogger.info(`[${FILE_NAME}] Search text validation completed successfully`);
    try {
        devLogger.info(`[${FILE_NAME}] Fetching unique blog user IDs`);
        const blogUsersId = await blogPostService.getUniqueUserIds();
        devLogger.info(`[${FILE_NAME}] Unique blog user IDs fetched successfully`);

        devLogger.info(`[${FILE_NAME}] Starting blog post title, blog category and blog user search`);
        const [blogPostTitleResults, blogCategoryResults, blogUserResults] = await Promise.all([
            blogPostService.searchBlogPostByTitle(searchText),
            blogCategoryService.searchBlogCategory(searchText),
            userService.searchBlogUserByName(searchText, blogUsersId)
        ]);
        devLogger.info(`[${FILE_NAME}] Blog post title, blog category and blog user search completed`);

        let combinedPostTitleUserCategoryResults = [];
        devLogger.info(`[${FILE_NAME}] Preparing combined search results`);

        blogPostTitleResults.forEach(function(eachPost) {
            combinedPostTitleUserCategoryResults.push({
                type: "Blog Post",
                _id: eachPost._id,
                postTitle: eachPost.postTitle
            });
        });
        devLogger.info(`[${FILE_NAME}] Blog post search results added to combined results`);

        blogCategoryResults.forEach(function(eachCategory) {
            combinedPostTitleUserCategoryResults.push({
                type: "Blog Category",
                _id: eachCategory._id,
                categoryName: eachCategory.categoryName
            });
        });
        devLogger.info(`[${FILE_NAME}] Blog category search results added to combined results`);

        blogUserResults.forEach(function(eachBlogUser) {
            combinedPostTitleUserCategoryResults.push({
                type: "Blog User",
                _id: eachBlogUser._id,
                username: eachBlogUser.username,
                fullName: eachBlogUser.fullName
            });
        });
        devLogger.info(`[${FILE_NAME}] Blog user search results added to combined results`);

        devLogger.info(`[${FILE_NAME}] Combined search results prepared successfully`);
        devLogger.info(`[${FILE_NAME}] Limiting combined search results to first 5 results`);
        combinedPostTitleUserCategoryResults = combinedPostTitleUserCategoryResults.slice(0, 5);
        devLogger.success(`[${FILE_NAME}] Search completed successfully`);

        devLogger.info(`[${FILE_NAME}] Sending search results response to client`);

        return res.status(200).json(combinedPostTitleUserCategoryResults);
        
    } 
    catch (error) {
        devLogger.error(`[${FILE_NAME}] Search user, category or blog failed`, error);
        devLogger.warn(`[${FILE_NAME}] Search request could not be completed`);
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
    searchUserOrCategoryOrBlog
};
// ============================================================
// Controller Exports Ends
// ============================================================
