const express = require("express");

const {
    getBlogDescriptionSummary,
    getBlogDescriptionTLDR,
    getBlogDescriptionKeyTakeaways,
    getBlogDescriptionConclusion,
    getBlogDescriptionFAQ,
    getBlogDescriptionHighlights,
    suggestBlogTitlesFromBlogDescription,
    suggestBlogDescriptionsFromBlogTitle,
    enhanceBlogDescription
} = require("../controllers/generativeAIController");


const router = express.Router();



// ============================================================
// Generate blog summary - starts
// ============================================================
router.post(
    "/generateBlogSummary",
    getBlogDescriptionSummary
);
// ============================================================
// Generate blog summary - ends
// ============================================================



// ============================================================
// Generate blog highlights - starts
// ============================================================
router.post(
    "/generateBlogHighlights",
    getBlogDescriptionHighlights
);
// ============================================================
// Generate blog highlights - ends
// ============================================================



// ============================================================
// Generate blog conclusion - starts
// ============================================================
router.post(
    "/generateBlogConclusion",
    getBlogDescriptionConclusion
);
// ============================================================
// Generate blog conclusion - ends
// ============================================================



// ============================================================
// Generate blog FAQ - starts
// ============================================================
router.post(
    "/generateBlogFAQ",
    getBlogDescriptionFAQ
);
// ============================================================
// Generate blog FAQ - ends
// ============================================================



// ============================================================
// Generate blog TLDR - starts
// ============================================================
router.post(
    "/generateBlogTldr",
    getBlogDescriptionTLDR
);
// ============================================================
// Generate blog TLDR - ends
// ============================================================



// ============================================================
// Generate blog key takeaways - starts
// ============================================================
router.post(
    "/generateBlogKeyTakeaways",
    getBlogDescriptionKeyTakeaways
);
// ============================================================
// Generate blog key takeaways - ends
// ============================================================



// ============================================================
// Suggest blog titles from description - starts
// ============================================================
router.post(
    "/suggestBlogTitlesFromBlogDescription",
    suggestBlogTitlesFromBlogDescription
);
// ============================================================
// Suggest blog titles from description - ends
// ============================================================



// ============================================================
// Suggest blog descriptions from title - starts
// ============================================================
router.post(
    "/suggestBlogDescriptionsFromTitle",
    suggestBlogDescriptionsFromBlogTitle
);
// ============================================================
// Suggest blog descriptions from title - ends
// ============================================================



// ============================================================
// Enhance blog description - starts
// ============================================================
router.post(
    "/enhanceBlogDescription",
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
