const axios = require("axios");
const dotenv = require("dotenv");

const ErrorMessage = require("../constants/error-message.constant.js");
const {
    generateAccessToken
} = require("../googleAuthToken.js");

const devLogger = require("../utils/loggers/dev-logger.js");

const FILE_NAME = "gemini.service.js";

const GEMINI_MODEL_NAME = "gemini-2.5-flash-lite";

const GEMINI_API_URL =
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL_NAME}:generateContent`;




// ============================================================
// Generate Gemini Content - starts
// ============================================================
async function generateGeminiContent(prompt, generationConfig) {
    devLogger.info(`[${FILE_NAME}] Gemini content generation request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Validating Gemini prompt`);
        if (!prompt || typeof prompt !== "string") {
            devLogger.warn(`[${FILE_NAME}] Gemini prompt is missing or invalid`);
            throw new Error(ErrorMessage.GEMINI_PROMPT_MISSING_OR_INVALID);
        }

        devLogger.info(`[${FILE_NAME}] Generating Google access token`);
        const accessToken = await generateAccessToken();
        devLogger.success(`[${FILE_NAME}] Google access token generated successfully`);

        devLogger.info(`[${FILE_NAME}] Sending content generation request to Gemini`);

        const geminiResponse = await axios.post(
            GEMINI_API_URL,
            {
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ],
                generationConfig: generationConfig
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        devLogger.success(`[${FILE_NAME}] Gemini API request completed successfully`);

        const candidates = geminiResponse.data.candidates;

        if (!candidates || candidates.length === 0) {
            devLogger.warn(`[${FILE_NAME}] Gemini returned no candidates`);
            throw new Error(ErrorMessage.GEMINI_NO_CANDIDATES);
        }

        const generatedText = candidates[0]?.content?.parts?.[0]?.text;

        if (!generatedText) {
            devLogger.warn(`[${FILE_NAME}] Gemini returned no generated text`);
            throw new Error(ErrorMessage.GEMINI_NO_GENERATED_TEXT);
        }

        devLogger.success(`[${FILE_NAME}] Gemini content generated successfully`);

        return generatedText;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Gemini content generation failed`, error);
        devLogger.warn(`[${FILE_NAME}] Gemini content generation request could not be completed`);
        throw error;
    }
}
// ============================================================
// Generate Gemini Content - ends
// ============================================================



// ============================================================
// Service Exports - starts
// ============================================================
module.exports = {
    generateGeminiContent
};
// ============================================================
// Service Exports - ends
// ============================================================