import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function summarizeProducts(products) {
  const summaries = [];

  for (const product of products) {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Summarize this product in 1–2 simple sentences:\n${product.name} - ${product.description}`
        }
      ]
    });

    const summary = response.choices[0].message.content;

    console.log(`${product.name} : ${summary}\n`);

    summaries.push(summary);
  }

  return summaries;
}
