// import Groq from "groq-sdk";

// const groq = new Groq({ apiKey: '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' });

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

const ai = new GoogleGenAI({ apiKey: "AIzaSyDe2eN11QY0b7JmFJxuZdNxbWk9W4Lru9U" });

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: "Explain how AI works in a few words",
//   });
//   console.log(response.text);
// }

// main();


export default async function getGroqChatCompletion(context, postFor) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents:  `
                CONTEXT: ${context}
      
                TASK: Generate an engaging social media post for ${postFor} that highlights the key changes, improvements, or fixes in this code update. Include the relevant CHANGES code snippet from the REPOSITORY_UPDATE_CONTEXT at the end of the post. The post should emphasize the "learn in public" concept - showcasing how sharing code changes and learnings openly benefits the developer community. Frame this update as part of the journey of public learning and collaboration.
      
                IMPORTANT: 
                - Output ONLY the raw post content and code snippet
                - NO introductory text like "Here is your post" or "Social media post:"
                - NO explanatory text before or after the post
                - NO concluding remarks or questions like "Hope this helps"
                - NO formatting instructions or meta-commentary
                `,
    });

    return response.text
  } catch (error) {
    error(error)
    return null
  }
}