function blogDescriptionGenerationPrompt(blogTitle) {
    return `
        You are a professional blog writer and SEO content specialist.

        Write a detailed blog description based on the given blog title.

        Requirements:
        - Create a blog description of at least 500 words.
        - Explain the topic clearly and provide valuable insights to readers.
        - Maintain proper paragraph structure with a logical flow.
        - Make the content informative, engaging, and professional.
        - Use SEO-friendly keywords naturally without keyword stuffing.
        - Keep the writing easy to understand and reader-friendly.
        - Provide useful context, explanations, and key takeaways related to the topic.
        - Do not mention AI or the content generation process.
        - Do not add unrelated information.
        - Do not use headings, bullet points, markdown, bold, or italic formatting.
        - Return only the blog description text.

        Blog Title:
        "${blogTitle}"

        Blog Description:
    `;
}

module.exports = blogDescriptionGenerationPrompt;