const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const ErrorMessage = require("../constants/error-message.constant.js");
const blogPostRepository = require("../repositories/blog-post.repository.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "blog-post-write.service.js";



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



const jwtPrivateKey = process.env.jwtPrivateKey;



// ============================================================
// Add New Blog Post - starts
// ============================================================
async function addNewBlogPost(token, data) {
    devLogger.info(`[${FILE_NAME}] Add new blog post service started`);

    try {
        if(!token){
            devLogger.warn(`[${FILE_NAME}] Add blog post request received without authentication token`);
            throw {
                status:401,
                message:ErrorMessage.NOT_AUTHENTICATED
            };
        }

        if(!data){
            devLogger.warn(`[${FILE_NAME}] Add blog post request received without blog post data`);
            throw {
                status:400,
                message:ErrorMessage.BLOG_POST_DATA_REQUIRED
            };
        }

        if(!data.title){
            devLogger.warn(`[${FILE_NAME}] Blog post title is missing`);
            throw {
                status:400,
                message:ErrorMessage.BLOG_POST_TITLE_REQUIRED
            };
        }

        if(!data.postDescription){
            devLogger.warn(`[${FILE_NAME}] Blog post description is missing`);
            throw {
                status:400,
                message:ErrorMessage.BLOG_POST_DESCRIPTION_REQUIRED
            };
        }

        if(!data.category){
            devLogger.warn(`[${FILE_NAME}] Blog post category is missing`);
            throw {
                status:400,
                message:ErrorMessage.BLOG_POST_CATEGORY_REQUIRED
            };
        }

        devLogger.info(`[${FILE_NAME}] Extracting blog post image details`);
        const imageDetail = data.imageDetail;

        if(!imageDetail){
            devLogger.warn(`[${FILE_NAME}] Blog post image is missing`);
            throw {
                status:406,
                message:ErrorMessage.BLOG_POST_IMAGE_REQUIRED
            };
        }

        devLogger.info(`[${FILE_NAME}] Verifying authentication token`);
        const userInformation = jwt.verify(token,jwtPrivateKey);
        devLogger.info(`[${FILE_NAME}] Authentication token verified successfully`);

        if(!userInformation.id){
            devLogger.warn(`[${FILE_NAME}] Authentication token does not contain user ID`);
            throw {
                status:401,
                message:ErrorMessage.INVALID_AUTHENTICATION_TOKEN
            };
        }

        devLogger.info(`[${FILE_NAME}] Creating new blog post through repository`);

        const result =
            await blogPostRepository.createBlogPost({
                postTitle:data.title,
                postDescription:data.postDescription,
                categoryID:data.category,
                userID:userInformation.id,
                postImage:imageDetail.file.path,
                postDateTime:new Date(),
                postStatus:"posted"
            });

        devLogger.success(`[${FILE_NAME}] New blog post added successfully`);

        return result;
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to add new blog post`, error);
        throw error;
    }
};
// ============================================================
// Add New Blog Post - ends
// ============================================================



// ============================================================
// Delete Blog Post By Post ID - starts
// ============================================================
async function deleteBlogPostByPostId(token, postID) {
    devLogger.info(`[${FILE_NAME}] Delete blog post by post ID service started`);
    try {
        if(!token){
            devLogger.warn(`[${FILE_NAME}] Delete blog post request received without authentication token`);
            throw {
                status:401,
                message:ErrorMessage.NOT_AUTHENTICATED
            };
        }

        if(!postID){
            devLogger.warn(`[${FILE_NAME}] Delete blog post request received without post ID`);
            throw {
                status:400,
                message:ErrorMessage.POST_ID_REQUIRED
            };
        }

        devLogger.info(`[${FILE_NAME}] Verifying authentication token`);
        const userInformation = jwt.verify(token,jwtPrivateKey);
        devLogger.info(`[${FILE_NAME}] Authentication token verified successfully`);

        if(!userInformation.id){
            devLogger.warn(`[${FILE_NAME}] Authentication token does not contain user ID`);
            throw {
                status:401,
                message:ErrorMessage.INVALID_AUTHENTICATION_TOKEN
            };
        }

        devLogger.info(`[${FILE_NAME}] Deleting blog post through repository`);
        const post = await blogPostRepository.deleteBlogPostById(postID);
        devLogger.info(`[${FILE_NAME}] Blog post delete repository response received`);

        if(!post){
            devLogger.warn(`[${FILE_NAME}] Blog post not found for deletion`);
            throw {
                status:404,
                message:ErrorMessage.POST_NOT_FOUND
            };
        }

        devLogger.success(`[${FILE_NAME}] Blog post deleted successfully`);

        return true;
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to delete blog post by post ID`, error);
        throw error;
    }
};
// ============================================================
// Delete Blog Post By Post ID - ends
// ============================================================



// ============================================================
// Update Blog Post By Post ID - starts
// ============================================================
async function updateBlogPostByPostId(token, postID, data) {
    devLogger.info(`[${FILE_NAME}] Update blog post by post ID service started`);

    try {
        if(!token){
            devLogger.warn(`[${FILE_NAME}] Update blog post request received without authentication token`);
            throw {
                status:401,
                message:ErrorMessage.NOT_AUTHENTICATED
            };
        }

        if(!postID){
            devLogger.warn(`[${FILE_NAME}] Update blog post request received without post ID`);
            throw {
                status:400,
                message:ErrorMessage.POST_ID_REQUIRED
            };
        }

        if(!data){
            devLogger.warn(`[${FILE_NAME}] Update blog post request received without blog post data`);
            throw {
                status:400,
                message:ErrorMessage.BLOG_POST_DATA_REQUIRED
            };
        }

        if(!data.title){
            devLogger.warn(`[${FILE_NAME}] Blog post title is missing during update`);
            throw {
                status:400,
                message:ErrorMessage.BLOG_POST_TITLE_REQUIRED
            };
        }

        if(!data.postDescription){
            devLogger.warn(`[${FILE_NAME}] Blog post description is missing during update`);
            throw {
                status:400,
                message:ErrorMessage.BLOG_POST_DESCRIPTION_REQUIRED
            };
        }

        if(!data.category){
            devLogger.warn(`[${FILE_NAME}] Blog post category is missing during update`);
            throw {
                status:400,
                message:ErrorMessage.BLOG_POST_CATEGORY_REQUIRED
            };
        }

        devLogger.info(`[${FILE_NAME}] Verifying authentication token`);
        const userInformation = jwt.verify(token,jwtPrivateKey);
        devLogger.info(`[${FILE_NAME}] Authentication token verified successfully`);

        if(!userInformation.id){
            devLogger.warn(`[${FILE_NAME}] Authentication token does not contain user ID`);
            throw {
                status:401,
                message:ErrorMessage.INVALID_AUTHENTICATION_TOKEN
            };
        }

        devLogger.info(`[${FILE_NAME}] Preparing blog post update data`);

        const updateData = {
            postTitle:data.title,
            postDescription:data.postDescription,
            categoryID:data.category
        };

        devLogger.info(`[${FILE_NAME}] Checking for updated blog post image`);
        if(data.imageDetail){
            updateData.postImage = data.imageDetail.file.path;
        }

        devLogger.info(`[${FILE_NAME}] Updating blog post through repository`);
        const updatedPost = await blogPostRepository.updateBlogPostById(postID, updateData);
        devLogger.info(`[${FILE_NAME}] Blog post update repository response received`);

        if(!updatedPost){
            devLogger.warn(`[${FILE_NAME}] Blog post not found for update`);
            throw {
                status:404,
                message:ErrorMessage.POST_NOT_FOUND
            };
        }

        devLogger.success(`[${FILE_NAME}] Blog post updated successfully`);

        return updatedPost;
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to update blog post by post ID`, error);
        throw error;
    }
};
// ============================================================
// Update Blog Post By Post ID - ends
// ============================================================



// ============================================================
// Delete Blog Posts By User ID - starts
// ============================================================
async function deleteBlogPostByUserId(token, userID) {
    devLogger.info(`[${FILE_NAME}] Delete blog posts by user ID service started`);

    try {
        if(!token){
            devLogger.warn(`[${FILE_NAME}] Delete user blog posts request received without authentication token`);
            throw {
                status:401,
                message:ErrorMessage.NOT_AUTHENTICATED
            };
        }

        if(!userID){
            devLogger.warn(`[${FILE_NAME}] Delete user blog posts request received without user ID`);
            throw {
                status:400,
                message:ErrorMessage.USER_ID_REQUIRED
            };
        }

        devLogger.info(`[${FILE_NAME}] Verifying authentication token`);
        const userInformation = jwt.verify(token,jwtPrivateKey);
        devLogger.info(`[${FILE_NAME}] Authentication token verified successfully`);

        if(!userInformation.id){
            devLogger.warn(`[${FILE_NAME}] Authentication token does not contain user ID`);
            throw {
                status:401,
                message:ErrorMessage.INVALID_AUTHENTICATION_TOKEN
            };
        }

        devLogger.info(`[${FILE_NAME}] Deleting user blog posts through repository`);
        const result = await blogPostRepository.deleteBlogPostByUserId(userID);
        devLogger.success(`[${FILE_NAME}] User blog posts deleted successfully`);

        return result;
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to delete blog posts by user ID`, error);
        throw error;
    }
};
// ============================================================
// Delete Blog Posts By User ID - ends
// ============================================================



// ============================================================
// Service Exports - starts
// ============================================================
module.exports = {
    addNewBlogPost,
    deleteBlogPostByPostId,
    updateBlogPostByPostId,
    deleteBlogPostByUserId
};
// ============================================================
// Service Exports - ends
// ============================================================
