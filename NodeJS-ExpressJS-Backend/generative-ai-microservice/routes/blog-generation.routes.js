const express = require("express");

const {
    suggestBlogTitlesFromBlogDescription,
    suggestBlogDescriptionsFromBlogTitle,
    enhanceBlogDescription
} = require("../controllers/blog-generation.controller.js");


const router = express.Router();



// ============================================================
// Suggest blog titles - starts
// ============================================================
router.post(
    "/suggest-blog-titles",
    suggestBlogTitlesFromBlogDescription
);
// ============================================================
// Suggest blog titles - ends
// ============================================================



// ============================================================
// Generate blog description - starts
// ============================================================
router.post(
    "/generate-blog-description",
    suggestBlogDescriptionsFromBlogTitle
);
// ============================================================
// Generate blog description - ends
// ============================================================



// ============================================================
// Enhance blog description - starts
// ============================================================
router.post(
    "/enhance-blog-description",
    enhanceBlogDescription
);
// ============================================================
// Enhance blog description - ends
// ============================================================



// ============================================================
// Router Export - starts
// ============================================================
module.exports = router;
// ============================================================
// Router Export - ends
// ============================================================
