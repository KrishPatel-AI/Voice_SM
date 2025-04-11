import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketIndex {
  name: string;
  value: number;
  change: number;
  percentChange: number;
}

export function MarketSummary() {
  const marketIndexes: MarketIndex[] = [
    {
      name: "S&P 500",
      value: 5123.42,
      change: 15.27,
      percentChange: 0.3,
    },
    {
      name: "Nasdaq",
      value: 16108.14,
      change: -42.45,
      percentChange: -0.26,
    },
    {
      name: "Dow Jones",
      value: 38672.76,
      change: 125.69,
      percentChange: 0.33,
    },
    {
      name: "Russell 2000",
      value: 2026.41,
      change: -8.93,
      percentChange: -0.44,
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <BarChart2 className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg font-medium">Market Summary</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {marketIndexes.map((index) => (
            <div key={index.name} className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">
                {index.name}
              </span>
              <span className="text-lg font-medium">
                {index.value.toLocaleString()}
              </span>
              <div className="flex items-center">
                {index.change > 0 ? (
                  <ArrowUp className="h-4 w-4 text-stock-up" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-stock-down" />
                )}
                <span
                  className={cn(
                    "ml-1 text-sm",
                    index.change > 0 ? "text-stock-up" : "text-stock-down"
                  )}
                >
                  {index.change > 0 ? "+" : ""}
                  {index.change.toFixed(2)} ({index.change > 0 ? "+" : ""}
                  {index.percentChange.toFixed(2)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
