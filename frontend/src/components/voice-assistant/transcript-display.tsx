import { Badge } from "@/components/ui/badge";
import { Mic } from "lucide-react";

interface TranscriptDisplayProps {
  transcript: string;
}

export function TranscriptDisplay({ transcript }: TranscriptDisplayProps) {
  if (!transcript) return null;

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Mic className="h-4 w-4" />
        <span>Your query</span>
        <Badge variant="outline" className="ml-auto">
          Transcript
        </Badge>
      </div>
      <div className="rounded-lg bg-muted/30 p-4">
        <p className="text-lg md:text-xl">{transcript}</p>
      </div>
    </div>
  );
}
