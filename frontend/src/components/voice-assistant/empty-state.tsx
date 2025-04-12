import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function EmptyState() {
  return (
    <Alert variant="default" className="bg-muted/30 border-muted">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>No conversation yet</AlertTitle>
      <AlertDescription>
        <p>
          Tap the microphone and ask about stocks, market trends, or financial
          advice.
        </p>
        <p className="text-sm mt-2 text-muted-foreground">
          Try saying How is the market performing today?
        </p>
      </AlertDescription>
    </Alert>
  );
}
