const dotenv = require("dotenv");

const userService = require("../services/blog-user.service.js");
const blogPostService = require("../services/blog-post.service.js");
const blogCategoryService = require("../services/blog-category.service.js");

const handleError = require("../utils/errorHandler.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "search-user-category-blog.controller.js";



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
// Search User Or Category Or Blog Starts
// ============================================================
async function searchUserOrCategoryOrBlog(req, res, next) {

    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Search user, category or blog request received`);
    }

    const searchText = req.query.searchText;

    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Extracting search text from request query`);
    }

    if (!searchText || searchText.trim().length < 3) {

        if(process.env.environment == "DEVELOPMENT"){
            logger.warn(`[${FILE_NAME}] Search text is missing or contains less than 3 characters`);
        }

        return res.status(400).json({ 
            error: "Search Text must be at least 3 characters long." 
        });
    }

    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Search text validation completed successfully`);
    }

    try {

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Fetching unique blog user IDs`);
        }

        // Get user IDs who have at least one blog post
        const blogUsersId = await blogPostService.getUniqueUserIds();

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Unique blog user IDs fetched successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Starting blog post title search`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Starting blog category search`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Starting blog user search`);
        }

        const [blogPostTitleResults, blogCategoryResults, blogUserResults] = await Promise.all([
            blogPostService.searchBlogPostByTitle(searchText),
            blogCategoryService.searchBlogCategory(searchText),
            userService.searchBlogUserByName(searchText, blogUsersId)
        ]);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog post title search completed`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog category search completed`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog user search completed`);
        }

        let combinedPostTitleUserCategoryResults = [];

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Preparing combined search results`);
        }

        blogPostTitleResults.forEach(function(eachPost) {

            combinedPostTitleUserCategoryResults.push({
                type: "Blog Post",
                _id: eachPost._id,
                postTitle: eachPost.postTitle
            });
        });

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog post search results added to combined results`);
        }

        blogCategoryResults.forEach(function(eachCategory) {

            combinedPostTitleUserCategoryResults.push({
                type: "Blog Category",
                _id: eachCategory._id,
                categoryName: eachCategory.categoryName
            });
        });

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog category search results added to combined results`);
        }

        blogUserResults.forEach(function(eachBlogUser) {

            combinedPostTitleUserCategoryResults.push({
                type: "Blog User",
                _id: eachBlogUser._id,
                username: eachBlogUser.username,
                fullName: eachBlogUser.fullName
            });
        });

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog user search results added to combined results`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Combined search results prepared successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Limiting combined search results to first 5 results`);
        }

        combinedPostTitleUserCategoryResults = 
            combinedPostTitleUserCategoryResults.slice(0, 5);

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Search completed successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending search results response to client`);
        }

        return res.status(200).json(combinedPostTitleUserCategoryResults);
        
    } 
    catch (error) {

        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Search user, category or blog failed`, error);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.warn(`[${FILE_NAME}] Search request could not be completed`);
        }

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
