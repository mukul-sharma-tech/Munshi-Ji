import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, isVoice } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });

    const systemPrompt = isVoice
      ? `You are 'Munshi', a wise financial assistant in a voice call. 
         BE EXTREMELY CONCISE. One or two short sentences only. 
         Speak naturally for a conversation. Avoid lists or long explanations. 
         Focus on the most important fact.`
      : `You are 'Munshi', a wise and professional financial assistant for MunshiJi. 
         Your goal is to help users understand their personal finance dashboard. 
         Keep your responses concise, utilitarian, and data-driven. 
         Use terms like 'Balance', 'Expense', and 'Income' as they appear in the UI. 
         Maintain a premium enterprise tone.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...messages,
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 500,
      stream: false, // Simple fetch for now, can be updated to stream
    });

    return NextResponse.json({
      role: "assistant",
      content: completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that.",
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Munshi is currently offline. Please check your connection." },
      { status: 500 }
    );
  }
}
