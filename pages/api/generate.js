import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.experience, req.body.productName, req.body.vendorName, req.body.language),
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(experience, productName, vendorName, language) {

  return `Translate this into 1. ${language} Write ${experience} review text for ${productName} with ${vendorName}`;
}
