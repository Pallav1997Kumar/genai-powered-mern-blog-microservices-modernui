function blogTitleSuggestionPrompt(blogText) {
    return `
        You are an expert SEO blog title strategist.

        Generate 5 unique, engaging, and SEO-friendly blog titles based on the following blog description.

        Requirements:
        - Titles must accurately represent the content.
        - Make them attractive and clickable.
        - Use relevant keywords naturally.
        - Avoid misleading clickbait.
        - Keep titles professional and concise.
        - Each title should have a different approach.
        - Do not use bold, italic, emojis, or any other text formatting.
        - Return only the titles.
        - Do not include explanations, descriptions, or additional text.

        Blog Description:
        "${blogText}"

        Expected format:
        [
        "Title 1",
        "Title 2",
        "Title 3",
        "Title 4",
        "Title 5"
        ]

    `;
}

module.exports = blogTitleSuggestionPrompt;