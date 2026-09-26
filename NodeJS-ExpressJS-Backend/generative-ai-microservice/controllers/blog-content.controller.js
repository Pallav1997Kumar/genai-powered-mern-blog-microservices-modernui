const ErrorMessage = require("../constants/error-message.constant.js");
const SuccessMessage = require("../constants/success-message.constant.js");
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

const devLogger = require("../utils/loggers/dev-logger.js");

const FILE_NAME = "blog-content.controller.js";



// ============================================================
// Get Blog Description Summary - starts
// ============================================================
async function getBlogDescriptionSummary(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Blog description summary request received`);

    try {

        devLogger.info(`[${FILE_NAME}] Extracting blog text from request body`);
        const blogText = req.body.blogText;

        if(!blogText){
            devLogger.warn(`[${FILE_NAME}] Blog description is missing`);
            return res.status(400).json({
                success:false,
                error:true,
                successMessage:"",
                errorMessage:ErrorMessage.BLOG_DESCRIPTION_REQUIRED,
                resultData:null
            });
        }

        const genConfig = {
            temperature:0.4,
            maxOutputTokens:500
        };

        devLogger.info(`[${FILE_NAME}] Calling Gemini service for blog description summary`);

        const generatedText =
            await generateGeminiContent(
                blogDescriptionSummaryPrompt(blogText),
                genConfig
            );

        const plainTextSummary = generatedText;
        const aiGeneratedSummary = plainTextSummary;

        devLogger.success(`[${FILE_NAME}] Blog description summary generated successfully`);
        devLogger.info(`[${FILE_NAME}] Sending blog description summary response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BLOG_DESCRIPTION_SUMMARY_GENERATED,
            errorMessage:"",
            resultData:aiGeneratedSummary
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to generate blog description summary`, error);
        devLogger.warn(`[${FILE_NAME}] Blog description summary request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_GENERATE_BLOG_DESCRIPTION_SUMMARY,
            resultData:null
        });
    }
}
// ============================================================
// Get Blog Description Summary - ends
// ============================================================



// ============================================================
// Generate Blog TLDR - starts
// ============================================================
async function generateBlogTLDR(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Blog TLDR generation request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting blog text from request body`);
        const blogText = req.body.blogText;

        if(!blogText){
            devLogger.warn(`[${FILE_NAME}] Blog content is missing for TLDR generation`);
            return res.status(400).json({
                success:false,
                error:true,
                successMessage:"",
                errorMessage:ErrorMessage.BLOG_CONTENT_REQUIRED,
                resultData:null
            });
        }

        const genConfig = {
            temperature:0.4,
            maxOutputTokens:250
        };

        devLogger.info(`[${FILE_NAME}] Calling Gemini service for blog TLDR`);

        const generatedText =
            await generateGeminiContent(
                blogTLDRGenerationPrompt(blogText),
                genConfig
            );

        const plainTextTLDR = generatedText;
        const aiGeneratedTLDR = plainTextTLDR;

        devLogger.success(`[${FILE_NAME}] Blog TLDR generated successfully`);
        devLogger.info(`[${FILE_NAME}] Sending blog TLDR response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BLOG_TLDR_GENERATED,
            errorMessage:"",
            resultData:aiGeneratedTLDR
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to generate blog TLDR`, error);
        devLogger.warn(`[${FILE_NAME}] Blog TLDR generation request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_GENERATE_BLOG_TLDR,
            resultData:null
        });
    }
}
// ============================================================
// Generate Blog TLDR - ends
// ============================================================



// ============================================================
// Generate Blog Key Takeaways - starts
// ============================================================
async function generateBlogKeyTakeaways(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Blog key takeaways generation request received`);

    try {

        devLogger.info(`[${FILE_NAME}] Extracting blog text from request body`);
        const blogText = req.body.blogText;

        if(!blogText){
            devLogger.warn(`[${FILE_NAME}] Blog content is missing for key takeaways generation`);
            return res.status(400).json({
                success:false,
                error:true,
                successMessage:"",
                errorMessage:ErrorMessage.BLOG_CONTENT_REQUIRED,
                resultData:null
            });
        }

        const genConfig = {
            temperature:0.4,
            maxOutputTokens:2000
        };

        devLogger.info(`[${FILE_NAME}] Calling Gemini service for blog key takeaways`);

        const generatedText =
            await generateGeminiContent(
                blogKeyTakeawaysGenerationPrompt(blogText),
                genConfig
            );

        devLogger.info(`[${FILE_NAME}] Parsing generated blog key takeaways`);
        const aiGeneratedKeyTakeaways = JSON.parse(generatedText);
        devLogger.success(`[${FILE_NAME}] Blog key takeaways generated successfully`);

        devLogger.info(`[${FILE_NAME}] Sending blog key takeaways response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BLOG_KEY_TAKEAWAYS_GENERATED,
            errorMessage:"",
            resultData:aiGeneratedKeyTakeaways
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to generate blog key takeaways`, error);
        devLogger.warn(`[${FILE_NAME}] Blog key takeaways generation request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_GENERATE_BLOG_KEY_TAKEAWAYS,
            resultData:null
        });
    }
}
// ============================================================
// Generate Blog Key Takeaways - ends
// ============================================================



// ============================================================
// Generate Blog Conclusion - starts
// ============================================================
async function generateBlogConclusion(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Blog conclusion generation request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting blog text from request body`);
        const blogText = req.body.blogText;

        if(!blogText){
            devLogger.warn(`[${FILE_NAME}] Blog content is missing for conclusion generation`);
            return res.status(400).json({
                success:false,
                error:true,
                successMessage:"",
                errorMessage:ErrorMessage.BLOG_CONTENT_REQUIRED,
                resultData:null
            });
        }

        const genConfig = {
            temperature:0.4,
            maxOutputTokens:1000
        };

        devLogger.info(`[${FILE_NAME}] Calling Gemini service for blog conclusion`);

        const generatedText =
            await generateGeminiContent(
                blogConclusionGenerationPrompt(blogText),
                genConfig
            );

        const plainTextConclusion = generatedText;
        const aiGeneratedConclusion = plainTextConclusion;

        devLogger.success(`[${FILE_NAME}] Blog conclusion generated successfully`);
        devLogger.info(`[${FILE_NAME}] Sending blog conclusion response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BLOG_CONCLUSION_GENERATED,
            errorMessage:"",
            resultData:aiGeneratedConclusion
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to generate blog conclusion`, error);
        devLogger.warn(`[${FILE_NAME}] Blog conclusion generation request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_GENERATE_BLOG_CONCLUSION,
            resultData:null
        });
    }
}
// ============================================================
// Generate Blog Conclusion - ends
// ============================================================



// ============================================================
// Generate Blog FAQ - starts
// ============================================================
async function generateBlogFAQ(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Blog FAQ generation request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting blog text from request body`);
        const blogText = req.body.blogText;

        if(!blogText){
            devLogger.warn(`[${FILE_NAME}] Blog content is missing for FAQ generation`);
            return res.status(400).json({
                success:false,
                error:true,
                successMessage:"",
                errorMessage:ErrorMessage.BLOG_CONTENT_REQUIRED,
                resultData:null
            });
        }

        const genConfig = {
            temperature:0.4,
            maxOutputTokens:2000
        };

        devLogger.info(`[${FILE_NAME}] Calling Gemini service for blog FAQ`);

        const generatedText =
            await generateGeminiContent(
                blogFAQGenerationPrompt(blogText),
                genConfig
            );

        devLogger.info(`[${FILE_NAME}] Parsing generated blog FAQ`);
        const aiGeneratedFAQ = JSON.parse(generatedText);
        devLogger.success(`[${FILE_NAME}] Blog FAQ generated successfully`);

        devLogger.info(`[${FILE_NAME}] Sending blog FAQ response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BLOG_FAQ_GENERATED,
            errorMessage:"",
            resultData:aiGeneratedFAQ
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to generate blog FAQ`, error);
        devLogger.warn(`[${FILE_NAME}] Blog FAQ generation request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_GENERATE_BLOG_FAQ,
            resultData:null
        });
    }
}
// ============================================================
// Generate Blog FAQ - ends
// ============================================================



// ============================================================
// Generate Blog Highlights - starts
// ============================================================
async function generateBlogHighlights(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Blog highlights generation request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting blog text from request body`);
        const blogText = req.body.blogText;

        if(!blogText){
            devLogger.warn(`[${FILE_NAME}] Blog content is missing for highlights generation`);
            return res.status(400).json({
                success:false,
                error:true,
                successMessage:"",
                errorMessage:ErrorMessage.BLOG_CONTENT_REQUIRED,
                resultData:null
            });
        }

        const genConfig = {
            temperature:0.4,
            maxOutputTokens:2000
        };

        devLogger.info(`[${FILE_NAME}] Calling Gemini service for blog highlights`);

        const generatedText =
            await generateGeminiContent(
                blogHighlightsGenerationPrompt(blogText),
                genConfig
            );

        devLogger.info(`[${FILE_NAME}] Parsing generated blog highlights`);
        const aiGeneratedHighlights = JSON.parse(generatedText);
        devLogger.success(`[${FILE_NAME}] Blog highlights generated successfully`);

        devLogger.info(`[${FILE_NAME}] Sending blog highlights response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BLOG_HIGHLIGHTS_GENERATED,
            errorMessage:"",
            resultData:aiGeneratedHighlights
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to generate blog highlights`, error);
        devLogger.warn(`[${FILE_NAME}] Blog highlights generation request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_GENERATE_BLOG_HIGHLIGHTS,
            resultData:null
        });
    }
}
// ============================================================
// Generate Blog Highlights - ends
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
