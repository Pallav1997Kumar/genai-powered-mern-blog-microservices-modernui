const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const blogPostRepository = require("../repositories/blog-post.repository.js");
const logger = require("../utils/logger.js");

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
// Verify Token - starts
// ============================================================
function verifyToken(token) {
    if (process.env.environment === "development") {
        logger.info(`[${FILE_NAME}] Token verification request started`);
    }

    return new Promise(function(resolve, reject) {
        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Verifying JWT token`);
        }

        jwt.verify(token, jwtPrivateKey, function(error, decoded) {
            if (error) {
                if (process.env.environment === "development") {
                    logger.error(`[${FILE_NAME}] JWT token verification failed`, error);
                    logger.warn(`[${FILE_NAME}] Invalid authentication token received`);
                }

                return reject(new Error("Invalid Token"));
            }

            if (process.env.environment === "development") {
                logger.success(`[${FILE_NAME}] JWT token verified successfully`);
            }

            resolve(decoded);
        });
    });
}
// ============================================================
// Verify Token - ends
// ============================================================



// ============================================================
// Add New Blog Post - starts
// ============================================================
async function addNewBlogPost(token, data) {
    if (process.env.environment === "development") {
        logger.info(`[${FILE_NAME}] Add new blog post request started`);
    }

    try {
        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Extracting blog post title`);
        }
        const title = data.title;

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Extracting blog post description`);
        }
        const postDescription = data.postDescription;

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Extracting blog post category`);
        }
        const category = data.category;

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Extracting blog post image details`);
        }
        const imageDetail = data.imageDetail;

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Validating blog post image`);
        }

        if (!imageDetail) {
            if (process.env.environment === "development") {
                logger.warn(`[${FILE_NAME}] Blog post image is missing`);
            }

            throw new Error("Please upload the image");
        }

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Validating authentication token`);
        }

        if (!token) {
            if (process.env.environment === "development") {
                logger.warn(`[${FILE_NAME}] Authentication token is missing`);
            }

            throw new Error("Not Authenticated");
        }

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Verifying authentication token`);
        }

        const user = await verifyToken(token);

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Creating new blog post through repository`);
        }

        const result = await blogPostRepository.createBlogPost({
            postTitle: title,
            postDescription: postDescription,
            categoryID: category,
            userID: user.id,
            postImage: imageDetail.file.path,
            postDateTime: new Date(),
            postStatus: "posted"
        });

        if (process.env.environment === "development") {
            logger.success(`[${FILE_NAME}] New blog post created successfully`);
        }

        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to add new blog post`, error);
        throw error;
    }
}
// ============================================================
// Add New Blog Post - ends
// ============================================================



// ============================================================
// Delete Blog Post By Post ID - starts
// ============================================================
async function deleteBlogPostByPostId(token, postID) {
    if (process.env.environment === "development") {
        logger.info(`[${FILE_NAME}] Delete blog post by post ID request started`);
    }

    try {
        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Validating authentication token`);
        }

        if (!token) {
            if (process.env.environment === "development") {
                logger.warn(`[${FILE_NAME}] Authentication token is missing`);
            }

            throw new Error("Not Authenticated");
        }

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Verifying authentication token`);
        }

        await verifyToken(token);

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Calling blog post repository to delete blog post`);
        }

        const post = await blogPostRepository.deleteBlogPostById(postID);

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Blog post delete repository response received`);
        }

        if (!post) {
            if (process.env.environment === "development") {
                logger.warn(`[${FILE_NAME}] Blog post not found for deletion`);
            }

            throw new Error("Post not found");
        }

        if (process.env.environment === "development") {
            logger.success(`[${FILE_NAME}] Blog post deleted successfully`);
        }

        return true;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to delete blog post by post ID`, error);
        throw error;
    }
}
// ============================================================
// Delete Blog Post By Post ID - ends
// ============================================================



// ============================================================
// Update Blog Post By Post ID - starts
// ============================================================
async function updateBlogPostByPostId(token, postID, data) {
    if (process.env.environment === "development") {
        logger.info(`[${FILE_NAME}] Update blog post by post ID request started`);
    }

    try {
        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Extracting blog post title`);
        }
        const title = data.title;

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Extracting blog post description`);
        }
        const postDescription = data.postDescription;

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Extracting blog post category`);
        }
        const category = data.category;

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Extracting blog post image details`);
        }
        const imageDetail = data.imageDetail;

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Validating authentication token`);
        }

        if (!token) {
            if (process.env.environment === "development") {
                logger.warn(`[${FILE_NAME}] Authentication token is missing`);
            }

            throw new Error("Not Authenticated");
        }

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Verifying authentication token`);
        }

        await verifyToken(token);

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Preparing blog post update data`);
        }

        const updateData = {
            postTitle: title,
            postDescription: postDescription,
            categoryID: category
        };

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Checking for updated blog post image`);
        }

        if (imageDetail) {
            updateData.postImage = imageDetail.file.path;
        }

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Calling blog post repository to update blog post`);
        }

        const updatedPost =
            await blogPostRepository.updateBlogPostById(
                postID,
                updateData
            );

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Blog post update repository response received`);
        }

        if (!updatedPost) {
            if (process.env.environment === "development") {
                logger.warn(`[${FILE_NAME}] Blog post not found for update`);
            }

            throw new Error("Post not found");
        }

        if (process.env.environment === "development") {
            logger.success(`[${FILE_NAME}] Blog post updated successfully`);
        }

        return updatedPost;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to update blog post by post ID`, error);
        throw error;
    }
}
// ============================================================
// Update Blog Post By Post ID - ends
// ============================================================



// ============================================================
// Delete Blog Posts By User ID - starts
// ============================================================
async function deleteBlogPostByUserId(token, userID) {
    if (process.env.environment === "development") {
        logger.info(`[${FILE_NAME}] Delete blog posts by user ID request started`);
    }

    try {
        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Validating authentication token`);
        }

        if (!token) {
            if (process.env.environment === "development") {
                logger.warn(`[${FILE_NAME}] Authentication token is missing`);
            }

            throw new Error("Not Authenticated");
        }

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Verifying authentication token`);
        }

        await verifyToken(token);

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] Calling blog post repository to delete user blog posts`);
        }

        const result =
            await blogPostRepository.deleteBlogPostByUserId(userID);

        if (process.env.environment === "development") {
            logger.info(`[${FILE_NAME}] User blog posts delete repository response received`);
            logger.success(`[${FILE_NAME}] User blog posts deleted successfully`);
        }

        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to delete blog posts by user ID`, error);
        throw error;
    }
}
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