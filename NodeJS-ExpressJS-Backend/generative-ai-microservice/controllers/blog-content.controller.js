const {
    generateGeminiContent
} = require("../services/gemini.service.js");

const {
    blogTLDRGenerationPrompt,
    blogKeyTakeawaysGenerationPrompt,
    blogConclusionGenerationPrompt,
    blogFAQGenerationPrompt,
    blogHighlightsGenerationPrompt,
    blogDescriptionSummaryPrompt
} = require("../utils/gemini-prompts/index.js");

const logger = require("../utils/loggers/logger.js");

const FILE_NAME = "blog-content.controller.js";



// ============================================================
// Get blog description summary - starts
// ============================================================
async function getBlogDescriptionSummary(req, res) {
    logger.info(`[${FILE_NAME}] Blog description summary request received`);

    const blogText = req.body.blogText;

    if (!blogText) {
        logger.warn(`[${FILE_NAME}] Blog description is missing`);

        return res.status(400).json({
            errorMessage: "Blog description is required"
        });
    }

    const genConfig = {
        temperature: 0.4,
        maxOutputTokens: 500
    };

    try {
        logger.info(`[${FILE_NAME}] Calling Gemini service for blog description summary`);

        const generatedText =
            await generateGeminiContent(
                blogDescriptionSummaryPrompt(blogText),
                genConfig
            );

        const plainTextSummary = generatedText;
        const aiGeneratedSummary = plainTextSummary;

        logger.success(`[${FILE_NAME}] Blog description summary generated successfully`);

        return res.status(200).json({
            blogSummary: aiGeneratedSummary
        });
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to generate blog description summary`, error);
        logger.warn(`[${FILE_NAME}] Blog description summary request could not be completed`);

        return res.status(500).json({
            errorMessage: "Internal Server Error"
        });
    }
}
// ============================================================
// Get blog description summary - ends
// ============================================================



// ============================================================
// Generate Blog TLDR - starts
// ============================================================
async function generateBlogTLDR(req, res) {
    logger.info(`[${FILE_NAME}] Blog TLDR generation request received`);

    const blogText = req.body.blogText;

    if (!blogText) {
        logger.warn(`[${FILE_NAME}] Blog content is missing for TLDR generation`);

        return res.status(400).json({
            errorMessage: "Blog content is required"
        });
    }

    const genConfig = {
        temperature: 0.4,
        maxOutputTokens: 250
    };

    try {
        logger.info(`[${FILE_NAME}] Calling Gemini service for blog TLDR`);

        const generatedText =
            await generateGeminiContent(
                blogTLDRGenerationPrompt(blogText),
                genConfig
            );

        const plainTextTLDR = generatedText;
        const aiGeneratedTLDR = plainTextTLDR;

        logger.success(`[${FILE_NAME}] Blog TLDR generated successfully`);

        return res.status(200).json({
            blogTLDR: aiGeneratedTLDR
        });
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to generate blog TLDR`, error);
        logger.warn(`[${FILE_NAME}] Blog TLDR generation request could not be completed`);

        return res.status(500).json({
            errorMessage: "Internal Server Error"
        });
    }
}
// ============================================================
// Generate Blog TLDR - ends
// ============================================================



// ============================================================
// Generate Key Takeaways - starts
// ============================================================
async function generateBlogKeyTakeaways(req, res) {
    logger.info(`[${FILE_NAME}] Blog key takeaways generation request received`);

    const blogText = req.body.blogText;

    if (!blogText) {
        logger.warn(`[${FILE_NAME}] Blog content is missing for key takeaways generation`);

        return res.status(400).json({
            errorMessage: "Blog content is required"
        });
    }

    const genConfig = {
        temperature: 0.4,
        maxOutputTokens: 2000
    };

    try {
        logger.info(`[${FILE_NAME}] Calling Gemini service for blog key takeaways`);

        const generatedText =
            await generateGeminiContent(
                blogKeyTakeawaysGenerationPrompt(blogText),
                genConfig
            );

        const plainTextKeyTakeaways = generatedText;
        const aiGeneratedKeyTakeaways =
            JSON.parse(plainTextKeyTakeaways);

        logger.success(`[${FILE_NAME}] Blog key takeaways generated successfully`);

        return res.status(200).json({
            blogKeyTakeaways: aiGeneratedKeyTakeaways
        });
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to generate blog key takeaways`, error);
        logger.warn(`[${FILE_NAME}] Blog key takeaways generation request could not be completed`);

        return res.status(500).json({
            errorMessage: "Internal Server Error"
        });
    }
}
// ============================================================
// Generate Key Takeaways - ends
// ============================================================



// ============================================================
// Generate Conclusion - starts
// ============================================================
async function generateBlogConclusion(req, res) {
    logger.info(`[${FILE_NAME}] Blog conclusion generation request received`);

    const blogText = req.body.blogText;

    if (!blogText) {
        logger.warn(`[${FILE_NAME}] Blog content is missing for conclusion generation`);

        return res.status(400).json({
            errorMessage: "Blog content is required"
        });
    }

    const genConfig = {
        temperature: 0.4,
        maxOutputTokens: 1000
    };

    try {
        logger.info(`[${FILE_NAME}] Calling Gemini service for blog conclusion`);

        const generatedText =
            await generateGeminiContent(
                blogConclusionGenerationPrompt(blogText),
                genConfig
            );

        const plainTextConclusion = generatedText;
        const aiGeneratedConclusion = plainTextConclusion;

        logger.success(`[${FILE_NAME}] Blog conclusion generated successfully`);

        return res.status(200).json({
            blogConclusion: aiGeneratedConclusion
        });
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to generate blog conclusion`, error);
        logger.warn(`[${FILE_NAME}] Blog conclusion generation request could not be completed`);

        return res.status(500).json({
            errorMessage: "Internal Server Error"
        });
    }
}
// ============================================================
// Generate Conclusion - ends
// ============================================================



// ============================================================
// Generate FAQ - starts
// ============================================================
async function generateBlogFAQ(req, res) {
    logger.info(`[${FILE_NAME}] Blog FAQ generation request received`);

    const blogText = req.body.blogText;

    if (!blogText) {
        logger.warn(`[${FILE_NAME}] Blog content is missing for FAQ generation`);

        return res.status(400).json({
            errorMessage: "Blog content is required"
        });
    }

    const genConfig = {
        temperature: 0.4,
        maxOutputTokens: 2000
    };

    try {
        logger.info(`[${FILE_NAME}] Calling Gemini service for blog FAQ`);

        const generatedText =
            await generateGeminiContent(
                blogFAQGenerationPrompt(blogText),
                genConfig
            );

        const plainTextFAQ = generatedText;
        const aiGeneratedFAQ = JSON.parse(plainTextFAQ);

        logger.success(`[${FILE_NAME}] Blog FAQ generated successfully`);

        return res.status(200).json({
            blogFAQ: aiGeneratedFAQ
        });
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to generate blog FAQ`, error);
        logger.warn(`[${FILE_NAME}] Blog FAQ generation request could not be completed`);

        return res.status(500).json({
            errorMessage: "Internal Server Error"
        });
    }
}
// ============================================================
// Generate FAQ - ends
// ============================================================



// ============================================================
// Generate Highlights - starts
// ============================================================
async function generateBlogHighlights(req, res) {
    logger.info(`[${FILE_NAME}] Blog highlights generation request received`);

    const blogText = req.body.blogText;

    if (!blogText) {
        logger.warn(`[${FILE_NAME}] Blog content is missing for highlights generation`);

        return res.status(400).json({
            errorMessage: "Blog content is required"
        });
    }

    const genConfig = {
        temperature: 0.4,
        maxOutputTokens: 2000
    };

    try {
        logger.info(`[${FILE_NAME}] Calling Gemini service for blog highlights`);

        const generatedText =
            await generateGeminiContent(
                blogHighlightsGenerationPrompt(blogText),
                genConfig
            );

        const plainTextHighlights = generatedText;
        const aiGeneratedHighlights =
            JSON.parse(plainTextHighlights);

        logger.success(`[${FILE_NAME}] Blog highlights generated successfully`);

        return res.status(200).json({
            blogHighlights: aiGeneratedHighlights
        });
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to generate blog highlights`, error);
        logger.warn(`[${FILE_NAME}] Blog highlights generation request could not be completed`);

        return res.status(500).json({
            errorMessage: "Internal Server Error"
        });
    }
}
// ============================================================
// Generate Highlights - ends
// ============================================================



// ============================================================
// Controller Exports - starts
// ============================================================
module.exports = {
    getBlogDescriptionSummary,
    generateBlogTLDR,
    generateBlogKeyTakeaways,
    generateBlogConclusion,
    generateBlogFAQ,
    generateBlogHighlights
};
// ============================================================
// Controller Exports - ends
// ============================================================
