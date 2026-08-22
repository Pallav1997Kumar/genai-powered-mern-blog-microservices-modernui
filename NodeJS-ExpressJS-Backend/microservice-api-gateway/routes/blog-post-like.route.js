const express = require("express");

const {
    blogPostLike,
    blogPostUnlike,
    getAllLikesForParticularBlog
} = require("../controllers/blog-post-like.controller.js");

const router = express.Router();



// ============================================================
// Blog post like - starts
// ============================================================
router.post(
    "/like/newLike/:postID",
    blogPostLike
);
// ============================================================
// Blog post like - ends
// ============================================================



// ============================================================
// Blog post unlike - starts
// ============================================================
router.delete(
    "/unlikePost/:postID",
    blogPostUnlike
);
// ============================================================
// Blog post unlike - ends
// ============================================================



// ============================================================
// Get all likes for particular blog - starts
// ============================================================
router.get(
    "/:postID",
    getAllLikesForParticularBlog
);
// ============================================================
// Get all likes for particular blog - ends
// ============================================================



// ============================================================
// Router Export - starts
// ============================================================
module.exports = router;
// ============================================================
// Router Export - ends
// ============================================================