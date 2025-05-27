// import Groq from "groq-sdk";

// const groq = new Groq({ apiKey:  });

// export async function main() {
//   const chatCompletion = await getGroqChatCompletion();
//   // Print the completion returned by the LLM.
//   console.log(chatCompletion.choices[0]?.message?.content || "");
// }

// export default async function getGroqChatCompletion(context, postFor) {
//   try {
//     const content = await groq.chat.completions.create({
//       messages: [
//         {
//           role: "user",
//           content: `
//           ${context}

//           TASK: Generate an engaging social media post for ${postFor} that highlights the key changes, improvements, or fixes in this code update. Include the relevant CHANGES code snippet from the REPOSITORY_UPDATE_CONTEXT at the end of the post. The post should emphasize the "learn in public" concept - showcasing how sharing code changes and learnings openly benefits the developer community. Frame this update as part of the journey of public learning and collaboration.

//           IMPORTANT:
//           - Output ONLY the raw post content and code snippet
//           - NO introductory text like "Here is your post" or "Social media post:"
//           - NO explanatory text before or after the post
//           - NO concluding remarks or questions like "Hope this helps"
//           - NO formatting instructions or meta-commentary
//           `,
//     }],
//       model: "llama-3.3-70b-versatile",
//     });
//     return content.choices[0]?.message?.content || ""
//   } catch (error) {
//     error(error)
//     return null
//   }
// }

import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GoogleGenAI_apiKey });

export default async function getChatCompletion(context, postFor) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents:
        `
                ${context}
      
                TASK:
                  You're an expert technical content writer helping developers share their work online.

                  Using the CHANGES provided (Git diff and commit message), generate a social media post with the following format:

                  POST CONTENT:
                  1. Write a short, engaging summary of the update as part of a developer's public learning journey.
                  2. Highlight the core improvement or refactor.
                  3. Write a ${postFor === 'tweet' ? 'Twitter/X post (max 280 characters with relevant emojis and hashtags)' : 'LinkedIn post with bullet points, emojis, and professional hashtags'}.
                  4. End the post with a **single structured code snippet** showing the change clearly.

                  CODE SNIPPET INSTRUCTIONS:
                  - The snippet should show **Before** and **After** code.
                  - Use **inline comments** to explain the key improvement(s).
                  - The snippet should be:
                    - Language-agnostic (match the language from the diff automatically)
                    - Free of ` +
                          ` and ` -
                          ` diff symbols
                    - Clean, compact, and ready to paste
                    - Easy to read and understand in a social media post (no horizontal or vertical scrolling)
                  - Follow this structure exactly:

                  (triple backticks)[LANGUAGE]
                  // ✅ [Short title or improvement, e.g., "Improved loop efficiency"]

                  // Before: [describe what's wrong or suboptimal]
                  <original code block>

                  // After: [describe what's fixed or improved]
                  <improved code block>
                  (triple backticks end)

                  Example format:
                  (triple backticks)python
                  // ✅ Simplified loop with built-in sum()

                  // Before: Manual loop to add values
                  total = 0
                  for x in numbers:
                      total += x

                  // After: More Pythonic using built-in sum
                  total = sum(numbers)
                  (triple backticks end)

                  IMPORTANT:
                  - Do NOT output raw diffs.
                  - Do NOT explain the snippet.
                  - Do NOT include markdown headings like “Before:” or “After:” outside the snippet.
                  - Only include the social media post, then the code snippet.


                  OUTPUT FORMAT:
                  1. The final social post text
                  2. A single code snippet following the format above
                  `,
    });

    return response.text;
  } catch (error) {
    error(error);
    return null;
  }
}
