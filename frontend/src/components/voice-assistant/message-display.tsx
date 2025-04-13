import { TranscriptDisplay } from "./transcript-display";
import { ResponseDisplay } from "./response-display";

interface Message {
  type: 'user' | 'assistant';
  content: string;
  stockData?: any;
  timestamp: Date;
}

interface MessageDisplayProps {
  messages: Message[];
}

export function MessageDisplay({ messages }: MessageDisplayProps) {
  return (
    <div className="w-full space-y-6">
      {messages.map((message, index) => (
        <div key={index} className="space-y-4">
          {message.type === 'user' ? (
            <TranscriptDisplay transcript={message.content} />
          ) : (
            <ResponseDisplay 
              response={message.content} 
              stockData={message.stockData}
            />
          )}
        </div>
      ))}
    </div>
  );
}