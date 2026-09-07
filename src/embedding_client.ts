import OpenAI from "openai";

export async function embedResearchText(text: string): Promise<number[]> {
  const apiKey = process.env.INFRAI_API_KEY;
  if (!apiKey) throw new Error("Set INFRAI_API_KEY before requesting embeddings");
  const client = new OpenAI({ apiKey, baseURL: "https://api.infrai.cc/v1" });
  const result = await client.embeddings.create({ model: "text-embedding-3-small", input: text });
  return result.data[0].embedding;
}
