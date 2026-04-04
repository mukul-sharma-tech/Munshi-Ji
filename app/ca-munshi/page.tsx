"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Phone, PhoneOff, Loader2, Volume2, MessageSquareText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CAMunshiPage() {
  const [isCalling, setIsCalling] = useState(false);
  const [status, setStatus] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Start Voice Calling
  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsCalling(true);
      setStatus("listening");
      setResponse("CA Munshi is listening...");

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        await processVoice(audioBlob);
      };

      recorder.start();

      // Auto-stop recording after 5 seconds for simulation (real version would use VAD)
      setTimeout(() => {
        if (recorder.state === "recording") {
          recorder.stop();
          stream.getTracks().forEach(track => track.stop());
        }
      }, 5000);

    } catch (err: any) {
      setError("Microphone access denied. Please check your settings.");
      setIsCalling(false);
    }
  };

  const processVoice = async (blob: Blob) => {
    setStatus("thinking");
    setResponse("Transcribing your request...");

    const formData = new FormData();
    formData.append("file", blob, "audio.webm");

    try {
      // 1. Transcribe
      const transcribeRes = await fetch("/api/transcribe", { method: "POST", body: formData });
      const { text, error: tErr } = await transcribeRes.json();
      if (tErr) throw new Error(tErr);
      setTranscript(text);

      // 2. Chat AI (Get Munshi's financial response)
      setResponse("Munshi is formulating advice...");
      const chatRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: text }],
          isVoice: true
        }),
      });
      const chatData = await chatRes.json();
      setResponse(chatData.content);

      // 3. Generate Voice
      setStatus("speaking");
      const voiceRes = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: chatData.content }),
      });
      const audioBlob = await voiceRes.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        audioRef.current.onended = () => {
          setStatus("listening");
          startCall(); // Start listening again
        };
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setIsCalling(false);
      setStatus("idle");
    }
  };

  const stopCall = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setIsCalling(false);
    setStatus("idle");
    setTranscript("");
    setResponse("");
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-4 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Premium Voice Consultation</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">CA Munshi Voice Call</h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Connect with our Senior Financial Advisor for real-time voice guidance on taxes, savings, and investments.
        </p>
      </div>

      <audio ref={audioRef} hidden />

      {/* Main Calling Interface */}
      <Card className="w-full max-w-md overflow-hidden bg-slate-50/50 dark:bg-slate-900/20 border-border/80 relative">
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border border-slate-100 dark:border-slate-800">
            <div className={cn("w-1.5 h-1.5 rounded-full", isCalling ? "bg-emerald-500 animate-pulse" : "bg-slate-300")} />
            <span className="text-[10px] font-bold text-slate-500 uppercase">{status}</span>
          </div>
        </div>

        <CardContent className="p-12 flex flex-col items-center space-y-10">
          {/* Avatar/Visualizer Area */}
          <div className="relative">
            <AnimatePresence>
              {isCalling && (
                <>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0.15 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-primary rounded-full"
                  />
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 2, opacity: 0.1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                    className="absolute inset-0 bg-primary rounded-full"
                  />
                </>
              )}
            </AnimatePresence>

            <div className={cn(
              "w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-500 relative z-10",
              isCalling ? "border-primary bg-primary/10 shadow-lg shadow-primary/20" : "border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900"
            )}>
              {status === "speaking" ? (
                <Volume2 size={48} className="text-primary animate-bounce" />
              ) : status === "thinking" ? (
                <Loader2 size={48} className="text-primary animate-spin" />
              ) : (
                <Mic size={48} className={cn("transition-colors", isCalling ? "text-primary" : "text-slate-400")} />
              )}
            </div>
          </div>

          {/* Transcript/Response Area */}
          <div className="w-full text-center min-h-[80px] space-y-3">
            <AnimatePresence mode="wait">
              {transcript && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-muted-foreground italic flex items-center justify-center gap-2"
                >
                  <MessageSquareText size={12} /> "{transcript}"
                </motion.div>
              )}
            </AnimatePresence>
            <p className="text-sm font-semibold text-foreground line-clamp-3 leading-relaxed">
              {response || (isCalling ? "CA Munshi is ready..." : "Click below to start a consultation")}
            </p>
          </div>

          {/* Call Controls */}
          <div className="flex gap-4 pt-4">
            {!isCalling ? (
              <Button
                onClick={startCall}
                size="lg"
                className="h-14 w-14 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 group"
              >
                <Phone size={24} className="group-hover:animate-shake" />
              </Button>
            ) : (
              <Button
                onClick={stopCall}
                size="lg"
                className="h-14 w-14 rounded-full bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-500/20"
              >
                <PhoneOff size={24} />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>


      {error && (
        <p className="text-xs text-rose-600 font-medium bg-rose-50/50 dark:bg-rose-950/20 px-3 py-1 rounded">
          {error}
        </p>
      )}
    </div>
  );
}
