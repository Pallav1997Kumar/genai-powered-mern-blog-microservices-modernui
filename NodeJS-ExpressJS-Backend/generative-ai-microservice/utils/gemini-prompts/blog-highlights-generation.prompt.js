function blogHighlightsGenerationPrompt(blogText) {
    return `
        You are an expert content editor, SEO strategist, and blog optimization specialist.

        Extract the most valuable highlights from the following blog content.

        Requirements:
         - Identify the most important ideas, insights, benefits, solutions, and noteworthy information from the article.
        - Generate 5-8 concise highlights that capture the core value of the content.
        - Focus on points that would help readers quickly understand why the article is useful.
        - Prioritize unique perspectives, practical tips, key findings, important facts, and major conclusions.
        - Make each highlight clear, engaging, and easy to scan.
        - Keep each highlight brief (one or two sentences maximum).
        - Use professional, reader-friendly language.
        - Maintain the original meaning and context of the blog.
        - Include only information available in the original content.
        - Do not add assumptions, opinions, or new information.
        - Avoid repeating similar highlights.
        - Do not include an introduction, summary, conclusion, or extra explanation.
        - Return the highlights as a JSON array of strings.
        - Do not use markdown.
        - Do not use bullet points.
        - Do not use bold, italic, headings, or other formatting.
        - Return only valid JSON.

        Example format:
        [
        "First important highlight from the article.",
        "Second important highlight from the article.",
        "Third important highlight from the article."
        ]


        Blog Content:
        "${blogText}"

        Highlights:
    `;
}

module.exports = blogHighlightsGenerationPrompt;