import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey || !file) {
      return NextResponse.json({ error: "Missing key or file" }, { status: 400 });
    }

    const groq = new Groq({ apiKey });
    
    // Transcribe user speech
    const transcription = await groq.audio.transcriptions.create({
      file,
      model: "whisper-large-v3",
      language: "en",
    });

    return NextResponse.json({ text: transcription.text });
  } catch (error: any) {
    console.error("Transcription error:", error);
    return NextResponse.json({ error: "Failed to transcribe speech" }, { status: 500 });
  }
}
