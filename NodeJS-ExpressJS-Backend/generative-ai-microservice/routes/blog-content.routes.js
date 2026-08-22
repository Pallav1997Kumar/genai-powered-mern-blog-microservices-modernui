const express = require("express");

const {
    getBlogDescriptionSummary,
    generateBlogTLDR,
    generateBlogKeyTakeaways,
    generateBlogConclusion,
    generateBlogFAQ,
    generateBlogHighlights
} = require("../controllers/blog-content.controller.js");


const router = express.Router();



// ============================================================
// Generate blog summary - starts
// ============================================================
router.post(
    "/generate-blog-summary",
    getBlogDescriptionSummary
);
// ============================================================
// Generate blog summary - ends
// ============================================================



// ============================================================
// Generate blog TLDR - starts
// ============================================================
router.post(
    "/generate-blog-tldr",
    generateBlogTLDR
);
// ============================================================
// Generate blog TLDR - ends
// ============================================================



// ============================================================
// Generate blog key takeaways - starts
// ============================================================
router.post(
    "/generate-blog-key-takeaways",
    generateBlogKeyTakeaways
);
// ============================================================
// Generate blog key takeaways - ends
// ============================================================



// ============================================================
// Generate blog conclusion - starts
// ============================================================
router.post(
    "/generate-blog-conclusion",
    generateBlogConclusion
);
// ============================================================
// Generate blog conclusion - ends
// ============================================================



// ============================================================
// Generate blog FAQ - starts
// ============================================================
router.post(
    "/generate-blog-faq",
    generateBlogFAQ
);
// ============================================================
// Generate blog FAQ - ends
// ============================================================



// ============================================================
// Generate blog highlights - starts
// ============================================================
router.post(
    "/generate-blog-highlights",
    generateBlogHighlights
);
// ============================================================
// Generate blog highlights - ends
// ============================================================



// ============================================================
// Router Export - starts
// ============================================================
module.exports = router;
// ============================================================
// Router Export - ends
// ============================================================
