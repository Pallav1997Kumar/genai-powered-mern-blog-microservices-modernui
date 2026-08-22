const express = require("express");

const router = express.Router();

const {
    addNewBlogComment,
    updateParticularComment,
    deleteParticularComment,
    getAllCommentsForParticularBlog,
    deleteAllCommentsByUserId,
    deleteAllCommentsByPostId
} = require("../controllers/blog-comment.controller.js");



// ============================================================
// Add new blog comment - starts
// ============================================================
router.post(
    "/post/:postID",
    addNewBlogComment
);
// ============================================================
// Add new blog comment - ends
// ============================================================



// ============================================================
// Update particular comment - starts
// ============================================================
router.put(
    "/comment/:commentID",
    updateParticularComment
);
// ============================================================
// Update particular comment - ends
// ============================================================



// ============================================================
// Delete particular comment - starts
// ============================================================
router.delete(
    "/comment/:commentID",
    deleteParticularComment
);
// ============================================================
// Delete particular comment - ends
// ============================================================



// ============================================================
// Get all comments for particular blog - starts
// ============================================================
router.get(
    "/post/:postID",
    getAllCommentsForParticularBlog
);
// ============================================================
// Get all comments for particular blog - ends
// ============================================================



// ============================================================
// Delete all comments by user ID - starts
// ============================================================
router.delete(
    "/user/:userID",
    deleteAllCommentsByUserId
);
// ============================================================
// Delete all comments by user ID - ends
// ============================================================



// ============================================================
// Delete all comments by post ID - starts
// ============================================================
router.delete(
    "/post/:postID",
    deleteAllCommentsByPostId
);
// ============================================================
// Delete all comments by post ID - ends
// ============================================================



// ============================================================
// Router Export - starts
// ============================================================
module.exports = router;
// ============================================================
// Router Export - ends
// ============================================================