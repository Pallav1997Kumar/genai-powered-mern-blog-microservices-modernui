const express = require("express");

const router = express.Router();

const {
    getAllBlogPosts,
    getFourBlogPost,
    getParticularBlogPost,
    searchBlogPostByTitle,
    getBlogPostWithPagination
} = require("../controllers/blog-post-read.controller.js");



// ============================================================
// Get all blog posts - starts
// ============================================================
router.get(
    "/all-blog-post",
    getAllBlogPosts
);
// ============================================================
// Get all blog posts - ends
// ============================================================



// ============================================================
// Get four blog posts - starts
// ============================================================
router.get(
    "/four-blog-post",
    getFourBlogPost
);
// ============================================================
// Get four blog posts - ends
// ============================================================



// ============================================================
// Get particular blog post - starts
// ============================================================
router.get(
    "/post/:postID",
    getParticularBlogPost
);
// ============================================================
// Get particular blog post - ends
// ============================================================



// ============================================================
// Get blog posts with pagination - starts
// ============================================================
router.get(
    "/pagination",
    getBlogPostWithPagination
);
// ============================================================
// Get blog posts with pagination - ends
// ============================================================



// ============================================================
// Search blog post by title - starts
// ============================================================
router.get(
    "/search-by-title",
    searchBlogPostByTitle
);
// ============================================================
// Search blog post by title - ends
// ============================================================



// ============================================================
// Router Export - starts
// ============================================================
module.exports = router;
// ============================================================
// Router Export - ends
// ============================================================