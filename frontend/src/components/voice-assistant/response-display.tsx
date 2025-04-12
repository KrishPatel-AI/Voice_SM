import { Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"; // Make sure you have this utility

interface ResponseDisplayProps {
  response: string;
}

export function ResponseDisplay({ response }: ResponseDisplayProps) {
  if (!response) return null;

  // Check if the response contains any stock data patterns
  const hasStockData = response.match(/\+\d+\.\d+%|\-\d+\.\d+%/g);

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Bot className="h-4 w-4" />
        <span>Assistant response</span>
        <Badge
          variant="outline"
          className={cn(
            "ml-auto border-primary/20",
            hasStockData 
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" 
              : "bg-primary/10 text-primary"
          )}
        >
          {hasStockData ? "Market Data" : "Response"}
        </Badge>
      </div>
      <div className="rounded-lg bg-card p-4 shadow-sm border">
        <p className="whitespace-pre-line">{response}</p>
      </div>
    </div>
  );
}