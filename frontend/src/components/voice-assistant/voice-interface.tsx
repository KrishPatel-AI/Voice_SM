"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageDisplay } from "./message-display";
import { VoiceInput } from "./voice-input";
import { Badge } from "@/components/ui/badge";
import { Bot, Mic, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export function VoiceInterface() {
  const [transcript, setTranscript] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranscript = async (text: string) => {
    if (!text.trim()) return;
    
    setTranscript(text);
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/speech/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from assistant');
      }

      const data = await response.json();
      setResponse(data.response);
    } catch (err) {
      console.error('Error processing transcript:', err);
      setError('Failed to communicate with the assistant. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Health check to confirm backend connectivity
  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/health`);
        if (!response.ok) {
          setError('Backend service is currently unavailable');
        }
      } catch (err) {
        console.error('Backend health check failed:', err);
        setError('Cannot connect to backend service');
      }
    };

    checkBackendHealth();
  }, []);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/20">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <span>US Stock Market Assistant</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-muted/50">
              <span className="flex items-center gap-1">
                <Mic className="h-3 w-3" />
                Voice Enabled
              </span>
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex flex-col items-center">
        <div className="w-full max-w-3xl space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <MessageDisplay transcript={transcript} response={response} />
          <div className="h-4" /> {/* Spacer */}
          <VoiceInput onTranscript={handleTranscript} disabled={isProcessing} />
        </div>
      </CardContent>
    </Card>
  );
}