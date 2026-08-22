function blogDescriptionEnhancementPrompt(blogText) {
    return `
        You are an expert content editor and SEO optimization specialist.

        Enhance the following blog description while preserving its original meaning and intent.

        Requirements:
        - Improve grammar, readability, clarity, and sentence structure.
        - Make the content more engaging, professional, and reader-friendly.
        - Improve SEO quality naturally by optimizing keyword usage without keyword stuffing.
        - Maintain the author's original voice and intent.
        - Preserve all important information from the original content.
        - Improve content flow and overall quality.
        - Do not add unrelated ideas, facts, or information.
        - Do not mention AI or the editing process.
        - Do not use headings, bullet points, markdown, bold, or italic formatting.
        - Return only the enhanced blog description text.

        Original Blog Description:
        "${blogText}"

        Enhanced Blog Description:
    `;
}

module.exports = blogDescriptionEnhancementPrompt;