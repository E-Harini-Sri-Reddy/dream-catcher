import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function getDreamInterpretation(dreamText) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a dream interpreter. Provide insightful, concise, and empathetic dream interpretations. Focus on symbolism and possible meanings rather than claiming certainty.",
        },
        {
          role: "user",
          content: dreamText,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return (
      completion.choices?.[0]?.message?.content ||
      "Unable to generate an interpretation."
    );
  } catch (error) {
    console.error("Groq API Error:", error);
    throw error;
  }
}