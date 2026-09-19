const dotenv = require("dotenv");

const blogPostService = require("../services/blog-post.service.js");
const userService = require("../services/blog-user.service.js");
const blogCategoryService = require("../services/blog-category.service.js");
const blogCommentService = require("../services/blog-comment.service.js");
const blogLikeService = require("../services/blog-post-like.service.js");

const logger = require("../utils/logger.js");
const handleError = require("../utils/errorHandler.js");

const FILE_NAME = "blog-post.controller.js";



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
// Adding Blog Post Code Starts
// ============================================================
async function addNewBlogPost(req, res) {

    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Add new blog post request received`);
    }

    try {

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting blog post request body`);
        }

        const data = req.body;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting authentication token`);
        }

        const token = req.body.token || req.cookies.jwt_access_token;

        if (!token) {

            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] Add blog post request received without authentication token`);
            }

            return res.status(401).json({
                message: "Not Authenticated"
            });
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Authentication token found for blog post creation`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Checking blog post image details`);
        }

        if (!data.imageDetail || data.imageDetail === "") {

            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] Blog post image was not provided`);
            }

            return res.status(417).json({
                message: "Please upload the image"
            });
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog post image details validated successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post service to add new blog post`);
        }

        const result = await blogPostService.addBlogPost(data, token);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog post creation service completed successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] New blog post added successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Preparing blog post creation response`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending blog post creation response to client`);
        }

        return res.status(200).json(result.message);
    }
    catch (error) {

        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to add new blog post`, error);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.warn(`[${FILE_NAME}] Add blog post request could not be completed`);
        }

        return handleError(res, error);
    }
};
// ============================================================
// Adding Blog Post Code Ends
// ============================================================



// ============================================================
// Deleting Particular Post Code Starts
// ============================================================
async function deleteParticularBlogPost(req, res) {

    if(process.env.environment == "DEVELOPMENT"){
        logger.warn(`[${FILE_NAME}] Delete particular blog post request received`);
    }

    try {

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        }

        const postID = req.params.postID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting authentication token`);
        }

        const token = req.body.token || req.cookies.jwt_access_token;

        if (!token) {

            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] Delete blog post request received without authentication token`);
            }

            return res.status(401).json({
                message: "Not Authenticated"
            });
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Authentication token found for blog post deletion`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog like service to delete all likes for post: ${postID}`);
        }

        const deleteAllLikesResult = await blogLikeService.deleteAllLikesForPost(postID, token);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] All likes deleted successfully for post: ${postID}`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Blog likes deletion completed successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog comment service to delete all comments for post: ${postID}`);
        }

        const deleteAllCommentsResult = await blogCommentService.deleteCommentsByPostId(postID, token);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] All comments deleted successfully for post: ${postID}`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Blog comments deletion completed successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post service to delete particular blog post`);
        }

        const deletePostResult = await blogPostService.deleteBlogPost(postID, token);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog post deletion service completed successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Particular blog post deleted successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Preparing blog post deletion response`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending blog post deletion response to client`);
        }

        return res.status(200).json(deletePostResult);
    } 
    catch (error) {

        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to delete particular blog post`, error);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.warn(`[${FILE_NAME}] Delete blog post request could not be completed`);
        }

        return handleError(res, error);
    }
};
// ============================================================
// Deleting Particular Post Code Ends
// ============================================================



// ============================================================
// Updating Particular Post Code Starts
// ============================================================
async function updateParticularBlogPost(req, res) {

    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Update particular blog post request received`);
    }

    try {

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        }

        const postID = req.params.postID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting blog post update request body`);
        }

        const data = req.body;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting authentication token`);
        }

        const token = req.body.token || req.cookies.jwt_access_token;

        if (!token) {

            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] Update blog post request received without authentication token`);
            }

            return res.status(401).json({
                message: "Not Authenticated"
            });
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Authentication token found for blog post update`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post service to update particular blog post`);
        }

        const result = await blogPostService.updateBlogPost(postID, data, token);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog post update service completed successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Particular blog post updated successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Preparing blog post update response`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending blog post update response to client`);
        }

        return res.status(200).json(result.message);
    } 
    catch (error) {

        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to update particular blog post`, error);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.warn(`[${FILE_NAME}] Update blog post request could not be completed`);
        }

        return handleError(res, error);
    }
};
// ============================================================
// Updating Particular Post Code Ends
// ============================================================



// ============================================================
// Get All Blog Posts With User And Category Info Code Starts
// ============================================================
async function getAllBlogPostWithUserAndCategoryInfo(req, res, next) {

    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get all blog posts with user and category info request received`);
    }

    try {

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post service to get all blog posts`);
        }

        const blogPosts = await blogPostService.getAllBlogPosts();

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog posts fetched successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Preparing blog posts with user and category information`);
        }

        const updatedBlogPosts = await Promise.all(
            blogPosts.map(async function(post) {

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Fetching user details for blog post`);
                }

                const userDetails = await userService.getUserByID(post.userID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] User details fetched successfully`);
                }

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Fetching category details for blog post`);
                }

                const categoryDetails = await blogCategoryService.getBlogCategoryByID(post.categoryID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Category details fetched successfully`);
                }

                return {
                    _id: post._id,
                    postTitle: post.postTitle,
                    postDescription: post.postDescription,
                    postImage: post.postImage,
                    userDetails: {
                        fullName: userDetails.fullName
                    },
                    categoryDetails: {
                        categoryName: categoryDetails.categoryName
                    }
                };
            })
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog posts with user and category information prepared successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] All blog posts fetched successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Preparing blog posts response`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending blog posts response to client`);
        }

        return res.status(200).json(updatedBlogPosts);
    } 
    catch(error) {

        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch blog posts with user and category information`, error);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.warn(`[${FILE_NAME}] Get all blog posts request could not be completed`);
        }

        return handleError(res, error);
    }
};
// ============================================================
// Get All Blog Posts With User And Category Info Code Ends
// ============================================================



// ============================================================
// Get Four Blog Posts With User And Category Info Code Starts
// ============================================================
const getFourBlogPostWithUserAndCategoryInfo = async function(req, res, next) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get four blog posts with user and category info request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post service to get four blog posts`);
        }

        const blogPosts = await blogPostService.getFourBlogPosts();

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Four blog posts fetched successfully`);
            logger.info(`[${FILE_NAME}] Preparing blog posts with user and category information`);
        }

        const updatedBlogPosts = await Promise.all(
            blogPosts.map(async function(post) {
                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Fetching user details for blog post`);
                }

                const userDetails = await userService.getUserByID(post.userID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] User details fetched successfully`);
                    logger.info(`[${FILE_NAME}] Fetching category details for blog post`);
                }

                const categoryDetails = await blogCategoryService.getBlogCategoryByID(post.categoryID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Category details fetched successfully`);
                }

                return {
                    _id: post._id,
                    postTitle: post.postTitle,
                    postDescription: post.postDescription,
                    postImage: post.postImage,
                    userDetails: {
                        fullName: userDetails.fullName
                    },
                    categoryDetails: {
                        categoryName: categoryDetails.categoryName
                    }
                };
            })
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Four blog posts with user and category information prepared successfully`);
            logger.success(`[${FILE_NAME}] Four blog posts fetched successfully`);
            logger.info(`[${FILE_NAME}] Preparing four blog posts response`);
            logger.info(`[${FILE_NAME}] Sending four blog posts response to client`);
        }

        return res.status(200).json(updatedBlogPosts);
    } 
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch four blog posts with user and category information`, error);
            logger.warn(`[${FILE_NAME}] Get four blog posts request could not be completed`);
        }

        return handleError(res, error);
    }
};
// ============================================================
// Get Four Blog Posts With User And Category Info Code Ends
// ============================================================



// ============================================================
// Get Four Blog Posts With User And Category Info For Particular Category Code Starts
// ============================================================
const getFourBlogPostWithUserAndCategoryInfoForParticularCategory = async function(req, res, next) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get four blog posts for particular category request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting category ID from request parameters`);
        }

        const categoryID = req.params.categoryID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post service to get four blog posts by category`);
        }

        const blogPosts = await blogPostService.getFourBlogPostByCategory(categoryID);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Four blog posts for category fetched successfully`);
            logger.info(`[${FILE_NAME}] Calling blog category service to get category details`);
        }

        const categoryDetails = await blogCategoryService.getBlogCategoryByID(categoryID);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Category details fetched successfully`);
            logger.info(`[${FILE_NAME}] Preparing blog posts with user and category information`);
        }

        const updatedBlogPosts = await Promise.all(
            blogPosts.map(async function(post) {
                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Fetching user details for blog post`);
                }

                const userDetails = await userService.getUserByID(post.userID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] User details fetched successfully`);
                }

                return {
                    _id: post._id,
                    postTitle: post.postTitle,
                    postDescription: post.postDescription,
                    postImage: post.postImage,
                    userDetails: {
                        fullName: userDetails.fullName
                    },
                    categoryDetails: {
                        categoryName: categoryDetails.categoryName
                    }
                };
            })
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog posts with user and category information prepared successfully`);
            logger.success(`[${FILE_NAME}] Four blog posts for particular category fetched successfully`);
            logger.info(`[${FILE_NAME}] Preparing category blog posts response`);
            logger.info(`[${FILE_NAME}] Sending category blog posts response to client`);
        }

        return res.status(200).json(updatedBlogPosts);
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch four blog posts for particular category`, error);
            logger.warn(`[${FILE_NAME}] Get category blog posts request could not be completed`);
        }

        return handleError(res, error);
    }
};
// ============================================================
// Get Four Blog Posts With User And Category Info For Particular Category Code Ends
// ============================================================



// ============================================================
// Get Particular Blog Post With User And Category Info Code Starts
// ============================================================
const getParticularBlogPostWithUserAndCategoryInfo = async function(req, res, next) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get particular blog post with user and category info request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        }

        const postID = req.params.postID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post service to get particular blog post`);
        }

        const blogPostArray = await blogPostService.getBlogPostById(postID);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Particular blog post fetched successfully`);
            logger.info(`[${FILE_NAME}] Extracting user details for blog post`);
        }

        const blogPost = blogPostArray[0];

        const userDetails = await userService.getUserByID(blogPost.userID);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] User details fetched successfully`);
            logger.info(`[${FILE_NAME}] Extracting category details for blog post`);
        }

        const categoryDetails = await blogCategoryService.getBlogCategoryByID(blogPost.categoryID);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Category details fetched successfully`);
        }

        const result = [{
            _id: blogPost._id,
            postTitle: blogPost.postTitle,
            postDescription: blogPost.postDescription,
            postImage: blogPost.postImage,
            postDateTime: blogPost.postDateTime,
            userDetails: {
                _id: userDetails._id,
                fullName: userDetails.fullName,
                username: userDetails.username,
                userProfilePhoto: userDetails.userProfilePhoto
            },
            categoryDetails: {
                _id: categoryDetails._id,
                categoryName: categoryDetails.categoryName
            }
        }];

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Particular blog post result prepared successfully`);
            logger.success(`[${FILE_NAME}] Particular blog post fetched successfully`);
            logger.info(`[${FILE_NAME}] Preparing particular blog post response`);
            logger.info(`[${FILE_NAME}] Sending particular blog post response to client`);
        }

        return res.status(200).json(result);
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch particular blog post with user and category information`, error);
            logger.warn(`[${FILE_NAME}] Get particular blog post request could not be completed`);
        }

        return handleError(res, error);
    }
};
// ============================================================
// Get Particular Blog Post With User And Category Info Code Ends
// ============================================================



// ============================================================
// Get Blog Posts With User And Category Info With Pagination Code Starts
// ============================================================
const getBlogPostWithUserAndCategoryInfoWithPagination = async function(req, res, next) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get paginated blog posts with user and category info request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting pagination parameters from request query`);
        }

        const params = {
            page: req.query.page,
            limit: req.query.limit
        };

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post service for paginated blog posts`);
        }

        const response = await blogPostService.getBlogPostPagination(params);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Paginated blog post service execution completed`);
        }

        const blogPosts = response.blogPostData;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog post pagination data extracted successfully`);
            logger.info(`[${FILE_NAME}] Preparing paginated blog posts with user and category information`);
        }

        const updatedBlogPosts = await Promise.all(
            blogPosts.map(async function(post) {

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Fetching user details for blog post`);
                }

                const userDetails = await userService.getUserByID(post.userID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] User details fetched successfully`);
                    logger.info(`[${FILE_NAME}] Fetching category details for blog post`);
                }

                const categoryDetails = await blogCategoryService.getBlogCategoryByID(post.categoryID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Category details fetched successfully`);
                }

                return {
                    _id: post._id,
                    postTitle: post.postTitle,
                    postDescription: post.postDescription,
                    postImage: post.postImage,
                    postDateTime: post.postDateTime,
                    userDetails: {
                        _id: userDetails._id,
                        fullName: userDetails.fullName,
                        username: userDetails.username,
                        userProfilePhoto: userDetails.userProfilePhoto
                    },
                    categoryDetails: {
                        _id: categoryDetails._id,
                        categoryName: categoryDetails.categoryName
                    }
                };
            })
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Paginated blog posts with user and category information prepared successfully`);
            logger.success(`[${FILE_NAME}] Paginated blog posts fetched successfully`);
            logger.info(`[${FILE_NAME}] Preparing paginated blog posts response`);
            logger.info(`[${FILE_NAME}] Sending paginated blog posts response to client`);
        }

        return res.status(200).json({
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            totalCount: response.totalCount,
            blogPostData: updatedBlogPosts
        });
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch paginated blog posts with user and category information`, error);
            logger.warn(`[${FILE_NAME}] Paginated blog posts request could not be completed`);
        }

        return handleError(res, error);
    }
};
// ============================================================
// Get Blog Posts With User And Category Info With Pagination Code Ends
// ============================================================



// ============================================================
// Get Blog Posts With User And Category Info For Particular Category With Pagination Code Starts
// ============================================================
const getBlogPostWithUserAndCategoryInfoForParticularCategoryWithPagination = async function(req, res, next) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get paginated blog posts for particular category request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting category name from request parameters`);
        }

        const categoryName = req.params.categoryName;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog category service to get category details by name`);
        }

        const particularCategoryDetails = await blogCategoryService.getBlogCategoryByName(categoryName);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Particular category details fetched successfully`);
        }

        const categoryID = particularCategoryDetails._id;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Category ID extracted successfully`);
            logger.info(`[${FILE_NAME}] Extracting pagination parameters from request query`);
        }

        const params = {
            page: req.query.page,
            limit: req.query.limit
        };

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post service for category post pagination`);
        }

        const response = await blogPostService.getCategoryPostPagination(categoryID, params);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Category post pagination service execution completed`);
        }

        const blogPosts = response.blogPostData;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Category blog post pagination data extracted successfully`);
            logger.info(`[${FILE_NAME}] Preparing category blog posts with user and category information`);
        }

        const blogPostData = await Promise.all(
            blogPosts.map(async function(post) {

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Fetching user details for category blog post`);
                }

                const userDetails = await userService.getUserByID(post.userID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] User details fetched successfully`);
                    logger.info(`[${FILE_NAME}] Fetching category details for category blog post`);
                }

                const categoryDetails = await blogCategoryService.getBlogCategoryByID(post.categoryID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Category details fetched successfully`);
                }

                return {
                    _id: post._id,
                    postTitle: post.postTitle,
                    postDescription: post.postDescription,
                    postImage: post.postImage,
                    postDateTime: post.postDateTime,
                    userDetails: {
                        _id: userDetails._id,
                        fullName: userDetails.fullName,
                        username: userDetails.username,
                        userProfilePhoto: userDetails.userProfilePhoto
                    },
                    categoryDetails: {
                        _id: categoryDetails._id,
                        categoryName: categoryDetails.categoryName
                    }
                };
            })
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Category blog posts with user and category information prepared successfully`);
            logger.success(`[${FILE_NAME}] Paginated category blog posts fetched successfully`);
            logger.info(`[${FILE_NAME}] Preparing category blog posts response`);
            logger.info(`[${FILE_NAME}] Sending category blog posts response to client`);
        }

        return res.status(200).json({
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            totalCount: response.totalCount,
            blogPostData: blogPostData
        });
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch paginated blog posts for particular category`, error);
            logger.warn(`[${FILE_NAME}] Category paginated blog posts request could not be completed`);
        }

        return handleError(res, error);
    }
};
// ============================================================
// Get Blog Posts With User And Category Info For Particular Category With Pagination Code Ends
// ============================================================



// ============================================================
// Get Blog Posts With User And Category For Particular User With Pagination Code Starts
// ============================================================
const getBlogPostWithUserAndCategoryForParticularUserInfoWithPagination = async function(req, res, next) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get paginated blog posts for particular user request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting username from request parameters`);
        }

        const username = req.params.username;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling user service to get user details by username`);
        }

        const particularUserDetails = await userService.getUserByUsername(username);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Particular user details fetched successfully`);
        }

        const userID = particularUserDetails._id;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] User ID extracted successfully`);
            logger.info(`[${FILE_NAME}] Extracting pagination parameters from request query`);
        }

        const params = {
            page: req.query.page,
            limit: req.query.limit
        };

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post service for user post pagination`);
        }

        const response = await blogPostService.getUserPostPagination(userID, params);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] User post pagination service execution completed`);
        }

        const blogPosts = response.blogPostData;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] User blog post pagination data extracted successfully`);
            logger.info(`[${FILE_NAME}] Preparing user blog posts with user and category information`);
        }

        const blogPostData = await Promise.all(
            blogPosts.map(async function(post) {

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Fetching user details for blog post`);
                }

                const userDetails = await userService.getUserByID(post.userID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] User details fetched successfully`);
                    logger.info(`[${FILE_NAME}] Fetching category details for blog post`);
                }

                const categoryDetails = await blogCategoryService.getBlogCategoryByID(post.categoryID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Category details fetched successfully`);
                }

                return {
                    _id: post._id,
                    postTitle: post.postTitle,
                    postDescription: post.postDescription,
                    postImage: post.postImage,
                    postDateTime: post.postDateTime,
                    userDetails: {
                        _id: userDetails._id,
                        fullName: userDetails.fullName,
                        username: userDetails.username,
                        userProfilePhoto: userDetails.userProfilePhoto
                    },
                    categoryDetails: {
                        _id: categoryDetails._id,
                        categoryName: categoryDetails.categoryName
                    }
                };
            })
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] User blog posts with user and category information prepared successfully`);
            logger.success(`[${FILE_NAME}] Paginated blog posts for particular user fetched successfully`);
            logger.info(`[${FILE_NAME}] Preparing user blog posts response`);
            logger.info(`[${FILE_NAME}] Sending user blog posts response to client`);
        }

        return res.status(200).json({
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            totalCount: response.totalCount,
            blogPostData: blogPostData
        });
    } 
    catch (error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch paginated blog posts for particular user`, error);
            logger.warn(`[${FILE_NAME}] User paginated blog posts request could not be completed`);
        }

        return handleError(res, error);
    }
};
// ============================================================
// Get Blog Posts With User And Category For Particular User With Pagination Code Ends
// ============================================================



// ============================================================
// Get Blog Posted Unique Users Details Code Starts
// ============================================================
const getBlogPostedUniqueUsersDetails = async function(req, res, next) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get blog posted unique users details request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post service to get unique user IDs`);
        }

        const userIds = await blogPostService.getUniqueUserIds();

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Unique blog posted user IDs fetched successfully`);
            logger.info(`[${FILE_NAME}] Preparing unique user details`);
        }

        const usersDetails = await Promise.all(
            userIds.map(async function(userID) {
                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Fetching user details for unique blog posted user`);
                }

                const user = await userService.getUserByID(userID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] User details fetched successfully`);
                }

                return {
                    _id: user._id,
                    fullName: user.fullName,
                    username: user.username
                };
            })
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Unique user details prepared successfully`);
            logger.success(`[${FILE_NAME}] Blog posted unique users details fetched successfully`);

            logger.info(`[${FILE_NAME}] Preparing unique users response`);
            logger.info(`[${FILE_NAME}] Sending unique users response to client`);
        }

        return res.status(200).json(usersDetails);
    }
    catch (error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch blog posted unique users details`, error);
            logger.warn(`[${FILE_NAME}] Unique users details request could not be completed`);
        }

        return handleError(res, error);
    }
};
// ============================================================
// Get Blog Posted Unique Users Details Code Ends
// ============================================================



// ============================================================
// Get Blog Posted Unique Users Details For Particular Category Code Starts
// ============================================================
const getBlogPostedUniqueUsersDetailsForParticularCategory = async function(req, res, next) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get blog posted unique users for particular category request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting category name from request parameters`);
        }

        const categoryName = req.params.categoryName;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog category service to get category details by name`);
        }

        const categoryDetails = await blogCategoryService.getBlogCategoryByName(categoryName);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Category details fetched successfully`);
        }

        const categoryID = categoryDetails._id;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Category ID extracted successfully`);
            logger.info(`[${FILE_NAME}] Calling blog post service to get unique users by category`);
        }

        const userIds = await blogPostService.getUniqueUsersByCategory(categoryID);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Unique users for category fetched successfully`);
            logger.info(`[${FILE_NAME}] Preparing unique user details`);
        }

        const usersDetails = await Promise.all(
            userIds.map(async function(userID) {
                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Fetching user details for category blog user`);
                }

                const user = await userService.getUserByID(userID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] User details fetched successfully`);
                }

                return {
                    _id: user._id,
                    fullName: user.fullName,
                    username: user.username
                };
            })
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Category unique user details prepared successfully`);
            logger.success(`[${FILE_NAME}] Blog posted unique users for category fetched successfully`);

            logger.info(`[${FILE_NAME}] Preparing category unique users response`);
            logger.info(`[${FILE_NAME}] Sending category unique users response to client`);
        }

        return res.status(200).json(usersDetails);
    }
    catch (error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch blog posted unique users for particular category`, error);
            logger.warn(`[${FILE_NAME}] Category unique users request could not be completed`);
        }

        return handleError(res, error);
    }
};
// ============================================================
// Get Blog Posted Unique Users Details For Particular Category Code Ends
// ============================================================



// ============================================================
// Get Blog Posted Unique Categories Details Code Starts
// ============================================================
const getBlogPostedUniqueCategoriesDetails = async function(req, res, next) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get blog posted unique categories details request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post service to get unique category IDs`);
        }

        const categoryIds = await blogPostService.getUniqueCategoryIds();

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Unique blog posted category IDs fetched successfully`);
            logger.info(`[${FILE_NAME}] Preparing unique category details`);
        }

        const categoriesDetails = await Promise.all(
            categoryIds.map(async function(categoryID) {
                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Fetching category details for unique blog posted category`);
                }

                const category = await blogCategoryService.getBlogCategoryByID(categoryID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Category details fetched successfully`);
                }

                return {
                    _id: category._id,
                    categoryName: category.categoryName
                };
            })
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Unique category details prepared successfully`);
            logger.success(`[${FILE_NAME}] Blog posted unique categories details fetched successfully`);

            logger.info(`[${FILE_NAME}] Preparing unique categories response`);
            logger.info(`[${FILE_NAME}] Sending unique categories response to client`);
        }

        return res.status(200).json(categoriesDetails);
    }
    catch (error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch blog posted unique categories details`, error);
            logger.warn(`[${FILE_NAME}] Unique categories details request could not be completed`);
        }

        return handleError(res, error);
    }
};
// ============================================================
// Get Blog Posted Unique Categories Details Code Ends
// ============================================================



// ============================================================
// Get Blog Posted Unique Categories Details For Particular User Code Starts
// ============================================================
const getBlogPostedUniqueCategoriesDetailsForParticularUser = async function(req, res, next) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get blog posted unique categories for particular user request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting username from request parameters`);
        }

        const username = req.params.username;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling user service to get user details by username`);
        }

        const userDetails = await userService.getUserByUsername(username);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] User details fetched successfully`);
        }

        const userID = userDetails._id;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] User ID extracted successfully`);
            logger.info(`[${FILE_NAME}] Calling blog post service to get unique categories by user`);
        }

        const categoryIds = await blogPostService.getUniqueCategoriesByUser(userID);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Unique categories for user fetched successfully`);
            logger.info(`[${FILE_NAME}] Preparing unique category details`);
        }

        const categoriesDetails = await Promise.all(
            categoryIds.map(async function(categoryID) {
                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Fetching category details for user blog category`);
                }

                const category = await blogCategoryService.getBlogCategoryByID(categoryID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Category details fetched successfully`);
                }

                return {
                    _id: category._id,
                    categoryName: category.categoryName
                };
            })
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] User unique category details prepared successfully`);
            logger.success(`[${FILE_NAME}] Blog posted unique categories for user fetched successfully`);

            logger.info(`[${FILE_NAME}] Preparing user unique categories response`);
            logger.info(`[${FILE_NAME}] Sending user unique categories response to client`);
        }

        return res.status(200).json(categoriesDetails);
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch blog posted unique categories for particular user`, error);
            logger.warn(`[${FILE_NAME}] User unique categories request could not be completed`);
        }

        return handleError(res, error);
    }
};
// ============================================================
// Get Blog Posted Unique Categories Details For Particular User Code Ends
// ============================================================



// ============================================================
// Get Blog Post Details With Filter Sort With Pagination Code Starts
// ============================================================
const getBlogPostDetailsWithFilterSortWithPagination = async function(req, res, next) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get blog post details with filter sort pagination request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting filter, sort and pagination parameters`);
        }

        const data = {
            sortSelection: req.body.sortSelection,
            allCheckedCategory: req.body.allCheckedCategory,
            allCheckedAuthor: req.body.allCheckedAuthor,
            checkedDate: req.body.checkedDate,
            page: req.query.page,
            limit: req.query.limit
        };

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Filter, sort and pagination parameters extracted successfully`);
            logger.info(`[${FILE_NAME}] Calling blog post service for filter sort pagination`);
        }

        const response = await blogPostService.filterSortPagination(data);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog post filter sort pagination service execution completed`);
        }

        const blogPosts = response.blogPostData;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Filtered and sorted blog post data extracted successfully`);
            logger.info(`[${FILE_NAME}] Preparing blog posts with user and category information`);
        }

        const blogPostData = await Promise.all(
            blogPosts.map(async function(post) {
                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Fetching user details for filtered blog post`);
                }

                const userDetails = await userService.getUserByID(post.userID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] User details fetched successfully`);
                    logger.info(`[${FILE_NAME}] Fetching category details for filtered blog post`);
                }

                const categoryDetails = await blogCategoryService.getBlogCategoryByID(post.categoryID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Category details fetched successfully`);
                }

                return {
                    _id: post._id,
                    postTitle: post.postTitle,
                    postDescription: post.postDescription,
                    postImage: post.postImage,
                    postDateTime: post.postDateTime,
                    userDetails: {
                        _id: userDetails._id,
                        fullName: userDetails.fullName,
                        username: userDetails.username,
                        userProfilePhoto: userDetails.userProfilePhoto
                    },
                    categoryDetails: {
                        _id: categoryDetails._id,
                        categoryName: categoryDetails.categoryName
                    }
                };
            })
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Filtered blog posts with user and category information prepared successfully`);
            logger.success(`[${FILE_NAME}] Blog post filter sort pagination completed successfully`);

            logger.info(`[${FILE_NAME}] Preparing filtered blog posts response`);
            logger.info(`[${FILE_NAME}] Sending filtered blog posts response to client`);
        }

        return res.status(200).json({
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            totalCount: response.totalCount,
            blogPostData
        });
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch blog posts with filter sort pagination`, error);
            logger.warn(`[${FILE_NAME}] Filter sort pagination request could not be completed`);
        }

        return handleError(res, error);
    }
};
// ============================================================
// Get Blog Post Details With Filter Sort With Pagination Code Ends
// ============================================================



// ============================================================
// Get Blog Post Details With Filter Sort With Pagination For Particular User Code Starts
// ============================================================
const getBlogPostDetailsWithFilterSortWithPaginationForParticularUser = async function(req, res, next) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get filtered and sorted blog posts for particular user request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting username from request parameters`);
        }

        const username = req.params.username;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling user service to get user details by username`);
        }

        const userDetails = await userService.getUserByUsername(username);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] User details fetched successfully`);
        }

        const userID = userDetails._id;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] User ID extracted successfully`);
            logger.info(`[${FILE_NAME}] Extracting filter, sort and pagination parameters`);
        }

        const data = {
            sortSelection: req.body.sortSelection,
            allCheckedCategory: req.body.allCheckedCategory,
            checkedDate: req.body.checkedDate,
            page: req.query.page,
            limit: req.query.limit
        };

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Filter, sort and pagination parameters extracted successfully`);
            logger.info(`[${FILE_NAME}] Calling blog post service for user filter sort pagination`);
        }

        const response = await blogPostService.filterSortPaginationByUser(userID, data);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] User filter sort pagination service execution completed`);
        }

        const blogPosts = response.blogPostData;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] User filtered blog post data extracted successfully`);
            logger.info(`[${FILE_NAME}] Preparing user blog posts with user and category information`);
        }

        const blogPostData = await Promise.all(
            blogPosts.map(async function(post) {
                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Fetching user details for filtered user blog post`);
                }

                const userDetails = await userService.getUserByID(post.userID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] User details fetched successfully`);
                    logger.info(`[${FILE_NAME}] Fetching category details for filtered user blog post`);
                }

                const categoryDetails = await blogCategoryService.getBlogCategoryByID(post.categoryID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Category details fetched successfully`);
                }

                return {
                    _id: post._id,
                    postTitle: post.postTitle,
                    postDescription: post.postDescription,
                    postImage: post.postImage,
                    postDateTime: post.postDateTime,
                    userDetails: {
                        _id: userDetails._id,
                        fullName: userDetails.fullName,
                        username: userDetails.username,
                        userProfilePhoto: userDetails.userProfilePhoto
                    },
                    categoryDetails: {
                        _id: categoryDetails._id,
                        categoryName: categoryDetails.categoryName
                    }
                };
            })
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] User filtered blog posts with user and category information prepared successfully`);
            logger.success(`[${FILE_NAME}] User blog post filter sort pagination completed successfully`);

            logger.info(`[${FILE_NAME}] Preparing filtered user blog posts response`);
            logger.info(`[${FILE_NAME}] Sending filtered user blog posts response to client`);
        }

        return res.status(200).json({
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            totalCount: response.totalCount,
            blogPostData
        });
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch filtered blog posts for particular user`, error);
            logger.warn(`[${FILE_NAME}] User filter sort pagination request could not be completed`);
        }

        return handleError(res, error);
    }
};
// ============================================================
// Get Blog Post Details With Filter Sort With Pagination For Particular User Code Ends
// ============================================================



// ============================================================
// Get Blog Post Details With Filter Sort With Pagination For Particular Category Code Starts
// ============================================================
const getBlogPostDetailsWithFilterSortWithPaginationForParticularCategory = async function(req, res, next) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get filtered and sorted blog posts for particular category request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting category name from request parameters`);
        }

        const categoryName = req.params.categoryName;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog category service to get category details by name`);
        }

        const categoryDetails = await blogCategoryService.getBlogCategoryByName(categoryName);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Category details fetched successfully`);
        }

        const categoryID = categoryDetails._id;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Category ID extracted successfully`);
            logger.info(`[${FILE_NAME}] Extracting filter, sort and pagination parameters`);
        }

        const data = {
            sortSelection: req.body.sortSelection,
            allCheckedAuthor: req.body.allCheckedAuthor,
            checkedDate: req.body.checkedDate,
            page: req.query.page,
            limit: req.query.limit
        };

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Filter, sort and pagination parameters extracted successfully`);
            logger.info(`[${FILE_NAME}] Calling blog post service for category filter sort pagination`);
        }

        const response = await blogPostService.filterSortPaginationByCategory(categoryID, data);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Category filter sort pagination service execution completed`);
        }

        const blogPosts = response.blogPostData;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Category filtered blog post data extracted successfully`);
            logger.info(`[${FILE_NAME}] Preparing category blog posts with user and category information`);
        }

        const blogPostData = await Promise.all(
            blogPosts.map(async function(post) {
                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Fetching user details for filtered category blog post`);
                }

                const userDetails = await userService.getUserByID(post.userID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] User details fetched successfully`);
                    logger.info(`[${FILE_NAME}] Fetching category details for filtered category blog post`);
                }

                const categoryDetails = await blogCategoryService.getBlogCategoryByID(post.categoryID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Category details fetched successfully`);
                }

                return {
                    _id: post._id,
                    postTitle: post.postTitle,
                    postDescription: post.postDescription,
                    postImage: post.postImage,
                    postDateTime: post.postDateTime,
                    userDetails: {
                        _id: userDetails._id,
                        fullName: userDetails.fullName,
                        username: userDetails.username,
                        userProfilePhoto: userDetails.userProfilePhoto
                    },
                    categoryDetails: {
                        _id: categoryDetails._id,
                        categoryName: categoryDetails.categoryName
                    }
                };
            })
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Category filtered blog posts with user and category information prepared successfully`);
            logger.success(`[${FILE_NAME}] Category blog post filter sort pagination completed successfully`);

            logger.info(`[${FILE_NAME}] Preparing filtered category blog posts response`);
            logger.info(`[${FILE_NAME}] Sending filtered category blog posts response to client`);
        }

        return res.status(200).json({
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            totalCount: response.totalCount,
            blogPostData
        });
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch filtered blog posts for particular category`, error);
            logger.warn(`[${FILE_NAME}] Category filter sort pagination request could not be completed`);
        }

        return handleError(res, error);
    }
};
// ============================================================
// Get Blog Post Details With Filter Sort With Pagination For Particular Category Code Ends
// ============================================================




// ============================================================
// Controller Exports Starts
// ============================================================
module.exports = {
    addNewBlogPost,
    deleteParticularBlogPost,
    updateParticularBlogPost,
    getAllBlogPostWithUserAndCategoryInfo,
    getFourBlogPostWithUserAndCategoryInfo,
    getFourBlogPostWithUserAndCategoryInfoForParticularCategory,
    getParticularBlogPostWithUserAndCategoryInfo,
    getBlogPostWithUserAndCategoryInfoWithPagination,
    getBlogPostWithUserAndCategoryInfoForParticularCategoryWithPagination,
    getBlogPostWithUserAndCategoryForParticularUserInfoWithPagination,
    getBlogPostedUniqueUsersDetails,
    getBlogPostedUniqueUsersDetailsForParticularCategory,
    getBlogPostedUniqueCategoriesDetails,
    getBlogPostedUniqueCategoriesDetailsForParticularUser,
    getBlogPostDetailsWithFilterSortWithPagination,
    getBlogPostDetailsWithFilterSortWithPaginationForParticularUser,
    getBlogPostDetailsWithFilterSortWithPaginationForParticularCategory
};
// ============================================================
// Controller Exports Ends
// ============================================================