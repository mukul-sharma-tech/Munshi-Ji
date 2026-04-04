import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "ELEVENLABS_API_KEY is not configured" }, { status: 500 });
    }

    const elevenlabs = new ElevenLabsClient({ apiKey });

    // Voice ID provided by user: nlyULslzTRhqlyv46oPj
    // "George" or custom voice
    const audioStream = await elevenlabs.textToSpeech.convert(
      "JBFqnCBsd6RMkjVDRZzb",
      {
        text: text,
        modelId: "eleven_multilingual_v2",
        outputFormat: "mp3_44100_128",
      }
    );

    // Convert stream to Buffer
    const chunks = [];
    for await (const chunk of audioStream as any) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    return new Response(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error: any) {
    console.error("ElevenLabs error:", error);
    return NextResponse.json({ error: "Failed to generate voice" }, { status: 500 });
  }
}
