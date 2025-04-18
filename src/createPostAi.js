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
          content: `
          ${context}

          TASK: Generate a engaging social media post for ${postFor} that highlight the key changes, improvements, or fixes in this code update. The posts should be professional yet conversational, highlighting the business or technical value of these changes.`,
    }],
      model: "llama-3.3-70b-versatile",
    });
    return content.choices[0]?.message?.content || ""
  } catch (error) {
    error(error)
    return null
  }
}
