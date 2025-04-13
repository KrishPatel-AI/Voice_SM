
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon } from "lucide-react";
import { VoiceInput } from "./voice-input";

interface ChatInputProps {
  onSendMessage: (text: string) => Promise<void>;
  disabled: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [inputText, setInputText] = useState("");

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    await onSendMessage(inputText);
    setInputText("");
  };

  return (
    <div className="border-t p-4 bg-background">
      <div className="flex items-end gap-2 max-w-3xl mx-auto">
        <div className="flex-1 relative">
          <Textarea
            placeholder="Type your message here..."
            className="min-h-[60px] resize-none pr-10 py-3"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={disabled}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 bottom-2"
            onClick={handleSendMessage}
            disabled={!inputText.trim() || disabled}
          >
            <SendIcon className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
        <div className="flex-shrink-0">
          <VoiceInput onTranscript={onSendMessage} disabled={disabled} />
        </div>
      </div>
    </div>
  );
}