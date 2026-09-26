const genAiService = require("../services/blog-genai.service.js");

const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "generativeAI.controller.js";



// ============================================================
// Generate Blog Summary - starts
// ============================================================
async function getBlogDescriptionSummary(req, res) {
    devLogger.info(`[${FILE_NAME}] Generate blog summary request received`);
    const blogText = req.body.blogText;

    if (!blogText) {
        devLogger.warn(`[${FILE_NAME}] Blog description is missing`);
        return res.status(400).json({
            errorMessage: "Blog description is required"
        });
    }

    try {
        devLogger.info(`[${FILE_NAME}] Calling blog AI service to generate summary`);
        const result = await genAiService.generateBlogSummary(blogText);
        devLogger.success(`[${FILE_NAME}] Blog summary generated successfully`);

        return res.status(200).json(result);
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to generate blog summary`, error);
        devLogger.warn(`[${FILE_NAME}] Generate blog summary request could not be completed`);
        return res.status(error.status || 500).json({
            errorMessage: error.message || "Internal Server Error"
        });
    }
}
// ============================================================
// Generate Blog Summary - ends
// ============================================================



// ============================================================
// Generate Blog TLDR - starts
// ============================================================
async function getBlogDescriptionTLDR(req, res) {
    devLogger.info(`[${FILE_NAME}] Generate blog TLDR request received`);
    const blogText = req.body.blogText;

    if (!blogText) {
        devLogger.warn(`[${FILE_NAME}] Blog description is missing`);
        return res.status(400).json({
            errorMessage: "Blog description is required"
        });
    }

    try {
        devLogger.info(`[${FILE_NAME}] Calling blog AI service to generate TLDR`);
        const result = await genAiService.generateBlogTLDR(blogText);
        devLogger.success(`[${FILE_NAME}] Blog TLDR generated successfully`);

        return res.status(200).json(result);
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to generate blog TLDR`, error);
        devLogger.warn(`[${FILE_NAME}] Generate blog TLDR request could not be completed`);
        return res.status(error.status || 500).json({
            errorMessage: error.message || "Internal Server Error"
        });
    }
}
// ============================================================
// Generate Blog TLDR - ends
// ============================================================



// ============================================================
// Generate Blog Key Takeaways - starts
// ============================================================
async function getBlogDescriptionKeyTakeaways(req, res) {
    devLogger.info(`[${FILE_NAME}] Generate blog key takeaways request received`);
    const blogText = req.body.blogText;

    if (!blogText) {
        devLogger.warn(`[${FILE_NAME}] Blog description is missing`);
        return res.status(400).json({
            errorMessage: "Blog description is required"
        });
    }

    try {
        devLogger.info(`[${FILE_NAME}] Calling blog AI service to generate key takeaways`);
        const result = await genAiService.generateBlogKeyTakeaways(blogText);
        devLogger.success(`[${FILE_NAME}] Blog key takeaways generated successfully`);

        return res.status(200).json(result);
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to generate blog key takeaways`, error);
        devLogger.warn(`[${FILE_NAME}] Generate blog key takeaways request could not be completed`);
        return res.status(error.status || 500).json({
            errorMessage: error.message || "Internal Server Error"
        });
    }
}
// ============================================================
// Generate Blog Key Takeaways - ends
// ============================================================



// ============================================================
// Generate Blog Conclusion - starts
// ============================================================
async function getBlogDescriptionConclusion(req, res) {
    devLogger.info(`[${FILE_NAME}] Generate blog conclusion request received`);
    const blogText = req.body.blogText;

    if (!blogText) {
        devLogger.warn(`[${FILE_NAME}] Blog description is missing`);
        return res.status(400).json({
            errorMessage: "Blog description is required"
        });
    }

    try {
        devLogger.info(`[${FILE_NAME}] Calling blog AI service to generate conclusion`);
        const result = await genAiService.generateBlogConclusion(blogText);
        devLogger.success(`[${FILE_NAME}] Blog conclusion generated successfully`);

        return res.status(200).json(result);
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to generate blog conclusion`, error);
        devLogger.warn(`[${FILE_NAME}] Generate blog conclusion request could not be completed`);
        return res.status(error.status || 500).json({
            errorMessage: error.message || "Internal Server Error"
        });
    }
}
// ============================================================
// Generate Blog Conclusion - ends
// ============================================================



// ============================================================
// Generate Blog FAQ - starts
// ============================================================
async function getBlogDescriptionFAQ(req, res) {
    devLogger.info(`[${FILE_NAME}] Generate blog FAQ request received`);
    const blogText = req.body.blogText;

    if (!blogText) {
        devLogger.warn(`[${FILE_NAME}] Blog description is missing`);
        return res.status(400).json({
            errorMessage: "Blog description is required"
        });
    }

    try {
        devLogger.info(`[${FILE_NAME}] Calling blog AI service to generate FAQ`);
        const result = await genAiService.generateBlogFAQ(blogText);
        devLogger.success(`[${FILE_NAME}] Blog FAQ generated successfully`);

        return res.status(200).json(result);
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to generate blog FAQ`, error);
        devLogger.warn(`[${FILE_NAME}] Generate blog FAQ request could not be completed`);
        return res.status(error.status || 500).json({
            errorMessage: error.message || "Internal Server Error"
        });
    }
}
// ============================================================
// Generate Blog FAQ - ends
// ============================================================



// ============================================================
// Generate Blog Highlights - starts
// ============================================================
async function getBlogDescriptionHighlights(req, res) {
    devLogger.info(`[${FILE_NAME}] Generate blog highlights request received`);
    const blogText = req.body.blogText;

    if (!blogText) {
        devLogger.warn(`[${FILE_NAME}] Blog description is missing`);
        return res.status(400).json({
            errorMessage: "Blog description is required"
        });
    }

    try {
        devLogger.info(`[${FILE_NAME}] Calling blog AI service to generate highlights`);
        const result = await genAiService.generateBlogHighlights(blogText);
        devLogger.success(`[${FILE_NAME}] Blog highlights generated successfully`);

        return res.status(200).json(result);
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to generate blog highlights`, error);
        devLogger.warn(`[${FILE_NAME}] Generate blog highlights request could not be completed`);
        return res.status(error.status || 500).json({
            errorMessage: error.message || "Internal Server Error"
        });
    }
}
// ============================================================
// Generate Blog Highlights - ends
// ============================================================



// ============================================================
// Suggest Blog Titles - starts
// ============================================================
async function suggestBlogTitlesFromBlogDescription(req, res) {
    devLogger.info(`[${FILE_NAME}] Suggest blog titles request received`);
    const blogText = req.body.blogText;

    if (!blogText) {
        devLogger.warn(`[${FILE_NAME}] Blog description is missing`);
        return res.status(400).json({
            errorMessage: "Blog description is required"
        });
    }

    try {
        devLogger.info(`[${FILE_NAME}] Calling blog AI service to suggest titles`);
        const result = await genAiService.suggestBlogTitles(blogText);
        devLogger.success(`[${FILE_NAME}] Blog title suggestions generated successfully`);

        return res.status(200).json(result);
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to suggest blog titles`, error);
        devLogger.warn(`[${FILE_NAME}] Suggest blog titles request could not be completed`);
        return res.status(error.status || 500).json({
            errorMessage: error.message || "Internal Server Error"
        });
    }
}
// ============================================================
// Suggest Blog Titles - ends
// ============================================================



// ============================================================
// Generate Blog Description - starts
// ============================================================
async function suggestBlogDescriptionsFromBlogTitle(req, res) {
    devLogger.info(`[${FILE_NAME}] Generate blog description request received`);
    const blogTitle = req.body.blogTitle;

    if (!blogTitle) {
        devLogger.warn(`[${FILE_NAME}] Blog title is missing`);
        return res.status(400).json({
            errorMessage: "Blog title is required"
        });
    }

    try {
        devLogger.info(`[${FILE_NAME}] Calling blog AI service to generate description`);
        const result = await genAiService.generateBlogDescription(blogTitle);
        devLogger.success(`[${FILE_NAME}] Blog description generated successfully`);

        return res.status(200).json(result);
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to generate blog description`, error);
        devLogger.warn(`[${FILE_NAME}] Generate blog description request could not be completed`);
        return res.status(error.status || 500).json({
            errorMessage: error.message || "Internal Server Error"
        });
    }
}
// ============================================================
// Generate Blog Description - ends
// ============================================================



// ============================================================
// Enhance Blog Description - starts
// ============================================================
async function enhanceBlogDescription(req, res) {
    devLogger.info(`[${FILE_NAME}] Enhance blog description request received`);
    const blogText = req.body.blogText;

    if (!blogText) {
        devLogger.warn(`[${FILE_NAME}] Blog description is missing`);
        return res.status(400).json({
            errorMessage: "Blog description is required"
        });
    }

    try {
        devLogger.info(`[${FILE_NAME}] Calling blog AI service to enhance description`);
        const result = await genAiService.enhanceBlogDescription(blogText);
        devLogger.success(`[${FILE_NAME}] Blog description enhanced successfully`);

        return res.status(200).json(result);
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to enhance blog description`, error);
        devLogger.warn(`[${FILE_NAME}] Enhance blog description request could not be completed`);
        return res.status(error.status || 500).json({
            errorMessage: error.message || "Internal Server Error"
        });
    }
}
// ============================================================
// Enhance Blog Description - ends
// ============================================================



// ============================================================
// Controller Exports - starts
// ============================================================
module.exports = {
    getBlogDescriptionSummary,
    getBlogDescriptionTLDR,
    getBlogDescriptionKeyTakeaways,
    getBlogDescriptionConclusion,
    getBlogDescriptionFAQ,
    getBlogDescriptionHighlights,

    suggestBlogTitlesFromBlogDescription,
    suggestBlogDescriptionsFromBlogTitle,
    enhanceBlogDescription
};
// ============================================================
// Controller Exports - ends
// ============================================================
