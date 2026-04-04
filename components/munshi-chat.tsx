"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Loader2, Minimize2, Maximize2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string };

export function MunshiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Namaste! I am Munshi. How can I help with your money work today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      if (data.error) {
        setMessages((prev) => [...prev, { role: "assistant", content: `System: ${data.error}` }]);
      } else {
        setMessages((prev) => [...prev, data]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Munshi cannot reach the server. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      {isOpen && (
        <Card className="w-[320px] sm:w-[380px] h-[500px] shadow-2xl border-slate-200 dark:border-slate-800 flex flex-col pointer-events-auto bg-white/95 dark:bg-slate-950/95 backdrop-blur-md animate-tw-fade-in-up duration-300">
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <Bot size={18} className="text-primary" />
              <div>
                <CardTitle className="text-sm font-bold">Munshi AI</CardTitle>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-muted-foreground font-semibold">Online & Ready</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon-sm" onClick={() => setIsOpen(false)} className="hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full h-8 w-8">
              <X size={16} />
            </Button>
          </CardHeader>
          
          <CardContent 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth min-h-0"
          >
            {messages.map((m, i) => (
              <div key={i} className={cn("flex w-full", m.role === "user" ? "justify-end" : "justify-start")}>
                <div 
                  className={cn(
                    "max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed",
                    m.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-slate-100 dark:bg-slate-900 text-foreground border border-slate-200 dark:border-slate-800 rounded-tl-none"
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-900 px-3 py-2 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1 items-center">
                    <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="p-3 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-900">
            <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
              <Input 
                placeholder="Ask Munshi anything..." 
                className="h-9 text-xs focus-visible:ring-1 border-slate-200 dark:border-slate-800"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" size="icon-sm" className="shrink-0 h-9 w-9" disabled={isLoading}>
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
      
      <Button 
        size="icon" 
        onClick={() => setIsOpen(!isOpen)} 
        className={cn(
          "w-12 h-12 rounded-full shadow-lg pointer-events-auto transition-all duration-300",
          isOpen ? "bg-slate-950 hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 rotate-90" : "bg-primary hover:bg-primary/90"
        )}
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </Button>
    </div>
  );
}
