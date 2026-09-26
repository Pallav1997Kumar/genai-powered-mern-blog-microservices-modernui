const blogPostService = require("../services/blog-post.service.js");
const userService = require("../services/blog-user.service.js");
const blogCategoryService = require("../services/blog-category.service.js");
const blogCommentService = require("../services/blog-comment.service.js");
const blogLikeService = require("../services/blog-post-like.service.js");

const devLogger = require("../utils/dev-logger.js");
const handleError = require("../utils/errorHandler.js");

const FILE_NAME = "blog-post.controller.js";


// ============================================================
// Adding Blog Post Code Starts
// ============================================================
async function addNewBlogPost(req, res) {
    devLogger.info(`[${FILE_NAME}] Add new blog post request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Extracting blog post request body`);
        const data = req.body;

        devLogger.info(`[${FILE_NAME}] Extracting authentication token`);
        const token = req.body.token || req.cookies.jwt_access_token;

        if (!token) {
            devLogger.warn(`[${FILE_NAME}] Add blog post request received without authentication token`);
            return res.status(401).json({
                message: "Not Authenticated"
            });
        }
        devLogger.info(`[${FILE_NAME}] Authentication token found for blog post creation`);
        
        devLogger.info(`[${FILE_NAME}] Checking blog post image details`);
        if (!data.imageDetail || data.imageDetail === "") {
            devLogger.warn(`[${FILE_NAME}] Blog post image was not provided`);
            return res.status(417).json({
                message: "Please upload the image"
            });
        }
        devLogger.info(`[${FILE_NAME}] Blog post image details validated successfully`);

        devLogger.info(`[${FILE_NAME}] Calling blog post service to add new blog post`);
        const result = await blogPostService.addBlogPost(data, token);
        devLogger.info(`[${FILE_NAME}] Blog post creation service completed successfully`);
        devLogger.success(`[${FILE_NAME}] New blog post added successfully`);

        devLogger.info(`[${FILE_NAME}] Sending blog post creation response to client`);

        return res.status(200).json(result.message);
    }
    catch (error) {
        devLogger.error(`[${FILE_NAME}] Failed to add new blog post`, error);
        devLogger.warn(`[${FILE_NAME}] Add blog post request could not be completed`);
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
    devLogger.warn(`[${FILE_NAME}] Delete particular blog post request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        devLogger.info(`[${FILE_NAME}] Extracting authentication token`);
        const token = req.body.token || req.cookies.jwt_access_token;
        if (!token) {
            devLogger.warn(`[${FILE_NAME}] Delete blog post request received without authentication token`);
            return res.status(401).json({
                message: "Not Authenticated"
            });
        }
        devLogger.info(`[${FILE_NAME}] Authentication token found for blog post deletion`);

        devLogger.info(`[${FILE_NAME}] Calling blog like service to delete all likes for post: ${postID}`);
        const deleteAllLikesResult = await blogLikeService.deleteAllLikesForPost(postID, token);
        devLogger.info(`[${FILE_NAME}] All likes deleted successfully for post: ${postID}`);
        devLogger.success(`[${FILE_NAME}] Blog likes deletion completed successfully`);

        devLogger.info(`[${FILE_NAME}] Calling blog comment service to delete all comments for post: ${postID}`);
        const deleteAllCommentsResult = await blogCommentService.deleteCommentsByPostId(postID, token);
        devLogger.info(`[${FILE_NAME}] All comments deleted successfully for post: ${postID}`);
        devLogger.success(`[${FILE_NAME}] Blog comments deletion completed successfully`);

        devLogger.info(`[${FILE_NAME}] Calling blog post service to delete particular blog post`);
        const deletePostResult = await blogPostService.deleteBlogPost(postID, token);
        devLogger.info(`[${FILE_NAME}] Blog post deletion service completed successfully`);
        devLogger.success(`[${FILE_NAME}] Particular blog post deleted successfully`);

        devLogger.info(`[${FILE_NAME}] Sending blog post deletion response to client`);

        return res.status(200).json(deletePostResult);
    } 
    catch (error) {
        devLogger.error(`[${FILE_NAME}] Failed to delete particular blog post`, error);
        devLogger.warn(`[${FILE_NAME}] Delete blog post request could not be completed`);
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
    devLogger.info(`[${FILE_NAME}] Update particular blog post request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        devLogger.info(`[${FILE_NAME}] Extracting blog post update request body`);
        const data = req.body;
        
        devLogger.info(`[${FILE_NAME}] Extracting authentication token`);
        const token = req.body.token || req.cookies.jwt_access_token;
        if (!token) {
            devLogger.warn(`[${FILE_NAME}] Update blog post request received without authentication token`);
            return res.status(401).json({
                message: "Not Authenticated"
            });
        }
        devLogger.info(`[${FILE_NAME}] Authentication token found for blog post update`);
        
        devLogger.info(`[${FILE_NAME}] Calling blog post service to update particular blog post`);
        const result = await blogPostService.updateBlogPost(postID, data, token);
        devLogger.info(`[${FILE_NAME}] Blog post update service completed successfully`);
        devLogger.success(`[${FILE_NAME}] Particular blog post updated successfully`);
        
        devLogger.info(`[${FILE_NAME}] Sending blog post update response to client`);
        
        return res.status(200).json(result.message);
    } 
    catch (error) {
        devLogger.error(`[${FILE_NAME}] Failed to update particular blog post`, error);
        devLogger.warn(`[${FILE_NAME}] Update blog post request could not be completed`);
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
    devLogger.info(`[${FILE_NAME}] Get all blog posts with user and category info request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Calling blog post service to get all blog posts`);
        const blogPosts = await blogPostService.getAllBlogPosts();
        devLogger.info(`[${FILE_NAME}] Blog posts fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing blog posts with user and category information`);

        const updatedBlogPosts = await Promise.all(
            blogPosts.map(async function(post) {
                devLogger.info(`[${FILE_NAME}] Fetching user details for blog post`);
                const userDetails = await userService.getUserByID(post.userID);
                devLogger.info(`[${FILE_NAME}] User details fetched successfully`);
                devLogger.info(`[${FILE_NAME}] Fetching category details for blog post`);
                const categoryDetails = await blogCategoryService.getBlogCategoryByID(post.categoryID);
                devLogger.info(`[${FILE_NAME}] Category details fetched successfully`);

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

        devLogger.info(`[${FILE_NAME}] Blog posts with user and category information prepared successfully`);
        devLogger.success(`[${FILE_NAME}] All blog posts fetched successfully`);

        devLogger.info(`[${FILE_NAME}] Sending blog posts response to client`);

        return res.status(200).json(updatedBlogPosts);
    } 
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog posts with user and category information`, error);
        devLogger.warn(`[${FILE_NAME}] Get all blog posts request could not be completed`);
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
    devLogger.info(`[${FILE_NAME}] Get four blog posts with user and category info request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Calling blog post service to get four blog posts`);
        const blogPostsResponse = await blogPostService.getFourBlogPosts();

        if(blogPostsResponse.success && blogPostsResponse.successMessage === "Four blog posts fetched successfully"){
            devLogger.info(`[${FILE_NAME}] Four blog posts fetched successfully`);
        }
        const blogPosts = blogPostsResponse.resultData;

        devLogger.info(`[${FILE_NAME}] Preparing blog posts with user and category information`);

        const updatedBlogPosts = await Promise.all(
            blogPosts.map(async function(post) {
                devLogger.info(`[${FILE_NAME}] Fetching user details for blog post`);
                const userDetailsResponse = await userService.getUserByID(post.userID);

                if(userDetailsResponse.success && userDetailsResponse.successMessage === "User fetched successfully"){
                    devLogger.info(`[${FILE_NAME}] User details fetched successfully`);
                }

                const userDetails = userDetailsResponse.resultData;
                devLogger.info(`[${FILE_NAME}] Fetching category details for blog post`);
                const categoryDetailsResponse = await blogCategoryService.getBlogCategoryByID(post.categoryID);

                if(categoryDetailsResponse.success && categoryDetailsResponse.successMessage === "User fetched successfully"){
                    devLogger.info(`[${FILE_NAME}] Category details fetched successfully`);
                }

                const categoryDetails = categoryDetailsResponse.resultData;
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

        devLogger.info(`[${FILE_NAME}] Four blog posts with user and category information prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Four blog posts fetched successfully`);

        devLogger.info(`[${FILE_NAME}] Sending four blog posts response to client`);

        return res.status(200).json(updatedBlogPosts);
    } 
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch four blog posts with user and category information`, error);
        devLogger.warn(`[${FILE_NAME}] Get four blog posts request could not be completed`);
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
    devLogger.info(`[${FILE_NAME}] Get four blog posts for particular category request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Extracting category ID from request parameters`);
        const categoryID = req.params.categoryID;

        devLogger.info(`[${FILE_NAME}] Calling blog post service to get four blog posts by category`);
        const blogPostsResponse = await blogPostService.getFourBlogPostByCategory(categoryID);

        if(blogPostsResponse.success && blogPostsResponse.successMessage === "Four blog posts for particular category fetched successfully"){
            devLogger.info(`[${FILE_NAME}] Four blog posts for category fetched successfully`);
        }
        const blogPosts = blogPostsResponse.resultData;
        devLogger.info(`[${FILE_NAME}] Calling blog category service to get category details`);
        const categoryDetailsResponse = await blogCategoryService.getBlogCategoryByID(categoryID);

        if(categoryDetailsResponse.success && categoryDetailsResponse.successMessage === "User fetched successfully"){
            devLogger.info(`[${FILE_NAME}] Category details fetched successfully`);
        }
        const categoryDetails = categoryDetailsResponse.resultData;
        devLogger.info(`[${FILE_NAME}] Preparing blog posts with user and category information`);

        const updatedBlogPosts = await Promise.all(
            blogPosts.map(async function(post) {
                devLogger.info(`[${FILE_NAME}] Fetching user details for blog post`);
                const userDetailsResponse = await userService.getUserByID(post.userID);

                if(userDetailsResponse.success && userDetailsResponse.successMessage === "User fetched successfully"){
                    devLogger.info(`[${FILE_NAME}] User details fetched successfully`);
                }
                const userDetails = userDetailsResponse.resultData;
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

        devLogger.info(`[${FILE_NAME}] Blog posts with user and category information prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Four blog posts for particular category fetched successfully`);

        devLogger.info(`[${FILE_NAME}] Sending category blog posts response to client`);

        return res.status(200).json(updatedBlogPosts);
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch four blog posts for particular category`, error);
        devLogger.warn(`[${FILE_NAME}] Get category blog posts request could not be completed`);
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
    devLogger.info(`[${FILE_NAME}] Get particular blog post with user and category info request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        devLogger.info(`[${FILE_NAME}] Calling blog post service to get particular blog post`);
        const singleBlogPostResponse = await blogPostService.getBlogPostById(postID);

        if(singleBlogPostResponse.sucess && singleBlogPostResponse.successMessage === "Particular blog post fetched successfully"){
            devLogger.info(`[${FILE_NAME}] Particular blog post fetched successfully`);
        }
        const blogPost = singleBlogPostResponse.resultData[0];
        devLogger.info(`[${FILE_NAME}] Extracting user details for blog post`);
        const userDetailsResponse = await userService.getUserByID(blogPost.userID);

        if(userDetailsResponse.success && userDetailsResponse.successMessage === "User fetched successfully"){
            devLogger.info(`[${FILE_NAME}] User details fetched successfully`);
        }
        const userDetails = userDetailsResponse.resultData;
        devLogger.info(`[${FILE_NAME}] Extracting category details for blog post`);
        const categoryDetailsResponse = await blogCategoryService.getBlogCategoryByID(blogPost.categoryID);

        if(categoryDetailsResponse.success && categoryDetailsResponse.successMessage === "User fetched successfully"){
            devLogger.info(`[${FILE_NAME}] Category details fetched successfully`);
        }
        const categoryDetails = categoryDetailsResponse.resultData;
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

        devLogger.info(`[${FILE_NAME}] Particular blog post result prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Particular blog post fetched successfully`);

        devLogger.info(`[${FILE_NAME}] Sending particular blog post response to client`);

        return res.status(200).json(result);
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch particular blog post with user and category information`, error);
        devLogger.warn(`[${FILE_NAME}] Get particular blog post request could not be completed`);
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
    devLogger.info(`[${FILE_NAME}] Get paginated blog posts with user and category info request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Extracting pagination parameters from request query`);
        const params = {
            page: req.query.page,
            limit: req.query.limit
        };

        devLogger.info(`[${FILE_NAME}] Calling blog post service for paginated blog posts`);
        const blogPostsResponse = await blogPostService.getBlogPostPagination(params);
        devLogger.info(`[${FILE_NAME}] Paginated blog post service execution completed`);

        if(blogPostsResponse. success && blogPostsResponse.successMessage === "Blog posts with pagination fetched successfully"){
                devLogger.info(`[${FILE_NAME}] Blog post pagination data extracted successfully`);
        }

        const blogPostResponseResult = blogPostsResponse.resultData;
        const blogPosts = blogPostResponseResult.blogPostData;

        devLogger.info(`[${FILE_NAME}] Blog post pagination data extracted successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing paginated blog posts with user and category information`);

        const updatedBlogPosts = await Promise.all(
            blogPosts.map(async function(post) {
                devLogger.info(`[${FILE_NAME}] Fetching user details for blog post`);
                const userDetailsResponse = await userService.getUserByID(post.userID);

                if(userDetailsResponse.success && userDetailsResponse.successMessage === "User fetched successfully"){
                    devLogger.info(`[${FILE_NAME}] User details fetched successfully`);
                }
                const userDetails = userDetailsResponse.resultData;

                devLogger.info(`[${FILE_NAME}] Fetching category details for blog post`);

                const categoryDetailsResponse = await blogCategoryService.getBlogCategoryByID(post.categoryID);

                if(categoryDetailsResponse.success && categoryDetailsResponse.successMessage === "User fetched successfully"){
                    devLogger.info(`[${FILE_NAME}] Category details fetched successfully`);
                }
                const categoryDetails = categoryDetailsResponse.resultData;
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

        devLogger.info(`[${FILE_NAME}] Paginated blog posts with user and category information prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Paginated blog posts fetched successfully`);
        
        devLogger.info(`[${FILE_NAME}] Sending paginated blog posts response to client`);

        return res.status(200).json({
            currentPage: blogPostResponseResult.currentPage,
            totalPages: blogPostResponseResult.totalPages,
            totalCount: blogPostResponseResult.totalCount,
            blogPostData: updatedBlogPosts
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch paginated blog posts with user and category information`, error);
        devLogger.warn(`[${FILE_NAME}] Paginated blog posts request could not be completed`);
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
    devLogger.info(`[${FILE_NAME}] Get paginated blog posts for particular category request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Extracting category name from request parameters`);
        const categoryName = req.params.categoryName;

        devLogger.info(`[${FILE_NAME}] Calling blog category service to get category details by name`);
        const particularCategoryDetails = await blogCategoryService.getBlogCategoryByName(categoryName);
        devLogger.info(`[${FILE_NAME}] Particular category details fetched successfully`);
        
        const categoryID = particularCategoryDetails._id;
        devLogger.info(`[${FILE_NAME}] Category ID extracted successfully`);
        
        devLogger.info(`[${FILE_NAME}] Extracting pagination parameters from request query`);
        const params = {
            page: req.query.page,
            limit: req.query.limit
        };
        
        devLogger.info(`[${FILE_NAME}] Calling blog post service for category post pagination`);
        const response = await blogPostService.getCategoryPostPagination(categoryID, params);
        devLogger.info(`[${FILE_NAME}] Category post pagination service execution completed`);
        
        const blogPosts = response.blogPostData;
        devLogger.info(`[${FILE_NAME}] Category blog post pagination data extracted successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing category blog posts with user and category information`);

        const blogPostData = await Promise.all(
            blogPosts.map(async function(post) {
                devLogger.info(`[${FILE_NAME}] Fetching user details for category blog post`);
                const userDetails = await userService.getUserByID(post.userID);
                devLogger.info(`[${FILE_NAME}] User details fetched successfully`);
                devLogger.info(`[${FILE_NAME}] Fetching category details for category blog post`);
                const categoryDetails = await blogCategoryService.getBlogCategoryByID(post.categoryID);
                devLogger.info(`[${FILE_NAME}] Category details fetched successfully`);

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

        devLogger.info(`[${FILE_NAME}] Category blog posts with user and category information prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Paginated category blog posts fetched successfully`);
        
        devLogger.info(`[${FILE_NAME}] Sending category blog posts response to client`);

        return res.status(200).json({
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            totalCount: response.totalCount,
            blogPostData: blogPostData
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch paginated blog posts for particular category`, error);
        devLogger.warn(`[${FILE_NAME}] Category paginated blog posts request could not be completed`);
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
    devLogger.info(`[${FILE_NAME}] Get paginated blog posts for particular user request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Extracting username from request parameters`);
        const username = req.params.username;
        
        devLogger.info(`[${FILE_NAME}] Calling user service to get user details by username`);
        const particularUserDetails = await userService.getUserByUsername(username);
        devLogger.info(`[${FILE_NAME}] Particular user details fetched successfully`);
        
        const userID = particularUserDetails._id;
        devLogger.info(`[${FILE_NAME}] User ID extracted successfully`);
        
        devLogger.info(`[${FILE_NAME}] Extracting pagination parameters from request query`);
        const params = {
            page: req.query.page,
            limit: req.query.limit
        };
        devLogger.info(`[${FILE_NAME}] Calling blog post service for user post pagination`);
        
        const response = await blogPostService.getUserPostPagination(userID, params);
        devLogger.info(`[${FILE_NAME}] User post pagination service execution completed`);
        
        const blogPosts = response.blogPostData;
        devLogger.info(`[${FILE_NAME}] User blog post pagination data extracted successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing user blog posts with user and category information`);

        const blogPostData = await Promise.all(
            blogPosts.map(async function(post) {
                devLogger.info(`[${FILE_NAME}] Fetching user details for blog post`);
                const userDetails = await userService.getUserByID(post.userID);
                devLogger.info(`[${FILE_NAME}] User details fetched successfully`);
                devLogger.info(`[${FILE_NAME}] Fetching category details for blog post`);
                const categoryDetails = await blogCategoryService.getBlogCategoryByID(post.categoryID);
                devLogger.info(`[${FILE_NAME}] Category details fetched successfully`);

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

        devLogger.info(`[${FILE_NAME}] User blog posts with user and category information prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Paginated blog posts for particular user fetched successfully`);

        devLogger.info(`[${FILE_NAME}] Sending user blog posts response to client`);

        return res.status(200).json({
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            totalCount: response.totalCount,
            blogPostData: blogPostData
        });
    } 
    catch (error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch paginated blog posts for particular user`, error);
        devLogger.warn(`[${FILE_NAME}] User paginated blog posts request could not be completed`);
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
    devLogger.info(`[${FILE_NAME}] Get blog posted unique users details request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Calling blog post service to get unique user IDs`);
        const userIds = await blogPostService.getUniqueUserIds();

        devLogger.info(`[${FILE_NAME}] Unique blog posted user IDs fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing unique user details`);

        const usersDetails = await Promise.all(
            userIds.map(async function(userID) {
                devLogger.info(`[${FILE_NAME}] Fetching user details for unique blog posted user`);
                const user = await userService.getUserByID(userID);

                devLogger.info(`[${FILE_NAME}] User details fetched successfully`);

                return {
                    _id: user._id,
                    fullName: user.fullName,
                    username: user.username
                };
            })
        );

        devLogger.info(`[${FILE_NAME}] Unique user details prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Blog posted unique users details fetched successfully`);
        
        devLogger.info(`[${FILE_NAME}] Sending unique users response to client`);

        return res.status(200).json(usersDetails);
    }
    catch (error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog posted unique users details`, error);
        devLogger.warn(`[${FILE_NAME}] Unique users details request could not be completed`);
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
    devLogger.info(`[${FILE_NAME}] Get blog posted unique users for particular category request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Extracting category name from request parameters`);
        const categoryName = req.params.categoryName;
        devLogger.info(`[${FILE_NAME}] Calling blog category service to get category details by name`);
        const categoryDetails = await blogCategoryService.getBlogCategoryByName(categoryName);
        devLogger.info(`[${FILE_NAME}] Category details fetched successfully`);
        const categoryID = categoryDetails._id;
        devLogger.info(`[${FILE_NAME}] Category ID extracted successfully`);
        devLogger.info(`[${FILE_NAME}] Calling blog post service to get unique users by category`);
        const userIds = await blogPostService.getUniqueUsersByCategory(categoryID);

        devLogger.info(`[${FILE_NAME}] Unique users for category fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing unique user details`);

        const usersDetails = await Promise.all(
            userIds.map(async function(userID) {
                devLogger.info(`[${FILE_NAME}] Fetching user details for category blog user`);
                const user = await userService.getUserByID(userID);

                devLogger.info(`[${FILE_NAME}] User details fetched successfully`);

                return {
                    _id: user._id,
                    fullName: user.fullName,
                    username: user.username
                };
            })
        );

        devLogger.info(`[${FILE_NAME}] Category unique user details prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Blog posted unique users for category fetched successfully`);
        
        devLogger.info(`[${FILE_NAME}] Sending category unique users response to client`);

        return res.status(200).json(usersDetails);
    }
    catch (error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog posted unique users for particular category`, error);
        devLogger.warn(`[${FILE_NAME}] Category unique users request could not be completed`);
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
    devLogger.info(`[${FILE_NAME}] Get blog posted unique categories details request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Calling blog post service to get unique category IDs`);
        const categoryIds = await blogPostService.getUniqueCategoryIds();

        devLogger.info(`[${FILE_NAME}] Unique blog posted category IDs fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing unique category details`);

        const categoriesDetails = await Promise.all(
            categoryIds.map(async function(categoryID) {
                devLogger.info(`[${FILE_NAME}] Fetching category details for unique blog posted category`);
                const category = await blogCategoryService.getBlogCategoryByID(categoryID);

                devLogger.info(`[${FILE_NAME}] Category details fetched successfully`);

                return {
                    _id: category._id,
                    categoryName: category.categoryName
                };
            })
        );

        devLogger.info(`[${FILE_NAME}] Unique category details prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Blog posted unique categories details fetched successfully`);
        
        devLogger.info(`[${FILE_NAME}] Sending unique categories response to client`);

        return res.status(200).json(categoriesDetails);
    }
    catch (error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog posted unique categories details`, error);
        devLogger.warn(`[${FILE_NAME}] Unique categories details request could not be completed`);
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
    devLogger.info(`[${FILE_NAME}] Get blog posted unique categories for particular user request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Extracting username from request parameters`);
        const username = req.params.username;
        devLogger.info(`[${FILE_NAME}] Calling user service to get user details by username`);
        const userDetails = await userService.getUserByUsername(username);
        devLogger.info(`[${FILE_NAME}] User details fetched successfully`);
        const userID = userDetails._id;
        devLogger.info(`[${FILE_NAME}] User ID extracted successfully`);
        devLogger.info(`[${FILE_NAME}] Calling blog post service to get unique categories by user`);
        const categoryIds = await blogPostService.getUniqueCategoriesByUser(userID);

        devLogger.info(`[${FILE_NAME}] Unique categories for user fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing unique category details`);

        const categoriesDetails = await Promise.all(
            categoryIds.map(async function(categoryID) {
                devLogger.info(`[${FILE_NAME}] Fetching category details for user blog category`);
                const category = await blogCategoryService.getBlogCategoryByID(categoryID);

                devLogger.info(`[${FILE_NAME}] Category details fetched successfully`);

                return {
                    _id: category._id,
                    categoryName: category.categoryName
                };
            })
        );

        devLogger.info(`[${FILE_NAME}] User unique category details prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Blog posted unique categories for user fetched successfully`);
        
        devLogger.info(`[${FILE_NAME}] Sending user unique categories response to client`);

        return res.status(200).json(categoriesDetails);
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog posted unique categories for particular user`, error);
        devLogger.warn(`[${FILE_NAME}] User unique categories request could not be completed`);
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
    devLogger.info(`[${FILE_NAME}] Get blog post details with filter sort pagination request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Extracting filter, sort and pagination parameters`);
        const data = {
            sortSelection: req.body.sortSelection,
            allCheckedCategory: req.body.allCheckedCategory,
            allCheckedAuthor: req.body.allCheckedAuthor,
            checkedDate: req.body.checkedDate,
            page: req.query.page,
            limit: req.query.limit
        };
        devLogger.info(`[${FILE_NAME}] Filter, sort and pagination parameters extracted successfully`);
        devLogger.info(`[${FILE_NAME}] Calling blog post service for filter sort pagination`);
        const response = await blogPostService.filterSortPagination(data);
        devLogger.info(`[${FILE_NAME}] Blog post filter sort pagination service execution completed`);
        const blogPosts = response.blogPostData;

        devLogger.info(`[${FILE_NAME}] Filtered and sorted blog post data extracted successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing blog posts with user and category information`);

        const blogPostData = await Promise.all(
            blogPosts.map(async function(post) {
                devLogger.info(`[${FILE_NAME}] Fetching user details for filtered blog post`);
                const userDetails = await userService.getUserByID(post.userID);

                devLogger.info(`[${FILE_NAME}] User details fetched successfully`);
                devLogger.info(`[${FILE_NAME}] Fetching category details for filtered blog post`);
                const categoryDetails = await blogCategoryService.getBlogCategoryByID(post.categoryID);
                devLogger.info(`[${FILE_NAME}] Category details fetched successfully`);

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

        devLogger.info(`[${FILE_NAME}] Filtered blog posts with user and category information prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Blog post filter sort pagination completed successfully`);
        
        devLogger.info(`[${FILE_NAME}] Sending filtered blog posts response to client`);

        return res.status(200).json({
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            totalCount: response.totalCount,
            blogPostData
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog posts with filter sort pagination`, error);
        devLogger.warn(`[${FILE_NAME}] Filter sort pagination request could not be completed`);
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
    devLogger.info(`[${FILE_NAME}] Get filtered and sorted blog posts for particular user request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Extracting username from request parameters`);
        const username = req.params.username;

        devLogger.info(`[${FILE_NAME}] Calling user service to get user details by username`);
        const userDetails = await userService.getUserByUsername(username);
        devLogger.info(`[${FILE_NAME}] User details fetched successfully`);

        const userID = userDetails._id;
        devLogger.info(`[${FILE_NAME}] User ID extracted successfully`);

        devLogger.info(`[${FILE_NAME}] Extracting filter, sort and pagination parameters`);
        const data = {
            sortSelection: req.body.sortSelection,
            allCheckedCategory: req.body.allCheckedCategory,
            checkedDate: req.body.checkedDate,
            page: req.query.page,
            limit: req.query.limit
        };
        devLogger.info(`[${FILE_NAME}] Filter, sort and pagination parameters extracted successfully`);
        
        devLogger.info(`[${FILE_NAME}] Calling blog post service for user filter sort pagination`);
        const response = await blogPostService.filterSortPaginationByUser(userID, data);
        devLogger.info(`[${FILE_NAME}] User filter sort pagination service execution completed`);
        
        const blogPosts = response.blogPostData;
        devLogger.info(`[${FILE_NAME}] User filtered blog post data extracted successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing user blog posts with user and category information`);

        const blogPostData = await Promise.all(
            blogPosts.map(async function(post) {
                devLogger.info(`[${FILE_NAME}] Fetching user details for filtered user blog post`);
                const userDetails = await userService.getUserByID(post.userID);

                devLogger.info(`[${FILE_NAME}] User details fetched successfully`);
                devLogger.info(`[${FILE_NAME}] Fetching category details for filtered user blog post`);
                const categoryDetails = await blogCategoryService.getBlogCategoryByID(post.categoryID);
                devLogger.info(`[${FILE_NAME}] Category details fetched successfully`);

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

        devLogger.info(`[${FILE_NAME}] User filtered blog posts with user and category information prepared successfully`);
        devLogger.success(`[${FILE_NAME}] User blog post filter sort pagination completed successfully`);
        
        devLogger.info(`[${FILE_NAME}] Sending filtered user blog posts response to client`);

        return res.status(200).json({
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            totalCount: response.totalCount,
            blogPostData
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch filtered blog posts for particular user`, error);
        devLogger.warn(`[${FILE_NAME}] User filter sort pagination request could not be completed`);
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
    devLogger.info(`[${FILE_NAME}] Get filtered and sorted blog posts for particular category request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Extracting category name from request parameters`);
        const categoryName = req.params.categoryName;

        devLogger.info(`[${FILE_NAME}] Calling blog category service to get category details by name`);
        const categoryDetails = await blogCategoryService.getBlogCategoryByName(categoryName);
        devLogger.info(`[${FILE_NAME}] Category details fetched successfully`);

        const categoryID = categoryDetails._id;
        devLogger.info(`[${FILE_NAME}] Category ID extracted successfully`);

        devLogger.info(`[${FILE_NAME}] Extracting filter, sort and pagination parameters`);
        const data = {
            sortSelection: req.body.sortSelection,
            allCheckedAuthor: req.body.allCheckedAuthor,
            checkedDate: req.body.checkedDate,
            page: req.query.page,
            limit: req.query.limit
        };
        devLogger.info(`[${FILE_NAME}] Filter, sort and pagination parameters extracted successfully`);
        devLogger.info(`[${FILE_NAME}] Calling blog post service for category filter sort pagination`);
        const response = await blogPostService.filterSortPaginationByCategory(categoryID, data);
        devLogger.info(`[${FILE_NAME}] Category filter sort pagination service execution completed`);

        const blogPosts = response.blogPostData;
        devLogger.info(`[${FILE_NAME}] Category filtered blog post data extracted successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing category blog posts with user and category information`);

        const blogPostData = await Promise.all(
            blogPosts.map(async function(post) {
                devLogger.info(`[${FILE_NAME}] Fetching user details for filtered category blog post`);
                const userDetails = await userService.getUserByID(post.userID);
                devLogger.info(`[${FILE_NAME}] User details fetched successfully`);

                devLogger.info(`[${FILE_NAME}] Fetching category details for filtered category blog post`);
                const categoryDetails = await blogCategoryService.getBlogCategoryByID(post.categoryID);
                devLogger.info(`[${FILE_NAME}] Category details fetched successfully`);

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

        devLogger.info(`[${FILE_NAME}] Category filtered blog posts with user and category information prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Category blog post filter sort pagination completed successfully`);

        devLogger.info(`[${FILE_NAME}] Sending filtered category blog posts response to client`);

        return res.status(200).json({
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            totalCount: response.totalCount,
            blogPostData
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch filtered blog posts for particular category`, error);
        devLogger.warn(`[${FILE_NAME}] Category filter sort pagination request could not be completed`);
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