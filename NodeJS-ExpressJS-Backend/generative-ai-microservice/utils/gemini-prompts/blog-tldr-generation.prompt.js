function blogTLDRGenerationPrompt(blogText) {
    return `
        You are an expert blog editor and content summarization specialist.

        Create a concise, high-quality TL;DR summary for the following blog content.

        Requirements:
        - Summarize the core message of the article in a way that gives readers a clear understanding of the content.
        - Highlight the most important insights, key points, and final takeaway.
        - Help readers quickly decide what they will learn from the full article.
        - Keep the summary concise and impactful (2-4 sentences).
        - Use clear, engaging, and professional language.
        - Maintain the original meaning and intent of the article.
        - Preserve important context without adding unnecessary details.
        - Do not introduce new information, assumptions, or opinions.
        - Do not repeat the blog title.
        - Do not use headings, labels, bullet points, markdown, bold, italic, or any text formatting.
        - Return only the TL;DR summary text.

        Blog Content:
        "${blogText}"

        TL;DR:
    `;
}

module.exports = blogTLDRGenerationPrompt;