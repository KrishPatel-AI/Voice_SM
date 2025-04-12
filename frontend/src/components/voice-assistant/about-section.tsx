import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Database, Sparkles, Volume2 } from "lucide-react";

export function AboutSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          About Voice Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <div className="mt-0.5  p-1.5 rounded-full">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">AI-Powered Insights</h3>
            <p className="text-sm text-muted-foreground">
              Get access to AI-generated analysis and predictions based on
              real-time market data and trends.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="mt-0.5  p-1.5 rounded-full">
            <Volume2 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Natural Language</h3>
            <p className="text-sm text-muted-foreground">
              Ask questions using everyday language. No need for specific
              commands or technical terminology.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="mt-0.5 p-1.5 rounded-full">
            <Database className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Comprehensive Data</h3>
            <p className="text-sm text-muted-foreground">
              Access information on thousands of stocks, market indices,
              economic indicators, and financial news.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
