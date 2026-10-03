const httpClient = require("../utils/http-client.js");
const devLogger = require("../utils/dev-logger.js");

const { BLOG_LIKE_SERVICE } = require("../config/services.js");
const createServiceError = require("../utils/service-error.js");
const { BlogPostLikeServiceErrorMessage } = require("../constants/error-message.constant.js");


const FILE_NAME = "blog-post-like.service.js";



// ============================================================
// Like Blog Post Code Starts
// ============================================================
async function blogPostLike(postID, token){
    devLogger.info(`[${FILE_NAME}] Like blog post request started`);
    try{
        devLogger.info(`[${FILE_NAME}] Calling blog like service to like blog post`);
        const response = await httpClient.post(
            `${BLOG_LIKE_SERVICE}/api/blog-like/post/${postID}`,
            {},
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        devLogger.info(`[${FILE_NAME}] Blog like service returned like response successfully`);
        devLogger.success(`[${FILE_NAME}] Blog post liked successfully`);

        devLogger.info(`[${FILE_NAME}] Returning like blog post response`);
        return response.data;
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to like blog post`, error);
        devLogger.warn(`[${FILE_NAME}] Like blog post request could not be completed`);
        throw createServiceError(BlogPostLikeServiceErrorMessage.LIKE_BLOG_POST_FAILED, error);
    }
};
// ============================================================
// Like Blog Post Code Ends
// ============================================================



// ============================================================
// Unlike Blog Post Code Starts
// ============================================================
async function blogPostUnlike(postID, token){
    devLogger.warn(`[${FILE_NAME}] Unlike blog post request started`);
    try{
        devLogger.info(`[${FILE_NAME}] Calling blog like service to unlike blog post`);
        const response = await httpClient.delete(
            `${BLOG_LIKE_SERVICE}/api/blog-like/post/${postID}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        devLogger.info(`[${FILE_NAME}] Blog like service returned unlike response successfully`);
        devLogger.success(`[${FILE_NAME}] Blog post unliked successfully`);

        devLogger.info(`[${FILE_NAME}] Returning unlike blog post response`);
        return response.data;
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to unlike blog post`, error);
        devLogger.warn(`[${FILE_NAME}] Unlike blog post request could not be completed`);
        throw createServiceError(BlogPostLikeServiceErrorMessage.UNLIKE_BLOG_POST_FAILED, error);
    }
};
// ============================================================
// Unlike Blog Post Code Ends
// ============================================================



// ============================================================
// Get All Likes For Blog Post Code Starts
// ============================================================
async function getAllLikesForParticularBlog(postID){
    devLogger.info(`[${FILE_NAME}] Get all likes for blog post request started`);
    try{
        devLogger.info(`[${FILE_NAME}] Calling blog like service to fetch blog post likes`);
        const response = await httpClient.get(
            `${BLOG_LIKE_SERVICE}/api/blog-like/post/${postID}`
        );

        devLogger.info(`[${FILE_NAME}] Blog like service returned blog post likes successfully`);
        devLogger.success(`[${FILE_NAME}] Blog post likes fetched successfully`);

        devLogger.info(`[${FILE_NAME}] Returning blog post likes response`);
        return response.data;
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog post likes`, error);
        devLogger.warn(`[${FILE_NAME}] Get blog post likes request could not be completed`);
        throw createServiceError(BlogPostLikeServiceErrorMessage.FETCH_BLOG_POST_LIKES_FAILED, error);
    }
};
// ============================================================
// Get All Likes For Blog Post Code Ends
// ============================================================



// ============================================================
// Delete All Likes By User ID Code Starts
// ============================================================
async function deleteLikesByUserId(userID, token){
    devLogger.warn(`[${FILE_NAME}] Delete all likes by user ID request started`);
    try{
        devLogger.info(`[${FILE_NAME}] Calling blog like service to delete user likes`);
        const response = await httpClient.delete(
            `${BLOG_LIKE_SERVICE}/api/blog-like/user/${userID}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        devLogger.info(`[${FILE_NAME}] Blog like service returned delete user likes response successfully`);
        devLogger.success(`[${FILE_NAME}] User likes deleted successfully`);

        devLogger.info(`[${FILE_NAME}] Returning delete user likes response`);
        return response.data;
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to delete user likes`, error);
        devLogger.warn(`[${FILE_NAME}] Delete user likes request could not be completed`);
        throw createServiceError(BlogPostLikeServiceErrorMessage.DELETE_USER_LIKES_FAILED, error);
    }
};
// ============================================================
// Delete All Likes By User ID Code Ends
// ============================================================



// ============================================================
// Delete All Likes For Blog Post Code Starts
// ============================================================
async function deleteAllLikesForPost(postID, token){
    devLogger.warn(`[${FILE_NAME}] Delete all likes for blog post request started`);
    try{
        devLogger.info(`[${FILE_NAME}] Calling blog like service to delete all post likes`);
        const response = await httpClient.delete(
            `${BLOG_LIKE_SERVICE}/api/blog-like/post/${postID}/all`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        devLogger.info(`[${FILE_NAME}] Blog like service returned delete all post likes response successfully`);
        devLogger.success(`[${FILE_NAME}] All blog post likes deleted successfully`);

        devLogger.info(`[${FILE_NAME}] Returning delete all post likes response`);
        return response.data;
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to delete all likes for post`, error);
        devLogger.warn(`[${FILE_NAME}] Delete all post likes request could not be completed`);
        throw createServiceError(BlogPostLikeServiceErrorMessage.DELETE_ALL_LIKES_FOR_POST_FAILED, error);
    }
};
// ============================================================
// Delete All Likes For Blog Post Code Ends
// ============================================================



// ============================================================
// Service Exports
// ============================================================
module.exports = {
    blogPostLike,
    blogPostUnlike,
    getAllLikesForParticularBlog,
    deleteLikesByUserId,
    deleteAllLikesForPost
};
// ============================================================
// Service Exports Ends
// ============================================================