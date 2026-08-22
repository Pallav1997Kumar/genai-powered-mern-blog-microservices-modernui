function blogKeyTakeawaysGenerationPrompt(blogText) {
    return `
        You are an expert content analyst, SEO editor, and blog strategist.

        Extract the most valuable key takeaways from the following blog content.

        Requirements:
        - Identify the main insights, important points, and actionable lessons from the article.
        - Generate 5-8 concise and meaningful key takeaways.
        - Keep each takeaway clear, specific, and easy for readers to understand.
        - Focus on the information readers should remember after reading the article.
        - Highlight practical value and important conclusions from the content.
        - Maintain the original meaning and context of the blog.
        - Include only information explicitly available in the original content.
        - Do not add assumptions, opinions, examples, or new ideas.
        - Do not repeat the same point in different wording.
        - Do not include an introduction, explanation, or conclusion.
        - Return the key takeaways as a JSON array of strings.
        - Do not use markdown.
        - Do not use bullet points.
        - Do not include code fences.
        - Return only valid JSON.

        Example format:
        [
        "First key takeaway.",
        "Second key takeaway.",
        "Third key takeaway."
        ]


        Blog Content:
        "${blogText}"

        Key Takeaways:
    `;
}

module.exports = blogKeyTakeawaysGenerationPrompt;