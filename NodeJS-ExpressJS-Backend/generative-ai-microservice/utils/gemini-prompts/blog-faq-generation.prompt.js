function blogFAQGenerationPrompt(blogText) {
    return `
        You are an expert SEO content strategist, search intent analyst, and FAQ writer.

        Generate high-quality frequently asked questions (FAQs) and answers based on the following blog content.

        Requirements:
         - Create 5-8 relevant FAQs that directly relate to the article topic.
        - Identify questions that real readers are likely to search for or ask.
        - Focus on common doubts, concerns, and informational needs related to the content.
        - Write answers that are accurate, concise, and helpful.
        - Keep answers easy to understand while providing enough detail to satisfy the reader.
        - Use natural language and conversational wording that matches real search queries.
        - Optimize questions for SEO and user search intent without keyword stuffing.
        - Maintain the context and meaning of the original blog.
        - Include only information that is supported by the blog content.
        - Do not add assumptions, opinions, or unrelated information.
        - Do not mention AI, content generation, or the writing process.
        - Avoid repeating similar questions.
        - Return the FAQs as a JSON array of objects.
        - Each object must contain exactly two properties: "question" and "answer".
        - Do not use markdown.
        - Do not use code fences.
        - Return only valid JSON.

        Example format:
        [
            {
                "question": "What is Chandrayaan-3?",
                "answer": "Chandrayaan-3 is a follow-on mission to Chandrayaan-2 designed to demonstrate safe lunar landing and rover operations."
            },
            {
                "question": "What are the main components of Chandrayaan-3?",
                "answer": "The mission consists of a Lander module, Propulsion module, and Rover."
            }
        ]


        Blog Content:
        "${blogText}"

        FAQs:
    `;
}

module.exports = blogFAQGenerationPrompt;