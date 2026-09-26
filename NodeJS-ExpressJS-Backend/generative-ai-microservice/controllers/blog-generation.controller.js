const ErrorMessage = require("../constants/error-message.constant.js");
const SuccessMessage = require("../constants/success-message.constant.js");
const {
    generateGeminiContent
} = require("../services/gemini.service.js");

const {
    blogTitleSuggestionPrompt,
    blogDescriptionGenerationPrompt,
    blogDescriptionEnhancementPrompt
} = require("../utils/gemini-prompts/index.js");

const devLogger = require("../utils/loggers/dev-logger.js");

const FILE_NAME = "blog-generation.controller.js";



// ============================================================
// Suggest Blog Titles From Blog Description - starts
// ============================================================
async function suggestBlogTitlesFromBlogDescription(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Blog title suggestion request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting blog description from request body`);
        const blogText = req.body.blogText;

        if(!blogText){
            devLogger.warn(`[${FILE_NAME}] Blog description is missing for title suggestion`);
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
            maxOutputTokens:250
        };

        devLogger.info(`[${FILE_NAME}] Calling Gemini service for blog title suggestions`);

        const generatedText =
            await generateGeminiContent(
                blogTitleSuggestionPrompt(blogText),
                genConfig
            );

        devLogger.info(`[${FILE_NAME}] Parsing generated blog title suggestions`);
        const geminiGeneratedBlogTitles = JSON.parse(generatedText);
        devLogger.success(`[${FILE_NAME}] Blog title suggestions generated successfully`);

        devLogger.info(`[${FILE_NAME}] Sending blog title suggestions response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BLOG_TITLE_SUGGESTIONS_GENERATED,
            errorMessage:"",
            resultData:geminiGeneratedBlogTitles
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to generate blog title suggestions`, error);
        devLogger.warn(`[${FILE_NAME}] Blog title suggestion request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_GENERATE_BLOG_TITLE_SUGGESTIONS,
            resultData:null
        });
    }
}
// ============================================================
// Suggest Blog Titles From Blog Description - ends
// ============================================================



// ============================================================
// Suggest Blog Descriptions From Blog Title - starts
// ============================================================
async function suggestBlogDescriptionsFromBlogTitle(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Blog description generation request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting blog title from request body`);
        const blogTitle = req.body.blogTitle;

        if(!blogTitle){
            devLogger.warn(`[${FILE_NAME}] Blog title is missing for description generation`);
            return res.status(400).json({
                success:false,
                error:true,
                successMessage:"",
                errorMessage:ErrorMessage.BLOG_TITLE_REQUIRED,
                resultData:null
            });
        }

        const genConfig = {
            temperature:0.7,
            maxOutputTokens:15000
        };

        devLogger.info(`[${FILE_NAME}] Calling Gemini service for blog description generation`);

        const generatedText =
            await generateGeminiContent(
                blogDescriptionGenerationPrompt(blogTitle),
                genConfig
            );

        const geminiGeneratedBlogDescription = generatedText;
        devLogger.success(`[${FILE_NAME}] Blog description generated successfully`);
        devLogger.info(`[${FILE_NAME}] Sending blog description response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BLOG_DESCRIPTION_GENERATED,
            errorMessage:"",
            resultData:geminiGeneratedBlogDescription
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to generate blog description`, error);
        devLogger.warn(`[${FILE_NAME}] Blog description generation request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_GENERATE_BLOG_DESCRIPTION,
            resultData:null
        });
    }
}
// ============================================================
// Suggest Blog Descriptions From Blog Title - ends
// ============================================================



// ============================================================
// Enhance Blog Description - starts
// ============================================================
async function enhanceBlogDescription(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Blog description enhancement request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting blog description from request body`);
        const blogText = req.body.blogText;

        if(!blogText){
            devLogger.warn(`[${FILE_NAME}] Blog description is missing for enhancement`);
            return res.status(400).json({
                success:false,
                error:true,
                successMessage:"",
                errorMessage:ErrorMessage.BLOG_DESCRIPTION_REQUIRED,
                resultData:null
            });
        }

        const genConfig = {
            temperature:0.7,
            maxOutputTokens:15000
        };

        devLogger.info(`[${FILE_NAME}] Calling Gemini service for blog description enhancement`);

        const generatedText =
            await generateGeminiContent(
                blogDescriptionEnhancementPrompt(blogText),
                genConfig
            );

        const enhancedBlogDescription = generatedText;
        devLogger.success(`[${FILE_NAME}] Blog description enhanced successfully`);
        devLogger.info(`[${FILE_NAME}] Sending enhanced blog description response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BLOG_DESCRIPTION_ENHANCED,
            errorMessage:"",
            resultData:enhancedBlogDescription
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to enhance blog description`, error);
        devLogger.warn(`[${FILE_NAME}] Blog description enhancement request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_ENHANCE_BLOG_DESCRIPTION,
            resultData:null
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
    suggestBlogTitlesFromBlogDescription,
    suggestBlogDescriptionsFromBlogTitle,
    enhanceBlogDescription
};
// ============================================================
// Controller Exports - ends
// ============================================================