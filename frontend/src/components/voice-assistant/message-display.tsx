import { TranscriptDisplay } from "./transcript-display";
import { ResponseDisplay } from "./response-display";
import { EmptyState } from "./empty-state";

interface MessageProps {
  transcript: string;
  response: string;
}

export function MessageDisplay({ transcript, response }: MessageProps) {
  return (
    <div className="w-full max-w-3xl space-y-4">
      <TranscriptDisplay transcript={transcript} />
      <ResponseDisplay response={response} />

      {!transcript && !response && <EmptyState />}
    </div>
  );
}
