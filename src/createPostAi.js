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


import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GoogleGenAI_apiKey });



export default async function getChatCompletion(context, postFor) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents:  `
                ${context}
      
                TASK:
                  You are a technical content generator helping developers share code learnings publicly.

                  Given the CHANGES (Git diff and commit message), generate a platform-specific social media post that does the following:

                  1. Frames the update as part of the developer's public learning journey.
                  2. Highlights the key fix, improvement, or refactor using clear, concise language.
                  3. Generates an engaging ${postFor === 'tweet' ? 'tweet (max 280 characters) with relevant emojis and hashtags' : 'LinkedIn post with bullet points, emojis, and professional hashtags'}.
                  4. Includes a single well-formatted code snippet at the end showing the "before" and "after" of the key change.
                  5. The code snippet must be:
                    - Compact and visually clear.
                    - Have inline comments explaining the changes.
                    - No horizontal or vertical scroll needed.
                    - Easy to paste into a social post as-is.

                  6. Reference for the code snippet structure: 
                    { 
                        // ✅ Refactored postRef for precise code block targeting

                        // Before: postRef on the full post container
                        <div
                          onClick={() => setIsEditing(true)}
                          className="cursor-pointer h-full break-words"
                          ref={postRef} // ❌ Too broad
                        >
                          <ReactMarkdown components={{ ... }} />
                        </div>

                        // After: postRef moved directly to the code block wrapper
                        <ReactMarkdown
                          components={{
                            code({ children, ...props }) {
                              return (
                                <div className="w-full" ref={postRef}> {/* ✅ Scoped & precise */}
                                  <code className="bg-zinc-700 text-white px-1 py-1 my-1 rounded text-wrap" {...props}>
                                    {children}
                                  </code>
                                </div>
                              );
                            },
                          }}
                        />
                    }
                  
                  - generate the snippet like this

                  IMPORTANT:
                  - Do NOT include any introductory or concluding remarks.
                  - Do NOT explain what you're generating.
                  - Output ONLY the final social media post content followed directly by the code snippet.
                  - The code snippet must come **at the end** of the post, **after all hashtags**.

                  CHANGES:
                  Include commit message, changed lines, and relevant diff context.
                `,
    });

    return response.text
  } catch (error) {
    error(error)
    return null
  }
}