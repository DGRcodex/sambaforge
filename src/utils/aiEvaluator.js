import { GoogleGenerativeAI } from "@google/generative-ai";

export async function evaluateAnswer(question, idealAnswer, userAnswer, apiKey, lang) {
  if (!apiKey) {
    throw new Error("No API Key provided");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  // Usar gemini-1.5-flash para que sea rápido y barato
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const systemPrompt = `
You are Crockett Hopper, VP of Software Development at The N2 Company. You are evaluating a candidate's answer for an InDesign Automation Developer role (InDesign Server, ExtendScript, Node.js).
Your evaluation must be based strictly on these criteria:
1. BLUF Methodology (Bottom Line Up Front): Did the candidate state the root cause or main action in the very first sentence?
2. Specificity: Did the candidate mention specific code, properties (like story.overflows), or concrete steps, or were they vague?
3. Headless/Server Context: For code, did they avoid UI elements (alert, interaction) and ensure documents are closed properly in a finally block to avoid memory leaks?
4. UXP Async: If relevant, did they use async/await properly?

Respond in ${lang === 'es' ? 'Spanish' : 'English'}.
Be direct, professional, and act like a senior engineering leader. Don't be overly polite, be objective.
Format your response with the following sections (use markdown/bold text):
- Score: [0-10]/10
- Feedback: [Your direct feedback]
- BLUF Check: [Pass/Fail/Partial]
- Specificity Check: [Pass/Fail/Partial]
`;

  const userPrompt = `
Question: ${question}

Ideal Answer / Rubric:
${idealAnswer}

Candidate's Answer:
${userAnswer || "(No answer provided)"}

Evaluate the candidate's answer against the rubric.
`;

  try {
    const result = await model.generateContent([systemPrompt, userPrompt]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Evaluation failed:", error);
    throw new Error(lang === 'es' ? "Fallo al conectar con Gemini. Revisa tu API Key." : "Failed to connect to Gemini. Check your API Key.");
  }
}
