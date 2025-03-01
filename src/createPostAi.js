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
          content: `based on this context: ${context} only generate a ${postFor}`,
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
