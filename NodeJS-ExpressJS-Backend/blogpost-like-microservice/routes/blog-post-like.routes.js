const express = require("express");

const router = express.Router();

const {
    blogPostLike,
    blogPostUnlike,
    getAllLikesForParticularBlog,
    deleteAllLikesByUserId,
    deleteAllLikesByPostId
} = require("../controllers/blog-post-like.controller.js");



// ============================================================
// Blog post like - starts
// ============================================================
router.post(
    "/post/:postID",
    blogPostLike
);
// ============================================================
// Blog post like - ends
// ============================================================



// ============================================================
// Blog post unlike - starts
// ============================================================
router.delete(
    "/post/:postID",
    blogPostUnlike
);
// ============================================================
// Blog post unlike - ends
// ============================================================



// ============================================================
// Get all likes for particular blog - starts
// ============================================================
router.get(
    "/post/:postID",
    getAllLikesForParticularBlog
);
// ============================================================
// Get all likes for particular blog - ends
// ============================================================



// ============================================================
// Delete all likes by user ID - starts
// ============================================================
router.delete(
    "/user/:userID",
    deleteAllLikesByUserId
);
// ============================================================
// Delete all likes by user ID - ends
// ============================================================



// ============================================================
// Delete all likes by post ID - starts
// ============================================================
router.delete(
    "/post/:postID/all",
    deleteAllLikesByPostId
);
// ============================================================
// Delete all likes by post ID - ends
// ============================================================



// ============================================================
// Router Export - starts
// ============================================================
module.exports = router;
// ============================================================
// Router Export - ends
// ============================================================