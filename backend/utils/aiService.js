const axios = require("axios");
const OpenAI = require("openai");

const openrouterClient = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey:"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",
  defaultHeaders: {
    "HTTP-Referer": "your-app-name-or-domain.com",
    "X-Title": "Product Recommendation System",
  },
});

async function getRecommendations(salesData, weather) {
  const prompt = `
  Given this sales data:
  ${JSON.stringify(salesData)} 
  and the current weather: ${JSON.stringify(weather)},
  suggest which products should be promoted and any dynamic pricing ideas.
  `;

  try {
    const completion = await openrouterClient.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 500,
    });

    console.log(
      "Full completion response:",
      JSON.stringify(completion, null, 2)
    );

    if (completion.choices && completion.choices.length > 0) {
      return completion.choices[0].message.content;
    } else {
      throw new Error("No choices returned in completion response.");
    }
  } catch (error) {
    console.error("Error fetching recommendation:", error.message);
    throw error;
  }
}

module.exports = { getRecommendations };
