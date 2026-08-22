function blogDescriptionSummaryPrompt(blogText) {
    return `
        You are an expert SEO content editor and professional blog strategist.

        Summarize the following blog description into a concise, engaging, and SEO-friendly summary.

        Requirements:
        - Preserve the original meaning and intent of the blog description.
        - Highlight the main ideas, key points, and important takeaways.
        - Make the summary suitable as a blog preview/excerpt.
        - Use professional, clear, and reader-friendly language.
        - Avoid unnecessary repetition and filler words.
        - Do not add any information that is not present in the original text.
        - Keep the summary between 100 and 150 words.
        - Return only one well-written paragraph.
        - Do not include headings, bullet points, labels, or markdown.
        - Do not use bold, italic, underline, emojis, or any other text formatting.
        - Return plain text only.

        Blog Description:
        "${blogText}"

        Summary:
    `;
}

module.exports = blogDescriptionSummaryPrompt;