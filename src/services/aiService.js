import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

if (!apiKey) {
  console.warn('VITE_GEMINI_API_KEY is not set. AI features will not work.');
}

const genAI = new GoogleGenerativeAI(apiKey);

const SYSTEM_PROMPT =
  'You are Storra AI, a friendly and knowledgeable study assistant for students on the Storra education platform. ' +
  'Keep answers clear, concise, and age-appropriate. Use markdown formatting when helpful. ' +
  'If you are unsure about something, say so honestly.';

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
  systemInstruction: SYSTEM_PROMPT,
});

/**
 * Async generator that streams chat responses chunk-by-chunk.
 * `history` is the FULL history including the user message just added.
 * We strip the last user message and send it separately via sendMessageStream.
 * @param {Array<{role:string, parts:Array<{text:string}>}>} fullHistory
 * @param {string} message
 */
export async function* chatStream(fullHistory, message) {
  // Gemini expects history to NOT include the current user message (it goes via sendMessage).
  // So we pass all messages except the last one (which is the user message we just added).
  const history = fullHistory.slice(0, -1);

  const chat = model.startChat({ history });
  const result = await chat.sendMessageStream(message);

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) yield text;
  }
}

/**
 * Returns a markdown summary of a lesson.
 * @param {string} title
 * @param {string} content
 * @returns {Promise<string>}
 */
export async function summarizeLesson(title, content) {
  const prompt =
    `Summarize the following lesson for a student. Include:\n` +
    `- A brief overview (2-3 sentences)\n` +
    `- Key points as a bulleted list\n` +
    `- One takeaway or study tip\n\n` +
    `**Lesson title:** ${title}\n\n` +
    `**Lesson content:**\n${content}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

/**
 * Returns a short explanation for why a quiz answer is wrong.
 * @param {string} question
 * @param {string} wrongAnswer
 * @param {string} correctAnswer
 * @returns {Promise<string>}
 */
export async function getQuizFeedback(question, wrongAnswer, correctAnswer) {
  const prompt =
    `A student answered a quiz question incorrectly. Explain in 2-3 sentences why the correct answer is right ` +
    `and why their answer was wrong. Be encouraging.\n\n` +
    `**Question:** ${question}\n` +
    `**Student's answer:** ${wrongAnswer}\n` +
    `**Correct answer:** ${correctAnswer}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
