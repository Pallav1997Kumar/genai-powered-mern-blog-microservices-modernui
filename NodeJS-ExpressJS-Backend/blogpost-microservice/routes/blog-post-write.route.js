const express = require("express");

const router = express.Router();

const {
    addNewBlogPost,
    deleteBlogPostByPostId,
    deleteBlogPostByUserId,
    updateBlogPostByPostId
} = require("../controllers/blog-post-write.controller.js");



// ============================================================
// Add new blog post - starts
// ============================================================
router.post(
    "/add",
    addNewBlogPost
);
// ============================================================
// Add new blog post - ends
// ============================================================



// ============================================================
// Delete blog post by post ID - starts
// ============================================================
router.delete(
    "/delete/postId/:postID",
    deleteBlogPostByPostId
);
// ============================================================
// Delete blog post by post ID - ends
// ============================================================



// ============================================================
// Delete blog post by user ID - starts
// ============================================================
router.delete(
    "/delete-by-user/userId/:userID",
    deleteBlogPostByUserId
);
// ============================================================
// Delete blog post by user ID - ends
// ============================================================



// ============================================================
// Update blog post by post ID - starts
// ============================================================
router.put(
    "/update/postId/:postID",
    updateBlogPostByPostId
);
// ============================================================
// Update blog post by post ID - ends
// ============================================================



// ============================================================
// Router Export - starts
// ============================================================
module.exports = router;
// ============================================================
// Router Export - ends
// ============================================================