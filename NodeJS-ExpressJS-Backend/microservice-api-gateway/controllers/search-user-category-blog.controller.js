const userService = require("../services/blog-user.service.js");
const blogPostService = require("../services/blog-post.service.js");
const blogCategoryService = require("../services/blog-category.service.js");

const handleError = require("../utils/error-handler.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "search-user-category-blog.controller.js";



// ============================================================
// Search User Or Category Or Blog Starts
// ============================================================
async function searchUserOrCategoryOrBlog(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Search user, category or blog request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting search text from request query`);
        const searchText = req.query.searchText;

        if(!searchText || searchText.trim().length < 3) {
            devLogger.warn(`[${FILE_NAME}] Search text is missing or contains less than 3 characters`);
            throw {
                success: false,
                error: true,
                successMessage: "",
                errorMessage: "Search text must be at least 3 characters long.",
                errorData: null,
                resultData: null,
                status: 400
            };
        }

        devLogger.info(`[${FILE_NAME}] Search text validation completed successfully`);

        devLogger.info(`[${FILE_NAME}] Fetching unique blog user IDs`);

        const uniqueBlogUserIdResponse = await blogPostService.getUniqueUserIds();

        if(!uniqueBlogUserIdResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch unique blog user IDs: ${uniqueBlogUserIdResponse?.errorMessage || "Failed to fetch unique blog user IDs"}`);
            throw uniqueBlogUserIdResponse;
        }

        const blogUsersId = uniqueBlogUserIdResponse.resultData || [];

        devLogger.info(`[${FILE_NAME}] Unique blog user IDs fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Starting blog post title, blog category and blog user search`);

        const [
            blogPostTitleResultsResponse,
            blogCategoryResultsResponse,
            blogUserResultsResponse
        ] = await Promise.all([
            blogPostService.searchBlogPostByTitle(searchText.trim()),
            blogCategoryService.searchBlogCategory(searchText.trim()),
            userService.searchBlogUserByName(searchText.trim(), blogUsersId)
        ]);

        if(!blogPostTitleResultsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to search blog posts: ${blogPostTitleResultsResponse?.errorMessage || "Failed to search blog posts"}`);
            throw blogPostTitleResultsResponse;
        }

        if(!blogCategoryResultsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to search blog categories: ${blogCategoryResultsResponse?.errorMessage || "Failed to search blog categories"}`);
            throw blogCategoryResultsResponse;
        }

        if(!blogUserResultsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to search blog users: ${blogUserResultsResponse?.errorMessage || "Failed to search blog users"}`);
            throw blogUserResultsResponse;
        }

        devLogger.info(`[${FILE_NAME}] Blog post title, blog category and blog user search completed`);

        const blogPostTitleResults = blogPostTitleResultsResponse.resultData || [];
        const blogCategoryResults = blogCategoryResultsResponse.resultData || [];
        const blogUserResults = blogUserResultsResponse.resultData || [];

        devLogger.info(`[${FILE_NAME}] Preparing combined search results`);

        const combinedSearchResults = [];

        blogPostTitleResults.forEach(function(eachPost) {
            combinedSearchResults.push({
                type: "Blog Post",
                _id: eachPost._id,
                postTitle: eachPost.postTitle
            });
        });

        devLogger.info(`[${FILE_NAME}] Blog post search results added to combined results`);

        blogCategoryResults.forEach(function(eachCategory) {
            combinedSearchResults.push({
                type: "Blog Category",
                _id: eachCategory._id,
                categoryName: eachCategory.categoryName
            });
        });

        devLogger.info(`[${FILE_NAME}] Blog category search results added to combined results`);

        blogUserResults.forEach(function(eachBlogUser) {
            combinedSearchResults.push({
                type: "Blog User",
                _id: eachBlogUser._id,
                username: eachBlogUser.username,
                fullName: eachBlogUser.fullName
            });
        });

        devLogger.info(`[${FILE_NAME}] Blog user search results added to combined results`);

        const limitedSearchResults = combinedSearchResults.slice(0, 5);

        devLogger.info(`[${FILE_NAME}] Combined search results prepared successfully`);
        devLogger.info(`[${FILE_NAME}] Search results limited to first 5 results`);
        devLogger.success(`[${FILE_NAME}] Search completed successfully`);
        devLogger.info(`[${FILE_NAME}] Sending search results response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: "Search completed successfully",
            errorMessage: "",
            errorData: null,
            resultData: limitedSearchResults
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Search user, category or blog failed`, error);
        devLogger.warn(`[${FILE_NAME}] Search request could not be completed`);
        return handleError(res, error);
    }
}
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
