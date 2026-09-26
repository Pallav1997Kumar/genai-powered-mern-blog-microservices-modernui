class ErrorMessage {
    static BLOG_DESCRIPTION_REQUIRED = "Blog description is required";
    static BLOG_CONTENT_REQUIRED = "Blog content is required";
    static BLOG_TITLE_REQUIRED = "Blog title is required";
    
    static FAILED_TO_GENERATE_BLOG_DESCRIPTION_SUMMARY = "Failed to generate blog description summary";
    static FAILED_TO_GENERATE_BLOG_TLDR = "Failed to generate blog TLDR";
    static FAILED_TO_GENERATE_BLOG_KEY_TAKEAWAYS = "Failed to generate blog key takeaways";
    static FAILED_TO_GENERATE_BLOG_CONCLUSION = "Failed to generate blog conclusion";
    static FAILED_TO_GENERATE_BLOG_FAQ = "Failed to generate blog FAQ";
    static FAILED_TO_GENERATE_BLOG_HIGHLIGHTS = "Failed to generate blog highlights";
    static FAILED_TO_GENERATE_BLOG_TITLE_SUGGESTIONS = "Failed to generate blog title suggestions";
    static FAILED_TO_GENERATE_BLOG_DESCRIPTION = "Failed to generate blog description";
    static FAILED_TO_ENHANCE_BLOG_DESCRIPTION = "Failed to enhance blog description";
    
    static GEMINI_PROMPT_MISSING_OR_INVALID = "Gemini prompt is missing or invalid";
    static GEMINI_NO_CANDIDATES = "Gemini returned no candidates";
    static GEMINI_NO_GENERATED_TEXT = "Gemini returned no generated text";
}


module.exports = ErrorMessage;