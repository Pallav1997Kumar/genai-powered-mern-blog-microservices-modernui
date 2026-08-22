const {
    generateGeminiContent
} = require("../services/gemini.service.js");

const {
    blogTitleSuggestionPrompt,
    blogDescriptionGenerationPrompt,
    blogDescriptionEnhancementPrompt
} = require("../utils/gemini-prompts/index.js");;

const logger = require("../utils/loggers/logger.js");

const FILE_NAME = "blog-generation.controller.js";



// ============================================================
// Suggest blog titles from blog description - starts
// ============================================================
async function suggestBlogTitlesFromBlogDescription(req, res) {
    logger.info(`[${FILE_NAME}] Blog title suggestion request received`);

    const blogText = req.body.blogText;

    if (!blogText) {
        logger.warn(`[${FILE_NAME}] Blog description is missing for title suggestion`);

        return res.status(400).json({
            errorMessage: "Blog description is required"
        });
    }

    const genConfig = {
        temperature: 0.4,
        maxOutputTokens: 250
    };

    try {
        logger.info(`[${FILE_NAME}] Calling Gemini service for blog title suggestions`);

        const generatedText =
            await generateGeminiContent(
                blogTitleSuggestionPrompt(blogText),
                genConfig
            );

        const geminiGeneratedBlogTitles =
            JSON.parse(generatedText);

        logger.success(`[${FILE_NAME}] Blog title suggestions generated successfully`);

        return res.status(200).json({
            geminiGeneratedBlogTitles: geminiGeneratedBlogTitles
        });
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to generate blog title suggestions`, error);
        logger.warn(`[${FILE_NAME}] Blog title suggestion request could not be completed`);

        return res.status(500).json({
            errorMessage: "Internal Server Error"
        });
    }
}
// ============================================================
// Suggest blog titles from blog description - ends
// ============================================================



// ============================================================
// Suggest blog description from blog title - starts
// ============================================================
async function suggestBlogDescriptionsFromBlogTitle(req, res) {
    logger.info(`[${FILE_NAME}] Blog description generation request received`);

    const blogTitle = req.body.blogTitle;

    if (!blogTitle) {
        logger.warn(`[${FILE_NAME}] Blog title is missing for description generation`);

        return res.status(400).json({
            errorMessage: "Blog title is required"
        });
    }

    const genConfig = {
        temperature: 0.7,
        maxOutputTokens: 15000
    };

    try {
        logger.info(`[${FILE_NAME}] Calling Gemini service for blog description generation`);

        const generatedText =
            await generateGeminiContent(
                blogDescriptionGenerationPrompt(blogTitle),
                genConfig
            );

        const geminiGeneratedBlogDescription = generatedText;

        logger.success(`[${FILE_NAME}] Blog description generated successfully`);

        return res.status(200).json({
            geminiGeneratedBlogDescription: geminiGeneratedBlogDescription
        });
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to generate blog description`, error);
        logger.warn(`[${FILE_NAME}] Blog description generation request could not be completed`);

        return res.status(500).json({
            errorMessage: "Internal Server Error"
        });
    }
}
// ============================================================
// Suggest blog description from blog title - ends
// ============================================================



// ============================================================
// Enhance blog description - starts
// ============================================================
async function enhanceBlogDescription(req, res) {
    logger.info(`[${FILE_NAME}] Blog description enhancement request received`);

    const blogText = req.body.blogText;

    if (!blogText) {
        logger.warn(`[${FILE_NAME}] Blog description is missing for enhancement`);

        return res.status(400).json({
            errorMessage: "Blog description is required"
        });
    }

    const genConfig = {
        temperature: 0.7,
        maxOutputTokens: 15000
    };

    try {
        logger.info(`[${FILE_NAME}] Calling Gemini service for blog description enhancement`);

        const generatedText =
            await generateGeminiContent(
                blogDescriptionEnhancementPrompt(blogText),
                genConfig
            );

        const enhancedBlogDescription = generatedText;

        logger.success(`[${FILE_NAME}] Blog description enhanced successfully`);

        return res.status(200).json({
            enhancedBlogDescription: enhancedBlogDescription
        });
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to enhance blog description`, error);
        logger.warn(`[${FILE_NAME}] Blog description enhancement request could not be completed`);

        return res.status(500).json({
            errorMessage: "Internal Server Error"
        });
    }
}
// ============================================================
// Enhance blog description - ends
// ============================================================



// ============================================================
// Controller Exports - starts
// ============================================================
module.exports = {
    suggestBlogTitlesFromBlogDescription,
    suggestBlogDescriptionsFromBlogTitle,
    enhanceBlogDescription
};
// ============================================================
// Controller Exports - ends
// ============================================================
