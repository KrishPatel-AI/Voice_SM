"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  ArrowDownRight,
  ArrowUpRight,
  Zap,
  LineChart,
  DollarSign,
  BarChart3,
  Loader2,
} from "lucide-react";

interface Props {
  symbols: string[];
}

interface SummaryData {
  symbol: string;
  currentPrice?: number;
  change?: {
    value: number;
    percent: number;
  };
  marketCap?: number;
  peRatio?: number;
  volume?: number;
  performance?: "up" | "down" | "neutral";
}

export function PerformanceSummary({ symbols }: Props) {
  const [summaryData, setSummaryData] = useState<SummaryData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (symbols.length > 0) {
      setLoading(true);

      Promise.all([
        fetch(
          `http://localhost:5000/api/compare/history?symbols=${symbols.join(
            "&symbols="
          )}&period=5d`
        ),
        fetch(
          `http://localhost:5000/api/compare/metrics?symbols=${symbols.join(
            "&symbols="
          )}`
        ),
      ])
        .then(([historyRes, metricsRes]) =>
          Promise.all([historyRes.json(), metricsRes.json()])
        )
        .then(([historyData, metricsData]) => {
          const summaries: SummaryData[] = symbols.map((symbol) => {
            const stockHistory = historyData[symbol] || [];
            const stockMetrics = metricsData[symbol] || {};

            const sortedHistory = [...stockHistory].sort(
              (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
            );

            const latestDay = sortedHistory[0];
            const previousDay = sortedHistory[1];

            let change = { value: 0, percent: 0 };
            if (latestDay && previousDay) {
              const changeValue = latestDay.Close - previousDay.Close;
              const changePercent = (changeValue / previousDay.Close) * 100;
              change = {
                value: changeValue,
                percent: changePercent,
              };
            }

            let performance: "up" | "down" | "neutral" = "neutral";
            if (sortedHistory.length >= 3) {
              const recentPrices = sortedHistory
                .slice(0, 3)
                .map((day) => day.Close);
              const upDays = recentPrices
                .slice(0, -1)
                .filter((price, i) => price > recentPrices[i + 1]).length;
              performance =
                upDays >= 2 ? "up" : upDays <= 0 ? "down" : "neutral";
            }

            return {
              symbol,
              currentPrice: latestDay?.Close,
              change,
              marketCap: stockMetrics.marketCap,
              peRatio: stockMetrics.peRatio,
              volume: latestDay?.Volume,
              performance,
            };
          });

          setSummaryData(summaries);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching summary data:", err);
          setLoading(false);
        });
    }
  }, [symbols]);

  if (symbols.length === 0) {
    return null;
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
            <p>Loading summary data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {summaryData.map((data) => {
        const isPositive = (data.change?.percent || 0) > 0;
        const isNegative = (data.change?.percent || 0) < 0;
        const colorClass = isPositive
          ? "text-green-600"
          : isNegative
            ? "text-red-600"
            : "text-gray-600";

        return (
          <Card key={data.symbol} className={`overflow-hidden border-2 `}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">{data.symbol}</CardTitle>
                <Badge
                  variant={
                    data.performance === "neutral" ? "outline" : "default"
                  }
                  className={`
                    ${data.performance === "up"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : ""
                    } 
                    ${data.performance === "down"
                      ? "bg-red-100 text-red-800 hover:bg-red-100"
                      : ""
                    }
                  `}
                >
                  {data.performance === "up" && (
                    <TrendingUp className="mr-1 h-3 w-3" />
                  )}
                  {data.performance === "down" && (
                    <TrendingDown className="mr-1 h-3 w-3" />
                  )}
                  {data.performance === "up" && "Uptrend"}
                  {data.performance === "down" && "Downtrend"}
                  {data.performance === "neutral" && "Neutral"}
                </Badge>
              </div>
              <CardDescription>
                Last updated: {new Date().toLocaleDateString()}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Current Price
                  </div>
                  <div className="text-2xl font-bold">
                    ${data.currentPrice?.toFixed(2) || "N/A"}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <LineChart className="h-4 w-4 mr-1" />
                    Daily Change
                  </div>
                  <div
                    className={`text-lg font-semibold flex items-center ${colorClass}`}
                  >
                    {isPositive && <ArrowUpRight className="h-5 w-5 mr-1" />}
                    {isNegative && <ArrowDownRight className="h-5 w-5 mr-1" />}
                    {data.change ? (
                      <>
                        {data.change.percent.toFixed(2)}%
                        <span className="text-sm ml-1">
                          (${Math.abs(data.change.value).toFixed(2)})
                        </span>
                      </>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Market Cap
                  </div>
                  <div className="font-medium">
                    {data.marketCap
                      ? `$${(data.marketCap / 1000000000).toFixed(2)}B`
                      : "N/A"}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Zap className="h-4 w-4 mr-1" />
                    P/E Ratio
                  </div>
                  <div className="font-medium">
                    {data.peRatio ? data.peRatio.toFixed(2) : "N/A"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
