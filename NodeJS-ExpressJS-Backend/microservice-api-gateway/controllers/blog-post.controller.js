const blogPostService = require("../services/blog-post.service.js");
const userService = require("../services/blog-user.service.js");
const blogCategoryService = require("../services/blog-category.service.js");
const blogCommentService = require("../services/blog-comment.service.js");
const blogLikeService = require("../services/blog-post-like.service.js");

const devLogger = require("../utils/dev-logger.js");
const handleError = require("../utils/error-handler.js");

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

        if(!token) {
            devLogger.warn(`[${FILE_NAME}] Add blog post request received without authentication token`);
            return res.status(401).json({
                success: false,
                error: true,
                successMessage: "",
                errorMessage: "Not Authenticated",
                errorData: null,
                resultData: null
            });
        }

        devLogger.info(`[${FILE_NAME}] Authentication token found successfully`);
        devLogger.info(`[${FILE_NAME}] Checking blog post image details`);

        if(!data.imageDetail || data.imageDetail === "") {
            devLogger.warn(`[${FILE_NAME}] Blog post image was not provided`);
            return res.status(417).json({
                success: false,
                error: true,
                successMessage: "",
                errorMessage: "Please upload the image",
                errorData: null,
                resultData: null
            });
        }

        devLogger.info(`[${FILE_NAME}] Blog post image details validated successfully`);
        devLogger.info(`[${FILE_NAME}] Calling blog post service to add new blog post`);

        const blogPostResponse = await blogPostService.addBlogPost(data, token);

        if(!blogPostResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to add blog post: ${blogPostResponse?.errorMessage || "Failed to add blog post"}`);
            throw blogPostResponse;
        }

        devLogger.info(`[${FILE_NAME}] Blog post creation service completed successfully`);
        devLogger.success(`[${FILE_NAME}] New blog post added successfully`);
        devLogger.info(`[${FILE_NAME}] Sending blog post creation response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: blogPostResponse.successMessage,
            errorMessage: "",
            errorData: null,
            resultData: blogPostResponse.resultData
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to add new blog post`, error);
        devLogger.warn(`[${FILE_NAME}] Add blog post request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Adding Blog Post Code Ends
// ============================================================



// ============================================================
// Deleting Particular Post Code Starts
// ============================================================
async function deleteParticularBlogPost(req, res) {
    devLogger.info(`[${FILE_NAME}] Delete particular blog post request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        devLogger.info(`[${FILE_NAME}] Extracting authentication token`);
        const token = req.body.token || req.cookies.jwt_access_token;

        if(!token) {
            devLogger.warn(`[${FILE_NAME}] Delete blog post request received without authentication token`);
            return res.status(401).json({
                success: false,
                error: true,
                successMessage: "",
                errorMessage: "Not Authenticated",
                errorData: null,
                resultData: null
            });
        }

        devLogger.info(`[${FILE_NAME}] Authentication token found successfully`);
        devLogger.info(`[${FILE_NAME}] Deleting all likes for blog post: ${postID}`);

        const deleteAllLikesResponse = await blogLikeService.deleteAllLikesForPost(postID, token);

        if(!deleteAllLikesResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to delete likes for blog post: ${deleteAllLikesResponse?.errorMessage || "Failed to delete likes"}`);
            throw deleteAllLikesResponse;
        }

        devLogger.info(`[${FILE_NAME}] All likes deleted successfully for blog post: ${postID}`);
        devLogger.info(`[${FILE_NAME}] Deleting all comments for blog post: ${postID}`);

        const deleteAllCommentsResponse = await blogCommentService.deleteCommentsByPostId(postID, token);

        if(!deleteAllCommentsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to delete comments for blog post: ${deleteAllCommentsResponse?.errorMessage || "Failed to delete comments"}`);
            throw deleteAllCommentsResponse;
        }

        devLogger.info(`[${FILE_NAME}] All comments deleted successfully for blog post: ${postID}`);

        devLogger.info(`[${FILE_NAME}] Deleting particular blog post: ${postID}`);
        const deletePostResponse = await blogPostService.deleteBlogPost(postID, token);

        if(!deletePostResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to delete blog post: ${deletePostResponse?.errorMessage || "Failed to delete blog post"}`);
            throw deletePostResponse;
        }

        devLogger.info(`[${FILE_NAME}] Blog post deleted successfully: ${postID}`);
        devLogger.success(`[${FILE_NAME}] Particular blog post deletion completed successfully`);
        devLogger.info(`[${FILE_NAME}] Sending blog post deletion response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: deletePostResponse.successMessage,
            errorMessage: "",
            errorData: null,
            resultData: deletePostResponse.resultData
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to delete particular blog post`, error);
        devLogger.warn(`[${FILE_NAME}] Delete blog post request could not be completed`);
        return handleError(res, error);
    }
}
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

        if(!token) {
            devLogger.warn(`[${FILE_NAME}] Update blog post request received without authentication token`);
            return res.status(401).json({
                success: false,
                error: true,
                successMessage: "",
                errorMessage: "Not Authenticated",
                errorData: null,
                resultData: null
            });
        }

        devLogger.info(`[${FILE_NAME}] Authentication token found successfully`);
        devLogger.info(`[${FILE_NAME}] Updating particular blog post: ${postID}`);

        const updateBlogPostResponse = await blogPostService.updateBlogPost(postID, data, token);
        if(!updateBlogPostResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to update blog post: ${updateBlogPostResponse?.errorMessage || "Failed to update blog post"}`);
            throw updateBlogPostResponse;
        }

        devLogger.info(`[${FILE_NAME}] Blog post updated successfully: ${postID}`);
        devLogger.success(`[${FILE_NAME}] Particular blog post update completed successfully`);
        devLogger.info(`[${FILE_NAME}] Sending blog post update response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: updateBlogPostResponse.successMessage,
            errorMessage: "",
            errorData: null,
            resultData: updateBlogPostResponse.resultData
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to update particular blog post`, error);
        devLogger.warn(`[${FILE_NAME}] Update blog post request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Updating Particular Post Code Ends
// ============================================================



// ============================================================
// Get All Blog Posts With User And Category Info Code Starts
// ============================================================
async function getAllBlogPostWithUserAndCategoryInfo(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get all blog posts with user and category info request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Fetching all blog posts`);

        const blogPostsResponse = await blogPostService.getAllBlogPosts();

        if(!blogPostsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch blog posts: ${blogPostsResponse?.errorMessage || "Failed to fetch blog posts"}`);
            throw blogPostsResponse;
        }

        const blogPosts = blogPostsResponse.resultData || [];

        devLogger.info(`[${FILE_NAME}] ${blogPosts.length} blog posts fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing blog posts with user and category information`);

        const updatedBlogPosts = await Promise.all(
            blogPosts.map(async function(post) {
                devLogger.info(`[${FILE_NAME}] Fetching user and category details for blog post: ${post._id}`);

                const [userDetailsResponse, categoryDetailsResponse] = await Promise.all([
                    userService.getUserByID(post.userID),
                    blogCategoryService.getBlogCategoryByID(post.categoryID)
                ]);

                if(!userDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch user details for blog post: ${post._id}`);
                    throw userDetailsResponse;
                }

                if(!categoryDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch category details for blog post: ${post._id}`);
                    throw categoryDetailsResponse;
                }

                const userDetails = userDetailsResponse.resultData;
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

        devLogger.info(`[${FILE_NAME}] Blog posts with user and category information prepared successfully`);
        devLogger.success(`[${FILE_NAME}] All blog posts fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending blog posts response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: "All blog posts fetched successfully",
            errorMessage: "",
            errorData: null,
            resultData: updatedBlogPosts
        });
    } 
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog posts with user and category information`, error);
        devLogger.warn(`[${FILE_NAME}] Get all blog posts request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Get All Blog Posts With User And Category Info Code Ends
// ============================================================



// ============================================================
// Get Four Blog Posts With User And Category Info Code Starts
// ============================================================
async function getFourBlogPostWithUserAndCategoryInfo(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get four blog posts with user and category info request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Fetching four blog posts`);

        const blogPostsResponse = await blogPostService.getFourBlogPosts();

        if(!blogPostsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch four blog posts: ${blogPostsResponse?.errorMessage || "Failed to fetch four blog posts"}`);
            return handleError(res, blogPostsResponse);
        }

        const blogPosts = blogPostsResponse.resultData || [];

        devLogger.info(`[${FILE_NAME}] ${blogPosts.length} blog posts fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing blog posts with user and category information`);

        const updatedBlogPosts = await Promise.all(
            blogPosts.map(async function(post) {
                devLogger.info(`[${FILE_NAME}] Fetching user and category details for blog post: ${post._id}`);

                const [userDetailsResponse, categoryDetailsResponse] = await Promise.all([
                    userService.getUserByID(post.userID),
                    blogCategoryService.getBlogCategoryByID(post.categoryID)
                ]);

                if(!userDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch user details for blog post: ${post._id}`);
                    throw userDetailsResponse;
                }

                if(!categoryDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch category details for blog post: ${post._id}`);
                    throw categoryDetailsResponse;
                }

                const userDetails = userDetailsResponse.resultData;
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

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: "Four blog posts fetched successfully",
            errorMessage: "",
            errorData: null,
            resultData: updatedBlogPosts
        });
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
async function getFourBlogPostWithUserAndCategoryInfoForParticularCategory(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get four blog posts for particular category request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting category ID from request parameters`);
        const categoryID = req.params.categoryID;

        devLogger.info(`[${FILE_NAME}] Fetching four blog posts by category`);
        const blogPostsResponse = await blogPostService.getFourBlogPostByCategory(categoryID);

        if(!blogPostsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch four blog posts by category: ${blogPostsResponse?.errorMessage || "Failed to fetch four blog posts by category"}`);
            throw blogPostsResponse;
        }

        const blogPosts = blogPostsResponse.resultData || [];

        devLogger.info(`[${FILE_NAME}] ${blogPosts.length} blog posts fetched successfully for category: ${categoryID}`);
        devLogger.info(`[${FILE_NAME}] Fetching category details`);

        const categoryDetailsResponse = await blogCategoryService.getBlogCategoryByID(categoryID);

        if(!categoryDetailsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch category details: ${categoryDetailsResponse?.errorMessage || "Failed to fetch category details"}`);
            throw categoryDetailsResponse;
        }

        const categoryDetails = categoryDetailsResponse.resultData;

        devLogger.info(`[${FILE_NAME}] Category details fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing blog posts with user and category information`);

        const updatedBlogPosts = await Promise.all(
            blogPosts.map(async function(post) {
                devLogger.info(`[${FILE_NAME}] Fetching user details for blog post: ${post._id}`);

                const userDetailsResponse = await userService.getUserByID(post.userID);

                if(!userDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch user details for blog post: ${post._id}`);
                    throw userDetailsResponse;
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

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: "Four blog posts for particular category fetched successfully",
            errorMessage: "",
            errorData: null,
            resultData: updatedBlogPosts
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch four blog posts for particular category`, error);
        devLogger.warn(`[${FILE_NAME}] Get category blog posts request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Get Four Blog Posts With User And Category Info For Particular Category Code Ends
// ============================================================



// ============================================================
// Get Particular Blog Post With User And Category Info Code Starts
// ============================================================
async function getParticularBlogPostWithUserAndCategoryInfo(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get particular blog post with user and category info request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        devLogger.info(`[${FILE_NAME}] Fetching particular blog post`);
        const singleBlogPostResponse = await blogPostService.getBlogPostById(postID);

        if(!singleBlogPostResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch particular blog post: ${singleBlogPostResponse?.errorMessage || "Failed to fetch particular blog post"}`);
            throw singleBlogPostResponse;
        }

        const blogPost = singleBlogPostResponse.resultData?.[0];

        if(!blogPost) {
            devLogger.error(`[${FILE_NAME}] Blog post not found: ${postID}`);
            throw {
                success: false,
                error: true,
                successMessage: "",
                errorMessage: "Blog post not found",
                errorData: null,
                resultData: null,
                status: 404
            };
        }

        devLogger.info(`[${FILE_NAME}] Blog post fetched successfully: ${postID}`);
        devLogger.info(`[${FILE_NAME}] Fetching user details for blog post`);

        const userDetailsResponse = await userService.getUserByID(blogPost.userID);

        if(!userDetailsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch user details for blog post: ${postID}`);
            throw userDetailsResponse;
        }

        const userDetails = userDetailsResponse.resultData;

        devLogger.info(`[${FILE_NAME}] User details fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Fetching category details for blog post`);

        const categoryDetailsResponse = await blogCategoryService.getBlogCategoryByID(blogPost.categoryID);

        if(!categoryDetailsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch category details for blog post: ${postID}`);
            throw categoryDetailsResponse;
        }

        const categoryDetails = categoryDetailsResponse.resultData;

        devLogger.info(`[${FILE_NAME}] Category details fetched successfully`);

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

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: "Particular blog post fetched successfully",
            errorMessage: "",
            errorData: null,
            resultData: result
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch particular blog post with user and category information`, error);
        devLogger.warn(`[${FILE_NAME}] Get particular blog post request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Get Particular Blog Post With User And Category Info Code Ends
// ============================================================



// ============================================================
// Get Blog Posts With User And Category Info With Pagination Code Starts
// ============================================================
async function getBlogPostWithUserAndCategoryInfoWithPagination(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get paginated blog posts with user and category info request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting pagination parameters from request query`);
        const params = {
            page: req.query.page,
            limit: req.query.limit
        };

        devLogger.info(`[${FILE_NAME}] Fetching paginated blog posts`);
        const blogPostsResponse = await blogPostService.getBlogPostPagination(params);

        if(!blogPostsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch paginated blog posts: ${blogPostsResponse?.errorMessage || "Failed to fetch paginated blog posts"}`);
            throw blogPostsResponse;
        }

        const blogPostResponseResult = blogPostsResponse.resultData || {};
        const blogPosts = blogPostResponseResult.blogPostData || [];

        devLogger.info(`[${FILE_NAME}] ${blogPosts.length} paginated blog posts fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing paginated blog posts with user and category information`);

        const updatedBlogPosts = await Promise.all(
            blogPosts.map(async function(post) {
                devLogger.info(`[${FILE_NAME}] Fetching user and category details for blog post: ${post._id}`);

                const [userDetailsResponse, categoryDetailsResponse] = await Promise.all([
                    userService.getUserByID(post.userID),
                    blogCategoryService.getBlogCategoryByID(post.categoryID)
                ]);

                if(!userDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch user details for blog post: ${post._id}`);
                    throw userDetailsResponse;
                }

                if(!categoryDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch category details for blog post: ${post._id}`);
                    throw categoryDetailsResponse;
                }

                const userDetails = userDetailsResponse.resultData;
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
            success: true,
            error: false,
            successMessage: "Blog posts with pagination fetched successfully",
            errorMessage: "",
            errorData: null,
            resultData: {
                currentPage: blogPostResponseResult.currentPage,
                totalPages: blogPostResponseResult.totalPages,
                totalCount: blogPostResponseResult.totalCount,
                blogPostData: updatedBlogPosts
            }
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch paginated blog posts with user and category information`, error);
        devLogger.warn(`[${FILE_NAME}] Paginated blog posts request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Get Blog Posts With User And Category Info With Pagination Code Ends
// ============================================================



// ============================================================
// Get Blog Posts With User And Category Info For Particular Category With Pagination Code Starts
// ============================================================
async function getBlogPostWithUserAndCategoryInfoForParticularCategoryWithPagination(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get paginated blog posts for particular category request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting category name from request parameters`);
        const categoryName = req.params.categoryName;

        devLogger.info(`[${FILE_NAME}] Fetching category details by name`);
        const particularCategoryDetailsResponse = await blogCategoryService.getBlogCategoryByName(categoryName);

        if(!particularCategoryDetailsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch category details: ${particularCategoryDetailsResponse?.errorMessage || "Failed to fetch category details"}`);
            throw particularCategoryDetailsResponse;
        }

        const particularCategoryDetails = particularCategoryDetailsResponse.resultData;
        const categoryID = particularCategoryDetails._id;

        devLogger.info(`[${FILE_NAME}] Category ID extracted successfully: ${categoryID}`);
        devLogger.info(`[${FILE_NAME}] Extracting pagination parameters from request query`);

        const params = {
            page: req.query.page,
            limit: req.query.limit
        };

        devLogger.info(`[${FILE_NAME}] Fetching paginated blog posts for category`);
        const blogPostsResponse = await blogPostService.getCategoryPostPagination(categoryID, params);

        if(!blogPostsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch category blog posts with pagination: ${blogPostsResponse?.errorMessage || "Failed to fetch category blog posts with pagination"}`);
            throw blogPostsResponse;
        }

        const blogPostResponseResult = blogPostsResponse.resultData || {};
        const blogPosts = blogPostResponseResult.blogPostData || [];

        devLogger.info(`[${FILE_NAME}] ${blogPosts.length} category blog posts fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing category blog posts with user and category information`);

        const blogPostData = await Promise.all(
            blogPosts.map(async function(post) {
                devLogger.info(`[${FILE_NAME}] Fetching user and category details for blog post: ${post._id}`);

                const [userDetailsResponse, categoryDetailsResponse] = await Promise.all([
                    userService.getUserByID(post.userID),
                    blogCategoryService.getBlogCategoryByID(post.categoryID)
                ]);

                if(!userDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch user details for blog post: ${post._id}`);
                    throw userDetailsResponse;
                }

                if(!categoryDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch category details for blog post: ${post._id}`);
                    throw categoryDetailsResponse;
                }

                const userDetails = userDetailsResponse.resultData;
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

        devLogger.info(`[${FILE_NAME}] Category blog posts with user and category information prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Paginated category blog posts fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending category blog posts response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: "Blog posts for particular category with pagination fetched successfully",
            errorMessage: "",
            errorData: null,
            resultData: {
                currentPage: blogPostResponseResult.currentPage,
                totalPages: blogPostResponseResult.totalPages,
                totalCount: blogPostResponseResult.totalCount,
                blogPostData: blogPostData
            }
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch paginated blog posts for particular category`, error);
        devLogger.warn(`[${FILE_NAME}] Category paginated blog posts request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Get Blog Posts With User And Category Info For Particular Category With Pagination Code Ends
// ============================================================



// ============================================================
// Get Blog Posts With User And Category For Particular User With Pagination Code Starts
// ============================================================
async function getBlogPostWithUserAndCategoryForParticularUserInfoWithPagination(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get paginated blog posts for particular user request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting username from request parameters`);
        const username = req.params.username;

        devLogger.info(`[${FILE_NAME}] Fetching user details by username`);
        const particularUserDetailsResponse = await userService.getUserByUsername(username);

        if(!particularUserDetailsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch user details: ${particularUserDetailsResponse?.errorMessage || "Failed to fetch user details"}`);
            throw particularUserDetailsResponse;
        }

        const particularUserDetails = particularUserDetailsResponse.resultData;
        const userID = particularUserDetails._id;

        devLogger.info(`[${FILE_NAME}] User ID extracted successfully: ${userID}`);
        devLogger.info(`[${FILE_NAME}] Extracting pagination parameters from request query`);

        const params = {
            page: req.query.page,
            limit: req.query.limit
        };

        devLogger.info(`[${FILE_NAME}] Fetching paginated blog posts for user`);
        const blogPostsResponse = await blogPostService.getUserPostPagination(userID, params);

        if(!blogPostsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch user blog posts with pagination: ${blogPostsResponse?.errorMessage || "Failed to fetch user blog posts with pagination"}`);
            throw blogPostsResponse;
        }

        const blogPostResponseResult = blogPostsResponse.resultData || {};
        const blogPosts = blogPostResponseResult.blogPostData || [];

        devLogger.info(`[${FILE_NAME}] ${blogPosts.length} user blog posts fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing user blog posts with user and category information`);

        const blogPostData = await Promise.all(
            blogPosts.map(async function(post) {
                devLogger.info(`[${FILE_NAME}] Fetching user and category details for blog post: ${post._id}`);

                const [userDetailsResponse, categoryDetailsResponse] = await Promise.all([
                    userService.getUserByID(post.userID),
                    blogCategoryService.getBlogCategoryByID(post.categoryID)
                ]);

                if(!userDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch user details for blog post: ${post._id}`);
                    throw userDetailsResponse;
                }

                if(!categoryDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch category details for blog post: ${post._id}`);
                    throw categoryDetailsResponse;
                }

                const userDetails = userDetailsResponse.resultData;
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

        devLogger.info(`[${FILE_NAME}] User blog posts with user and category information prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Paginated blog posts for particular user fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending user blog posts response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: "Blog posts for particular user fetched successfully",
            errorMessage: "",
            errorData: null,
            resultData: {
                currentPage: blogPostResponseResult.currentPage,
                totalPages: blogPostResponseResult.totalPages,
                totalCount: blogPostResponseResult.totalCount,
                blogPostData: blogPostData
            }
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch paginated blog posts for particular user`, error);
        devLogger.warn(`[${FILE_NAME}] User paginated blog posts request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Get Blog Posts With User And Category For Particular User With Pagination Code Ends
// ============================================================



// ============================================================
// Get Blog Posted Unique Users Details Code Starts
// ============================================================
async function getBlogPostedUniqueUsersDetails(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get blog posted unique users details request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Fetching unique user IDs`);

        const userIdsResponse = await blogPostService.getUniqueUserIds();

        if(!userIdsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch unique user IDs: ${userIdsResponse?.errorMessage || "Failed to fetch unique user IDs"}`);
            throw userIdsResponse;
        }

        const userIds = userIdsResponse.resultData || [];

        devLogger.info(`[${FILE_NAME}] ${userIds.length} unique user IDs fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing unique user details`);

        const usersDetails = await Promise.all(
            userIds.map(async function(userID) {
                devLogger.info(`[${FILE_NAME}] Fetching user details for unique blog posted user: ${userID}`);

                const userDetailsResponse = await userService.getUserByID(userID);

                if(!userDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch user details for user: ${userID}`);
                    throw userDetailsResponse;
                }

                const userDetails = userDetailsResponse.resultData;

                return {
                    _id: userDetails._id,
                    fullName: userDetails.fullName,
                    username: userDetails.username
                };
            })
        );

        devLogger.info(`[${FILE_NAME}] Unique user details prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Blog posted unique users details fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending unique users response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: "Blog posted unique users details fetched successfully",
            errorMessage: "",
            errorData: null,
            resultData: usersDetails
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog posted unique users details`, error);
        devLogger.warn(`[${FILE_NAME}] Unique users details request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Get Blog Posted Unique Users Details Code Ends
// ============================================================



// ============================================================
// Get Blog Posted Unique Users Details For Particular Category Code Starts
// ============================================================
async function getBlogPostedUniqueUsersDetailsForParticularCategory(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get blog posted unique users for particular category request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting category name from request parameters`);
        const categoryName = req.params.categoryName;

        devLogger.info(`[${FILE_NAME}] Fetching category details by name`);
        const categoryDetailsResponse = await blogCategoryService.getBlogCategoryByName(categoryName);

        if(!categoryDetailsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch category details: ${categoryDetailsResponse?.errorMessage || "Failed to fetch category details"}`);
            throw categoryDetailsResponse;
        }

        const categoryDetails = categoryDetailsResponse.resultData;
        const categoryID = categoryDetails._id;

        devLogger.info(`[${FILE_NAME}] Category ID extracted successfully: ${categoryID}`);
        devLogger.info(`[${FILE_NAME}] Fetching unique users by category`);

        const userIdsResponse = await blogPostService.getUniqueUsersByCategory(categoryID);

        if(!userIdsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch unique users by category: ${userIdsResponse?.errorMessage || "Failed to fetch unique users by category"}`);
            throw userIdsResponse;
        }

        const userIds = userIdsResponse.resultData || [];

        devLogger.info(`[${FILE_NAME}] ${userIds.length} unique users fetched successfully for category`);
        devLogger.info(`[${FILE_NAME}] Preparing unique user details`);

        const usersDetails = await Promise.all(
            userIds.map(async function(userID) {
                devLogger.info(`[${FILE_NAME}] Fetching user details for unique blog posted user: ${userID}`);

                const userDetailsResponse = await userService.getUserByID(userID);

                if(!userDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch user details for user: ${userID}`);
                    throw userDetailsResponse;
                }

                const userDetails = userDetailsResponse.resultData;

                return {
                    _id: userDetails._id,
                    fullName: userDetails.fullName,
                    username: userDetails.username
                };
            })
        );

        devLogger.info(`[${FILE_NAME}] Category unique user details prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Blog posted unique users for category fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending category unique users response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: "Blog posted unique users for particular category fetched successfully",
            errorMessage: "",
            errorData: null,
            resultData: usersDetails
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog posted unique users for particular category`, error);
        devLogger.warn(`[${FILE_NAME}] Category unique users request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Get Blog Posted Unique Users Details For Particular Category Code Ends
// ============================================================



// ============================================================
// Get Blog Posted Unique Categories Details Code Starts
// ============================================================
async function getBlogPostedUniqueCategoriesDetails(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get blog posted unique categories details request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Fetching unique category IDs`);
        const categoryIdsResponse = await blogPostService.getUniqueCategoryIds();

        if(!categoryIdsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch unique category IDs: ${categoryIdsResponse?.errorMessage || "Failed to fetch unique category IDs"}`);
            throw categoryIdsResponse;
        }

        const categoryIds = categoryIdsResponse.resultData || [];

        devLogger.info(`[${FILE_NAME}] ${categoryIds.length} unique category IDs fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing unique category details`);

        const categoriesDetails = await Promise.all(
            categoryIds.map(async function(categoryID) {
                devLogger.info(`[${FILE_NAME}] Fetching category details for unique blog posted category: ${categoryID}`);
                const categoryDetailsResponse = await blogCategoryService.getBlogCategoryByID(categoryID);

                if(!categoryDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch category details for category: ${categoryID}`);
                    throw categoryDetailsResponse;
                }

                const categoryDetails = categoryDetailsResponse.resultData;

                return {
                    _id: categoryDetails._id,
                    categoryName: categoryDetails.categoryName
                };
            })
        );

        devLogger.info(`[${FILE_NAME}] Unique category details prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Blog posted unique categories details fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending unique categories response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: "Blog posted unique categories details fetched successfully",
            errorMessage: "",
            errorData: null,
            resultData: categoriesDetails
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog posted unique categories details`, error);
        devLogger.warn(`[${FILE_NAME}] Unique categories details request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Get Blog Posted Unique Categories Details Code Ends
// ============================================================



// ============================================================
// Get Blog Posted Unique Categories Details For Particular User Code Starts
// ============================================================
async function getBlogPostedUniqueCategoriesDetailsForParticularUser(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get blog posted unique categories for particular user request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting username from request parameters`);
        const username = req.params.username;

        devLogger.info(`[${FILE_NAME}] Fetching user details by username`);
        const userDetailsResponse = await userService.getUserByUsername(username);

        if(!userDetailsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch user details: ${userDetailsResponse?.errorMessage || "Failed to fetch user details"}`);
            throw userDetailsResponse;
        }

        const userDetails = userDetailsResponse.resultData;
        const userID = userDetails._id;

        devLogger.info(`[${FILE_NAME}] User ID extracted successfully: ${userID}`);
        devLogger.info(`[${FILE_NAME}] Fetching unique categories by user`);

        const categoryIdsResponse = await blogPostService.getUniqueCategoriesByUser(userID);

        if(!categoryIdsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch unique categories by user: ${categoryIdsResponse?.errorMessage || "Failed to fetch unique categories by user"}`);
            throw categoryIdsResponse;
        }

        const categoryIds = categoryIdsResponse.resultData || [];

        devLogger.info(`[${FILE_NAME}] ${categoryIds.length} unique categories fetched successfully for user`);
        devLogger.info(`[${FILE_NAME}] Preparing unique category details`);

        const categoriesDetails = await Promise.all(
            categoryIds.map(async function(categoryID) {
                devLogger.info(`[${FILE_NAME}] Fetching category details for unique blog posted category: ${categoryID}`);
                const categoryDetailsResponse = await blogCategoryService.getBlogCategoryByID(categoryID);

                if(!categoryDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch category details for category: ${categoryID}`);
                    throw categoryDetailsResponse;
                }

                const categoryDetails = categoryDetailsResponse.resultData;

                return {
                    _id: categoryDetails._id,
                    categoryName: categoryDetails.categoryName
                };
            })
        );

        devLogger.info(`[${FILE_NAME}] User unique category details prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Blog posted unique categories for user fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending user unique categories response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: "Blog posted unique categories for user fetched successfully",
            errorMessage: "",
            errorData: null,
            resultData: categoriesDetails
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog posted unique categories for particular user`, error);
        devLogger.warn(`[${FILE_NAME}] User unique categories request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Get Blog Posted Unique Categories Details For Particular User Code Ends
// ============================================================



// ============================================================
// Get Blog Post Details With Filter Sort With Pagination Code Starts
// ============================================================
async function getBlogPostDetailsWithFilterSortWithPagination(req, res, next) {
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
        devLogger.info(`[${FILE_NAME}] Fetching blog posts with filter, sort and pagination`);

        const blogPostsResponse = await blogPostService.filterSortPagination(data);

        if(!blogPostsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to filter and sort blog posts: ${blogPostsResponse?.errorMessage || "Failed to filter and sort blog posts"}`);
            throw blogPostsResponse;
        }

        const blogPostResponseResult = blogPostsResponse.resultData || {};
        const blogPosts = blogPostResponseResult.blogPostData || [];

        devLogger.info(`[${FILE_NAME}] ${blogPosts.length} filtered and sorted blog posts fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing filtered blog posts with user and category information`);

        const blogPostData = await Promise.all(
            blogPosts.map(async function(post) {
                devLogger.info(`[${FILE_NAME}] Fetching user and category details for blog post: ${post._id}`);
                const [userDetailsResponse, categoryDetailsResponse] = await Promise.all([
                    userService.getUserByID(post.userID),
                    blogCategoryService.getBlogCategoryByID(post.categoryID)
                ]);

                if(!userDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch user details for blog post: ${post._id}`);
                    throw userDetailsResponse;
                }

                if(!categoryDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch category details for blog post: ${post._id}`);
                    throw categoryDetailsResponse;
                }

                const userDetails = userDetailsResponse.resultData;
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

        devLogger.info(`[${FILE_NAME}] Filtered blog posts with user and category information prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Blog post filter sort pagination completed successfully`);
        devLogger.info(`[${FILE_NAME}] Sending filtered blog posts response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: "Blog post filter sort pagination completed successfully",
            errorMessage: "",
            errorData: null,
            resultData: {
                currentPage: blogPostResponseResult.currentPage,
                totalPages: blogPostResponseResult.totalPages,
                totalCount: blogPostResponseResult.totalCount,
                blogPostData: blogPostData
            }
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog posts with filter sort pagination`, error);
        devLogger.warn(`[${FILE_NAME}] Filter sort pagination request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Get Blog Post Details With Filter Sort With Pagination Code Ends
// ============================================================



// ============================================================
// Get Blog Post Details With Filter Sort With Pagination For Particular User Code Starts
// ============================================================
async function getBlogPostDetailsWithFilterSortWithPaginationForParticularUser(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get filtered and sorted blog posts for particular user request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting username from request parameters`);
        const username = req.params.username;

        devLogger.info(`[${FILE_NAME}] Fetching user details by username`);
        const userDetailsResponse = await userService.getUserByUsername(username);

        if(!userDetailsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch user details: ${userDetailsResponse?.errorMessage || "Failed to fetch user details"}`);
            throw userDetailsResponse;
        }

        const userDetails = userDetailsResponse.resultData;
        const userID = userDetails._id;

        devLogger.info(`[${FILE_NAME}] User ID extracted successfully: ${userID}`);
        devLogger.info(`[${FILE_NAME}] Extracting filter, sort and pagination parameters`);

        const data = {
            sortSelection: req.body.sortSelection,
            allCheckedCategory: req.body.allCheckedCategory,
            checkedDate: req.body.checkedDate,
            page: req.query.page,
            limit: req.query.limit
        };

        devLogger.info(`[${FILE_NAME}] Filter, sort and pagination parameters extracted successfully`);
        devLogger.info(`[${FILE_NAME}] Fetching filtered and sorted blog posts for user`);

        const blogPostsResponse = await blogPostService.filterSortPaginationByUser(userID, data);

        if(!blogPostsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to filter user blog posts: ${blogPostsResponse?.errorMessage || "Failed to filter user blog posts"}`);
            throw blogPostsResponse;
        }

        const blogPostResponseResult = blogPostsResponse.resultData || {};
        const blogPosts = blogPostResponseResult.blogPostData || [];

        devLogger.info(`[${FILE_NAME}] ${blogPosts.length} filtered user blog posts fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing user blog posts with user and category information`);

        const blogPostData = await Promise.all(
            blogPosts.map(async function(post) {
                devLogger.info(`[${FILE_NAME}] Fetching user and category details for blog post: ${post._id}`);
                const [userDetailsResponse, categoryDetailsResponse] = await Promise.all([
                    userService.getUserByID(post.userID),
                    blogCategoryService.getBlogCategoryByID(post.categoryID)
                ]);

                if(!userDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch user details for blog post: ${post._id}`);
                    throw userDetailsResponse;
                }

                if(!categoryDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch category details for blog post: ${post._id}`);
                    throw categoryDetailsResponse;
                }

                const userDetails = userDetailsResponse.resultData;
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

        devLogger.info(`[${FILE_NAME}] User filtered blog posts with user and category information prepared successfully`);
        devLogger.success(`[${FILE_NAME}] User blog post filter sort pagination completed successfully`);
        devLogger.info(`[${FILE_NAME}] Sending filtered user blog posts response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: "User blog post filter sort pagination completed successfully",
            errorMessage: "",
            errorData: null,
            resultData: {
                currentPage: blogPostResponseResult.currentPage,
                totalPages: blogPostResponseResult.totalPages,
                totalCount: blogPostResponseResult.totalCount,
                blogPostData: blogPostData
            }
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch filtered blog posts for particular user`, error);
        devLogger.warn(`[${FILE_NAME}] User filter sort pagination request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Get Blog Post Details With Filter Sort With Pagination For Particular User Code Ends
// ============================================================



// ============================================================
// Get Blog Post Details With Filter Sort With Pagination For Particular Category Code Starts
// ============================================================
async function getBlogPostDetailsWithFilterSortWithPaginationForParticularCategory(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get filtered and sorted blog posts for particular category request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting category name from request parameters`);
        const categoryName = req.params.categoryName;

        devLogger.info(`[${FILE_NAME}] Fetching category details by name`);
        const categoryDetailsResponse = await blogCategoryService.getBlogCategoryByName(categoryName);

        if(!categoryDetailsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch category details: ${categoryDetailsResponse?.errorMessage || "Failed to fetch category details"}`);
            throw categoryDetailsResponse;
        }

        const categoryDetails = categoryDetailsResponse.resultData;
        const categoryID = categoryDetails._id;

        devLogger.info(`[${FILE_NAME}] Category ID extracted successfully: ${categoryID}`);
        devLogger.info(`[${FILE_NAME}] Extracting filter, sort and pagination parameters`);

        const data = {
            sortSelection: req.body.sortSelection,
            allCheckedAuthor: req.body.allCheckedAuthor,
            checkedDate: req.body.checkedDate,
            page: req.query.page,
            limit: req.query.limit
        };

        devLogger.info(`[${FILE_NAME}] Filter, sort and pagination parameters extracted successfully`);
        devLogger.info(`[${FILE_NAME}] Fetching filtered and sorted blog posts for category`);

        const blogPostsResponse = await blogPostService.filterSortPaginationByCategory(categoryID, data);

        if(!blogPostsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to filter category blog posts: ${blogPostsResponse?.errorMessage || "Failed to filter category blog posts"}`);
            throw blogPostsResponse;
        }

        const blogPostResponseResult = blogPostsResponse.resultData || {};
        const blogPosts = blogPostResponseResult.blogPostData || [];

        devLogger.info(`[${FILE_NAME}] ${blogPosts.length} filtered category blog posts fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing category blog posts with user and category information`);

        const blogPostData = await Promise.all(
            blogPosts.map(async function(post) {
                devLogger.info(`[${FILE_NAME}] Fetching user and category details for blog post: ${post._id}`);
                const [userDetailsResponse, categoryDetailsResponse] = await Promise.all([
                    userService.getUserByID(post.userID),
                    blogCategoryService.getBlogCategoryByID(post.categoryID)
                ]);

                if(!userDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch user details for blog post: ${post._id}`);
                    throw userDetailsResponse;
                }

                if(!categoryDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch category details for blog post: ${post._id}`);
                    throw categoryDetailsResponse;
                }

                const userDetails = userDetailsResponse.resultData;
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

        devLogger.info(`[${FILE_NAME}] Category filtered blog posts with user and category information prepared successfully`);
        devLogger.success(`[${FILE_NAME}] Category blog post filter sort pagination completed successfully`);
        devLogger.info(`[${FILE_NAME}] Sending filtered category blog posts response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: "Category blog post filter sort pagination completed successfully",
            errorMessage: "",
            errorData: null,
            resultData: {
                currentPage: blogPostResponseResult.currentPage,
                totalPages: blogPostResponseResult.totalPages,
                totalCount: blogPostResponseResult.totalCount,
                blogPostData: blogPostData
            }
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch filtered blog posts for particular category`, error);
        devLogger.warn(`[${FILE_NAME}] Category filter sort pagination request could not be completed`);
        return handleError(res, error);
    }
}
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