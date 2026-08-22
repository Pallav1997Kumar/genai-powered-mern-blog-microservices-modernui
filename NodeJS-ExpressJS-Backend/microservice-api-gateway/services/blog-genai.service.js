const httpClient = require("../utils/httpClient.js");
const logger = require("../utils/logger.js");

const {
    GENAI_SERVICE
} = require("../config/services.js");


const FILE_NAME = "blog-genai.service.js";



// ============================================================
// Generate Blog Summary Code Starts
// ============================================================
const generateBlogSummary = async function(blogText) {
    logger.info(`[${FILE_NAME}] Generate blog summary request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling gen-ai service to generate blog summary`);

        const response = await httpClient.post(
            `${GENAI_SERVICE}/api/gen-ai/blog-description/generate-blog-summary`,
            {
                blogText
            }
        );

        logger.info(`[${FILE_NAME}] Blog summary generated successfully`);
        logger.success(`[${FILE_NAME}] Generate blog summary completed successfully`);

        logger.info(`[${FILE_NAME}] Returning blog summary response`);

        return response.data;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to generate blog summary`, error);
        logger.warn(`[${FILE_NAME}] Generate blog summary request could not be completed`);

        throw {
            message: "Failed to generate blog summary",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Generate Blog Summary Code Ends
// ============================================================



// ============================================================
// Generate Blog TLDR Code Starts
// ============================================================
const generateBlogTLDR = async function(blogText) {
    logger.info(`[${FILE_NAME}] Generate blog TLDR request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling gen-ai service to generate blog TLDR`);

        const response = await httpClient.post(
            `${GENAI_SERVICE}/api/gen-ai/blog-description/generate-blog-tldr`,
            {
                blogText
            }
        );

        logger.info(`[${FILE_NAME}] Blog TLDR generated successfully`);
        logger.success(`[${FILE_NAME}] Generate blog TLDR completed successfully`);

        logger.info(`[${FILE_NAME}] Returning blog TLDR response`);

        return response.data;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to generate blog TLDR`, error);
        logger.warn(`[${FILE_NAME}] Generate blog TLDR request could not be completed`);

        throw {
            message: "Failed to generate blog TLDR",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Generate Blog TLDR Code Ends
// ============================================================



// ============================================================
// Generate Blog Key Takeaways Code Starts
// ============================================================
const generateBlogKeyTakeaways = async function(blogText) {
    logger.info(`[${FILE_NAME}] Generate blog key takeaways request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling gen-ai service to generate blog key takeaways`);

        const response = await httpClient.post(
            `${GENAI_SERVICE}/api/gen-ai/blog-description/generate-blog-key-takeaways`,
            {
                blogText
            }
        );

        logger.info(`[${FILE_NAME}] Blog key takeaways generated successfully`);
        logger.success(`[${FILE_NAME}] Generate blog key takeaways completed successfully`);

        logger.info(`[${FILE_NAME}] Returning blog key takeaways response`);

        return response.data;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to generate blog key takeaways`, error);
        logger.warn(`[${FILE_NAME}] Generate blog key takeaways request could not be completed`);

        throw {
            message: "Failed to generate blog key takeaways",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Generate Blog Key Takeaways Code Ends
// ============================================================



// ============================================================
// Generate Blog Conclusion Code Starts
// ============================================================
const generateBlogConclusion = async function(blogText) {
    logger.info(`[${FILE_NAME}] Generate blog conclusion request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling gen-ai service to generate blog conclusion`);

        const response = await httpClient.post(
            `${GENAI_SERVICE}/api/gen-ai/blog-description/generate-blog-conclusion`,
            {
                blogText
            }
        );

        logger.info(`[${FILE_NAME}] Blog conclusion generated successfully`);
        logger.success(`[${FILE_NAME}] Generate blog conclusion completed successfully`);

        logger.info(`[${FILE_NAME}] Returning blog conclusion response`);

        return response.data;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to generate blog conclusion`, error);
        logger.warn(`[${FILE_NAME}] Generate blog conclusion request could not be completed`);

        throw {
            message: "Failed to generate blog conclusion",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Generate Blog Conclusion Code Ends
// ============================================================



// ============================================================
// Generate Blog FAQ Code Starts
// ============================================================
const generateBlogFAQ = async function(blogText) {
    logger.info(`[${FILE_NAME}] Generate blog FAQ request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling gen-ai service to generate blog FAQ`);

        const response = await httpClient.post(
            `${GENAI_SERVICE}/api/gen-ai/blog-description/generate-blog-faq`,
            {
                blogText
            }
        );

        logger.info(`[${FILE_NAME}] Blog FAQ generated successfully`);
        logger.success(`[${FILE_NAME}] Generate blog FAQ completed successfully`);

        logger.info(`[${FILE_NAME}] Returning blog FAQ response`);

        return response.data;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to generate blog FAQ`, error);
        logger.warn(`[${FILE_NAME}] Generate blog FAQ request could not be completed`);

        throw {
            message: "Failed to generate blog FAQ",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Generate Blog FAQ Code Ends
// ============================================================



// ============================================================
// Generate Blog Highlights Code Starts
// ============================================================
const generateBlogHighlights = async function(blogText) {
    logger.info(`[${FILE_NAME}] Generate blog highlights request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling gen-ai service to generate blog highlights`);

        const response = await httpClient.post(
            `${GENAI_SERVICE}/api/gen-ai/blog-description/generate-blog-highlights`,
            {
                blogText
            }
        );

        logger.info(`[${FILE_NAME}] Blog highlights generated successfully`);
        logger.success(`[${FILE_NAME}] Generate blog highlights completed successfully`);

        logger.info(`[${FILE_NAME}] Returning blog highlights response`);

        return response.data;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to generate blog highlights`, error);
        logger.warn(`[${FILE_NAME}] Generate blog highlights request could not be completed`);

        throw {
            message: "Failed to generate blog highlights",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Generate Blog Highlights Code Ends
// ============================================================



// ============================================================
// Suggest Blog Titles Code Starts
// ============================================================
const suggestBlogTitles = async function(blogText) {
    logger.info(`[${FILE_NAME}] Suggest blog titles request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling gen-ai service to suggest blog titles`);

        const response = await httpClient.post(
            `${GEN_AI_SERVICE}/api/gen-ai/blog-generation/suggest-blog-titles`,
            {
                blogText
            }
        );

        logger.info(`[${FILE_NAME}] Blog title suggestions received successfully`);
        logger.success(`[${FILE_NAME}] Suggest blog titles completed successfully`);

        logger.info(`[${FILE_NAME}] Returning blog title suggestions response`);

        return response.data;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to suggest blog titles`, error);
        logger.warn(`[${FILE_NAME}] Suggest blog titles request could not be completed`);

        throw {
            message: "Failed to suggest blog titles",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Suggest Blog Titles Code Ends
// ============================================================



// ============================================================
// Generate Blog Description Code Starts
// ============================================================
const generateBlogDescription = async function(blogTitle) {
    logger.info(`[${FILE_NAME}] Generate blog description request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling gen-ai service to generate blog description`);

        const response = await httpClient.post(
            `${GEN_AI_SERVICE}/api/gen-ai/blog-generation/generate-blog-description`,
            {
                blogTitle
            }
        );

        logger.info(`[${FILE_NAME}] Blog description generated successfully`);
        logger.success(`[${FILE_NAME}] Generate blog description completed successfully`);

        logger.info(`[${FILE_NAME}] Returning blog description response`);

        return response.data;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to generate blog description`, error);
        logger.warn(`[${FILE_NAME}] Generate blog description request could not be completed`);

        throw {
            message: "Failed to generate blog description",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Generate Blog Description Code Ends
// ============================================================



// ============================================================
// Enhance Blog Description Code Starts
// ============================================================
const enhanceBlogDescription = async function(blogText) {
    logger.info(`[${FILE_NAME}] Enhance blog description request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling gen-ai service to enhance blog description`);

        const response = await httpClient.post(
            `${GEN_AI_SERVICE}/api/gen-ai/blog-generation/enhance-blog-description`,
            {
                blogText
            }
        );

        logger.info(`[${FILE_NAME}] Blog description enhanced successfully`);
        logger.success(`[${FILE_NAME}] Enhance blog description completed successfully`);

        logger.info(`[${FILE_NAME}] Returning enhanced blog description response`);

        return response.data;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to enhance blog description`, error);
        logger.warn(`[${FILE_NAME}] Enhance blog description request could not be completed`);

        throw {
            message: "Failed to enhance blog description",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Enhance Blog Description Code Ends
// ============================================================



// ============================================================
// Service Exports Starts
// ============================================================
module.exports = {
    generateBlogSummary,
    generateBlogTLDR,
    generateBlogKeyTakeaways,
    generateBlogConclusion,
    generateBlogFAQ,
    generateBlogHighlights,

    suggestBlogTitles,
    generateBlogDescription,
    enhanceBlogDescription
};
// ============================================================
// Service Exports Ends
// ============================================================
