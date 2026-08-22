const axios = require("axios");

const {
    generateAccessToken
} = require("../googleAuthToken.js");

const logger = require("../utils/loggers/logger.js");

const FILE_NAME = "gemini.service.js";

const GEMINI_MODEL_NAME = "gemini-2.5-flash-lite";

const GEMINI_API_URL =
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL_NAME}:generateContent`;



// ============================================================
// Generate Gemini Content - starts
// ============================================================
async function generateGeminiContent(prompt, generationConfig) {
    logger.info(`[${FILE_NAME}] Gemini content generation request received`);

    try {
        logger.info(`[${FILE_NAME}] Validating Gemini prompt`);

        if (!prompt || typeof prompt !== "string") {
            logger.warn(`[${FILE_NAME}] Gemini prompt is missing or invalid`);

            throw new Error("Gemini prompt is missing or invalid");
        }

        logger.info(`[${FILE_NAME}] Generating Google access token`);

        const accessToken = await generateAccessToken();

        logger.success(`[${FILE_NAME}] Google access token generated successfully`);

        logger.info(`[${FILE_NAME}] Sending content generation request to Gemini`);

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

        logger.success(`[${FILE_NAME}] Gemini API request completed successfully`);

        const candidates = geminiResponse.data.candidates;

        if (!candidates || candidates.length === 0) {
            logger.warn(`[${FILE_NAME}] Gemini returned no candidates`);

            throw new Error("Gemini returned no candidates");
        }

        const generatedText =
            candidates[0]?.content?.parts?.[0]?.text;

        if (!generatedText) {
            logger.warn(`[${FILE_NAME}] Gemini returned no generated text`);

            throw new Error("Gemini returned no generated text");
        }

        logger.success(`[${FILE_NAME}] Gemini content generated successfully`);

        return generatedText;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Gemini content generation failed`, error);
        logger.warn(`[${FILE_NAME}] Gemini content generation request could not be completed`);

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
