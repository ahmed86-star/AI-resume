import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { content, section } = req.body;
  
  try {
    const completion = await openai.chat.completions.create({
      messages: [{
        role: "system",
        content: `As a professional resume builder, provide 3 concise suggestions in JSON format: 
          { "suggestions": ["suggestion1", "suggestion2", "suggestion3"] }
          Section: ${section}
          Content: ${content}`
      }],
      model: "gpt-4-turbo",
      response_format: { type: "json_object" }
    });

    const { suggestions } = JSON.parse(completion.choices[0].message.content);
    res.status(200).json({ suggestions });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'Failed to generate suggestions' });
  }
} 