const express = require("express");

const {
    addNewBlogComment,
    updateParticularComment,
    deleteParticularComment,
    getAllCommentsForParticularBlog
} = require("../controllers/blog-post-comment.controller.js");

const router = express.Router();



// ============================================================
// Add new blog comment - starts
// ============================================================
router.post(
    "/newComment/:postID",
    addNewBlogComment
);
// ============================================================
// Add new blog comment - ends
// ============================================================



// ============================================================
// Update particular comment - starts
// ============================================================
router.put(
    "/updateComment/:commentID",
    updateParticularComment
);
// ============================================================
// Update particular comment - ends
// ============================================================



// ============================================================
// Delete particular comment - starts
// ============================================================
router.delete(
    "/deleteComment/:commentID",
    deleteParticularComment
);
// ============================================================
// Delete particular comment - ends
// ============================================================



// ============================================================
// Get all comments for particular blog - starts
// ============================================================
router.get(
    "/:postID",
    getAllCommentsForParticularBlog
);
// ============================================================
// Get all comments for particular blog - ends
// ============================================================



// ============================================================
// Router Export - starts
// ============================================================
module.exports = router;
// ============================================================
// Router Export - ends
// ============================================================