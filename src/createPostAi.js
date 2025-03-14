import Groq from "groq-sdk";

const groq = new Groq({ apiKey: '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' });

// export async function main() {
//   const chatCompletion = await getGroqChatCompletion();
//   // Print the completion returned by the LLM.
//   console.log(chatCompletion.choices[0]?.message?.content || "");
// }

export default async function getGroqChatCompletion(context, postFor) {
  try {
    const content = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `You are a content writer creating engaging and informative posts.  

          Based on the following context: ${context} 
          
          Write a compelling ${postFor} that naturally incorporates the commit URL, making it easy for readers to visit. Ensure the post flows well and encourages engagement.`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
    return content.choices[0]?.message?.content || ""
  } catch (error) {
    error(error)
    return null
  }
}
