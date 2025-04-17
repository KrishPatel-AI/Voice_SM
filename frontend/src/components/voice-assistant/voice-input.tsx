import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, StopCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  disabled?: boolean;
}

export function VoiceInput({
  onTranscript,
  disabled = false,
}: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    if (
      (typeof window !== "undefined" && "SpeechRecognition" in window) ||
      "webkitSpeechRecognition" in window
    ) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      let finalTranscript = "";

      recognition.onresult = (event) => {
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript.trim()) {
          recognition.stop();
          onTranscript(finalTranscript);
          finalTranscript = "";
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [onTranscript]);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error starting speech recognition:", error);
      }
    }
  };

  const isSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  if (!isSupported) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="h-[60px] w-[60px] rounded-full bg-muted/20"
        disabled={true}
      >
        <MicOff className="h-6 w-6 text-muted-foreground" />
        <span className="sr-only">Voice input not supported</span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "h-[50px] w-[50px] rounded-full transition-all duration-200",
        isListening
          ? "bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600 dark:bg-red-900/30 dark:text-red-400"
          : "bg-primary/10 text-primary hover:bg-primary/20",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={toggleListening}
      disabled={disabled}
    >
      {isListening ? (
        <StopCircle className="h-6 w-6 animate-pulse" />
      ) : (
        <Mic className="h-6 w-6" />
      )}
      <span className="sr-only">
        {isListening ? "Stop listening" : "Start voice input"}
      </span>
    </Button>
  );
}
