"use client";
import { useState, useEffect, useRef } from "react";
import { VoiceInput } from "./voice-input";
import { Badge } from "@/components/ui/badge";
import { Bot, Mic, AlertCircle, SendIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export function VoiceInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleTranscript = async (text: string) => {
    await processMessage(text);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    await processMessage(inputText);
    setInputText("");
  };

  const processMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/speech/text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from assistant");
      }

      const data = await response.json();

      // Add assistant response to chat
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error processing transcript:", err);
      setError("Failed to communicate with the assistant. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Enter key to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Health check to confirm backend connectivity
  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/health`);
        if (!response.ok) {
          setError("Backend service is currently unavailable");
        }
      } catch (err) {
        console.error("Backend health check failed:", err);
        setError("Cannot connect to backend service");
      }
    };

    checkBackendHealth();
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]  mx-auto   overflow-hidden">
      {/* Fixed Header */}
      <div className=" py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <span className="font-medium">
              Stock Market Assistant By VoiceSM
            </span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content - Scrollable Chat Area */}
      <div className="flex flex-col flex-1 overflow-hidden ">
        {error && (
          <div className="px-4 pt-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Scrollable Chat Content */}
        <div className="flex-1 overflow-y-auto p-4" ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Bot className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">
                Welcome to Stock Market Assistant
              </h3>
              <p className="text-muted-foreground max-w-md">
                Ask me anything about stocks, market trends, or financial data.
                Try: "How is Apple stock performing today?" or "What's the
                current price of Tesla?"
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className="w-full max-w-3xl mx-auto">
                  {message.role === "user" ? (
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Mic className="h-4 w-4" />
                        <span>Your query</span>
                        <Badge variant="outline" className="ml-auto">
                          Transcript
                        </Badge>
                      </div>
                      <div className="rounded-lg bg-muted/30 p-4">
                        <p className="text-lg">{message.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Bot className="h-4 w-4" />
                        <span>Assistant response</span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "ml-auto",
                            message.content.match(/\+\d+\.\d+%|\-\d+\.\d+%/g)
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                              : "bg-primary/10 text-primary"
                          )}
                        >
                          {message.content.match(/\+\d+\.\d+%|\-\d+\.\d+%/g)
                            ? "Market Data"
                            : "Response"}
                        </Badge>
                      </div>
                      <div className="rounded-lg bg-card p-4 shadow-sm border">
                        <p className="whitespace-pre-line">{message.content}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isProcessing && (
                <div className="flex items-center space-x-2 p-4 bg-muted/20 rounded-lg w-full max-w-3xl mx-auto">
                  <span className="text-sm text-muted-foreground animate-text-pulse">
                    Processing...
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Fixed Input Area at Bottom */}
        <div className=" px-30 bg-background py-4">
          <div className="flex items-end gap-4">
            <div className="flex-1 relative align-center gap-2">
              <Textarea
                placeholder="Type your message here..."
                className="min-h-[50px] resize-none "
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isProcessing}
              />
              <div>

                <Separator orientation="vertical" />
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 bottom-2"
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isProcessing}
              >
                <SendIcon className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
            <div className="flex-shrink-0">
              <VoiceInput
                onTranscript={handleTranscript}
                disabled={isProcessing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
