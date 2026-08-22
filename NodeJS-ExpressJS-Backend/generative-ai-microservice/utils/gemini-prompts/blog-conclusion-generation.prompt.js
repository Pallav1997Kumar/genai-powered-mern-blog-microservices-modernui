function blogConclusionGenerationPrompt(blogText) {
    return `
        You are an expert blog writer, SEO content strategist, and editorial specialist.

        Write a compelling conclusion for the following blog content.

        Requirements:
        - Summarize the core message, key insights, and overall value of the article.
        - Provide a clear sense of closure by connecting the main ideas discussed throughout the blog.
        - Reinforce why the topic matters to readers.
        - Create a memorable ending that encourages readers to apply the knowledge or consider the next step when relevant.
        - Maintain the original tone, style, and intent of the blog.
        - Do not introduce new concepts, topics, statistics, examples, or information not mentioned in the article.
        - Avoid repeating the introduction or copying sentences from the blog.
        - Keep the conclusion concise and impactful (1-3 short paragraphs).
        - Use professional, natural, and reader-focused language.
        - Do not use headings, bullet points, markdown, bold, italic, or any text formatting.
        - Return only the conclusion text.

        Blog Content:
        "${blogText}"

        Conclusion:
    `;
}

module.exports = blogConclusionGenerationPrompt;