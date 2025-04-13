import { Bot, TrendingUp, TrendingDown, LineChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ResponseDisplayProps {
  response: string;
  stockData?: any;
}

export function ResponseDisplay({ response, stockData }: ResponseDisplayProps) {
  if (!response) return null;

  // Check if the response contains any stock data patterns
  const hasStockData = response.match(/\+\d+\.\d+%|\-\d+\.\d+%/g) || stockData;
  
  const isPositive = stockData && stockData.change_percent > 0;

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
              ? isPositive 
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
              : "bg-primary/10 text-primary"
          )}
        >
          {hasStockData ? "Market Data" : "Response"}
        </Badge>
      </div>
      
      <div className="rounded-lg bg-card p-4 shadow-sm border">
        {/* Stock data visualization, if available */}
        {stockData && (
          <div className="mb-4 border-b pb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{stockData.company_name} ({stockData.ticker})</h3>
              <div className={cn(
                "flex items-center text-sm font-medium",
                isPositive ? "text-emerald-600" : "text-red-600"
              )}>
                {isPositive ? (
                  <TrendingUp className="mr-1 h-4 w-4" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4" />
                )}
                ${stockData.current_price.toFixed(2)} 
                <span className="ml-1">
                  ({isPositive ? "+" : ""}{stockData.change_percent.toFixed(2)}%)
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div>
                <div className="text-muted-foreground">Open</div>
                <div>${stockData.open.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">High</div>
                <div>${stockData.high.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Low</div>
                <div>${stockData.low.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Volume</div>
                <div>{stockData.volume.toLocaleString()}</div>
              </div>
            </div>
            
            {/* Simple visualization of 5-day trend */}
            {stockData.trend && stockData.trend.length > 0 && (
              <div className="mt-3 flex flex-col">
                <div className="flex items-center text-sm text-muted-foreground">
                  <LineChart className="mr-1 h-3 w-3" />
                  <span>5-Day Trend</span>
                </div>
                <div className="flex items-end h-16 mt-2 gap-1">
                  {stockData.trend.map((price: number, idx: number) => {
                    const min = Math.min(...stockData.trend);
                    const max = Math.max(...stockData.trend);
                    const range = max - min;
                    const height = range === 0 ? 50 : ((price - min) / range) * 100;
                    
                    return (
                      <div 
                        key={idx} 
                        className="relative flex-1 group"
                      >
                        <div 
                          className={cn(
                            "w-full rounded-t",
                            price > stockData.trend[Math.max(0, idx-1)] 
                              ? "bg-emerald-500" 
                              : "bg-red-500"
                          )}
                          style={{ height: `${Math.max(10, height)}%` }}
                        />
                        <div className="invisible group-hover:visible absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
                          ${price.toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        
        <p className="whitespace-pre-line">{response}</p>
      </div>
    </div>
  );
}