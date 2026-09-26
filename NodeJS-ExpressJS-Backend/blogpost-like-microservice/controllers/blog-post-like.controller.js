const SuccessMessage = require("../constants/success-message.constant.js");
const blogPostLikeService = require("../services/blog-post-like.service.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "blog-post-like.controller.js";



// ============================================================
// Like Blog Post - starts
// ============================================================
async function blogPostLike(req,res){
    devLogger.info(`[${FILE_NAME}] Blog post like request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Extracting authentication token and post ID`);

        const token = req.headers.authorization?.split(" ")[1] || req.body.token;
        const postID = req.params.postID;

        devLogger.info(`[${FILE_NAME}] Calling blog post like service to like post`);
        const result = await blogPostLikeService.blogPostLike(token, postID);

        devLogger.success(`[${FILE_NAME}] Blog post liked successfully`);
        devLogger.info(`[${FILE_NAME}] Sending like post response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage: SuccessMessage.POST_LIKED,
            errorMessage:null,
            resultData:null
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to like blog post`, error);
        devLogger.warn(`[${FILE_NAME}] Blog post like request could not be completed`);

        return res.status(error.status || 500).json({
            success:false,
            error:true,
            successMessage:null,
            errorMessage:error.message,
            resultData:null
        });
    }
};
// ============================================================
// Like Blog Post - ends
// ============================================================



// ============================================================
// Unlike Blog Post - starts
// ============================================================
async function blogPostUnlike(req,res){
    devLogger.info(`[${FILE_NAME}] Blog post unlike request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Extracting authentication token and post ID`);

        const token = req.headers.authorization?.split(" ")[1] || req.body.token;
        const postID = req.params.postID;

        devLogger.info(`[${FILE_NAME}] Calling blog post like service to unlike post`);
        const result = await blogPostLikeService.blogPostUnlike(token, postID);

        devLogger.success(`[${FILE_NAME}] Blog post unliked successfully`);
        devLogger.info(`[${FILE_NAME}] Sending unlike post response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.POST_UNLIKED,
            errorMessage:null,
            resultData:null
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to unlike blog post`, error);
        devLogger.warn(`[${FILE_NAME}] Blog post unlike request could not be completed`);

        return res.status(error.status || 500).json({
            success:false,
            error:true,
            successMessage:null,
            errorMessage:error.message,
            resultData:null
        });
    }
};
// ============================================================
// Unlike Blog Post - ends
// ============================================================



// ============================================================
// Get All Likes For Particular Blog - starts
// ============================================================
async function getAllLikesForParticularBlog(req,res){
    devLogger.info(`[${FILE_NAME}] Get all likes for particular blog request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        devLogger.info(`[${FILE_NAME}] Calling blog post like service to fetch likes`);
        const result = await blogPostLikeService.getAllLikesForParticularBlog(postID);

        devLogger.success(`[${FILE_NAME}] All blog post likes fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending likes response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BLOG_POST_LIKES_FETCHED,
            errorMessage:null,
            resultData:result
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to fetch likes for particular blog`, error);
        devLogger.warn(`[${FILE_NAME}] Get likes request could not be completed`);

        return res.status(error.status || 500).json({
            success:false,
            error:true,
            successMessage:null,
            errorMessage:error.message,
            resultData:null
        });
    }
};
// ============================================================
// Get All Likes For Particular Blog - ends
// ============================================================



// ============================================================
// Delete All Likes By User ID - starts
// ============================================================
async function deleteAllLikesByUserId(req,res){
    devLogger.info(`[${FILE_NAME}] Delete all likes by user ID request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        const userID = req.params.userID;

        devLogger.info(`[${FILE_NAME}] Calling blog post like service to delete user likes`);
        const result = await blogPostLikeService.deleteAllLikesByUserId(userID);

        devLogger.success(`[${FILE_NAME}] All likes by user deleted successfully`);
        devLogger.info(`[${FILE_NAME}] Sending delete user likes response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.USER_LIKES_DELETED,
            errorMessage:null,
            resultData:null
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to delete all likes by user`, error);
        devLogger.warn(`[${FILE_NAME}] Delete user likes request could not be completed`);

        return res.status(error.status || 500).json({
            success:false,
            error:true,
            successMessage:null,
            errorMessage:error.message,
            resultData:null
        });
    }
};
// ============================================================
// Delete All Likes By User ID - ends
// ============================================================



// ============================================================
// Delete All Likes By Post ID - starts
// ============================================================
async function deleteAllLikesByPostId(req,res){
    devLogger.info(`[${FILE_NAME}] Delete all likes by post ID request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        devLogger.info(`[${FILE_NAME}] Calling blog post like service to delete post likes`);
        const result = await blogPostLikeService.deleteAllLikesByPostId(postID);

        devLogger.success(`[${FILE_NAME}] All likes by post deleted successfully`);
        devLogger.info(`[${FILE_NAME}] Sending delete post likes response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.POST_LIKES_DELETED,
            errorMessage:null,
            resultData:null
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to delete all likes by post`, error);
        devLogger.warn(`[${FILE_NAME}] Delete all likes by post request could not be completed`);

        return res.status(error.status || 500).json({
            success:false,
            error:true,
            successMessage:null,
            errorMessage:error.message,
            resultData:null
        });
    }
};
// ============================================================
// Delete All Likes By Post ID - ends
// ============================================================




// ============================================================
// Controller Exports - starts
// ============================================================
module.exports = {
    blogPostLike,
    blogPostUnlike,
    getAllLikesForParticularBlog,
    deleteAllLikesByUserId,
    deleteAllLikesByPostId
};
// ============================================================
// Controller Exports - ends
// ============================================================