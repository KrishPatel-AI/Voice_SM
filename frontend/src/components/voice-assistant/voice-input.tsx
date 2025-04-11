"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, Send, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export function VoiceInput({ onTranscript, disabled }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [soundBars] = useState([1, 2, 3, 4, 5, 6]);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);

  // Placeholder suggestions for US stock market queries
  const placeholders = [
    "What are the top performing tech stocks today?",
    "How is the S&P 500 performing?",
    "Give me the latest on AAPL stock",
    "Which sector is performing best today?",
    "What's the current price of Tesla stock?"
  ];
  
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);

  // Rotate placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = placeholders.indexOf(currentPlaceholder);
      const nextIndex = (currentIndex + 1) % placeholders.length;
      setCurrentPlaceholder(placeholders[nextIndex]);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentPlaceholder, placeholders]);

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setVoiceSupported(false);
      setVoiceError("Speech recognition not supported in this browser");
      return;
    }

    // Initialize speech recognition
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join(' ');
      
      setTextInput(transcript);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setVoiceError(`Error: ${event.error}`);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      if (isListening) {
        recognitionRef.current.start();
      }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Make sure listening state is synced with recognition state
  useEffect(() => {
    // Update recognition state when isListening changes
    if (recognitionRef.current) {
      if (isListening) {
        try {
          recognitionRef.current.start();
        } catch (error) {
          // Already started, ignore
        }
      } else {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          // Already stopped, ignore
        }
      }
    }
  }, [isListening]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      // Submit the transcript when stopping
      if (textInput.trim()) {
        onTranscript(textInput);
      }
    } else {
      setTextInput('');
      setVoiceError(null);
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setVoiceError('Could not start voice recognition');
      }
    }
    
    setIsListening(!isListening);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      onTranscript(textInput);
      setTextInput("");
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4 md:p-6">
        <div className="flex flex-col space-y-4">
          {voiceError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{voiceError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleTextSubmit} className="flex gap-2">
            <Input
              placeholder={`Try: "${currentPlaceholder}"`}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="flex-1"
              disabled={disabled}
            />
            <Button
              type="submit"
              size="icon"
              disabled={disabled || !textInput.trim()}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>

          <div className="flex justify-center">
            <Button
              variant={isListening ? "destructive" : "default"}
              size="lg"
              className="rounded-full w-16 h-16 shadow-md relative"
              onClick={toggleListening}
              disabled={disabled || !voiceSupported}
            >
              {isListening ? (
                <>
                  <StopCircle className="h-8 w-8" />
                  <div className="absolute inset-0 rounded-full animate-pulse-ring opacity-75" />
                  <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 flex items-end h-5">
                    {soundBars.map((_, i) => (
                      <div
                        key={i}
                        className="sound-bar mx-px bg-primary"
                        style={{
                          width: '3px',
                          height: `${Math.random() * 12 + 3}px`,
                          animationDelay: `${i * 0.1}s`,
                          animation: 'soundbar-animation 0.5s infinite alternate'
                        }}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}