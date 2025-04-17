"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Info, Loader2 } from "lucide-react";

interface Props {
  symbols: string[];
}

interface MetricInfo {
  label: string;
  key: string;
  description: string;
  format: (value: any) => string;
  indicator?: (value: any) => { color: string; label: string } | null;
  scale?: (values: number[]) => { min: number; max: number };
}

export function ComparisonMetrics({ symbols }: Props) {
  const [metricsData, setMetricsData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (symbols.length > 0) {
      setLoading(true);
      fetch(
        `http://localhost:5000/api/compare/metrics?symbols=${symbols.join(
          "&symbols="
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMetricsData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching metrics:", err);
          setLoading(false);
        });
    }
  }, [symbols]);

  const metrics: MetricInfo[] = [
    {
      label: "Market Cap",
      key: "marketCap",
      description:
        "The total value of all outstanding shares of a company. Calculated as share price × shares outstanding.",
      format: (value) =>
        value ? `$${(value / 1000000000).toFixed(2)}B` : "N/A",
      scale: (values) => ({ min: 0, max: Math.max(...values) * 1.1 }),
    },
    {
      label: "P/E Ratio",
      key: "peRatio",
      description:
        "Price-to-Earnings ratio measures a company's current share price relative to its per-share earnings. Lower values may indicate undervaluation.",
      format: (value) => (value ? value.toFixed(2) : "N/A"),
      indicator: (value) => {
        if (!value) return null;
        if (value < 15) return { color: "bg-green-500", label: "Low" };
        if (value < 25) return { color: "bg-yellow-500", label: "Average" };
        return { color: "bg-red-500", label: "High" };
      },
    },
    {
      label: "EPS",
      key: "eps",
      description:
        "Earnings Per Share is the portion of a company's profit allocated to each outstanding share of common stock.",
      format: (value) => (value ? `$${value.toFixed(2)}` : "N/A"),
      indicator: (value) => {
        if (!value) return null;
        if (value <= 0) return { color: "bg-red-500", label: "Negative" };
        if (value < 5) return { color: "bg-yellow-500", label: "Moderate" };
        return { color: "bg-green-500", label: "Strong" };
      },
    },
    {
      label: "Dividend Yield",
      key: "dividendYield",
      description:
        "Shows how much a company pays out in dividends each year relative to its stock price, expressed as a percentage.",
      format: (value) => (value ? `${(value * 100).toFixed(2)}%` : "N/A"),
      indicator: (value) => {
        if (!value) return null;
        if (value < 0.01) return { color: "bg-red-500", label: "Low/None" };
        if (value < 0.03) return { color: "bg-yellow-500", label: "Moderate" };
        return { color: "bg-green-500", label: "High" };
      },
    },
    {
      label: "Beta",
      key: "beta",
      description:
        "Measures a stock's volatility compared to the overall market. Beta > 1 means more volatile than the market, < 1 means less volatile.",
      format: (value) => (value ? value.toFixed(2) : "N/A"),
      indicator: (value) => {
        if (!value) return null;
        if (value < 0.8)
          return { color: "bg-blue-500", label: "Low Volatility" };
        if (value < 1.2) return { color: "bg-green-500", label: "Market-like" };
        if (value < 1.5) return { color: "bg-yellow-500", label: "Moderate" };
        return { color: "bg-red-500", label: "High Volatility" };
      },
    },
    {
      label: "52-Week High",
      key: "52WeekHigh",
      description:
        "The highest price at which a stock has traded during the last 52 weeks.",
      format: (value) => (value ? `$${value.toFixed(2)}` : "N/A"),
    },
    {
      label: "52-Week Low",
      key: "52WeekLow",
      description:
        "The lowest price at which a stock has traded during the last 52 weeks.",
      format: (value) => (value ? `$${value.toFixed(2)}` : "N/A"),
    },
  ];

  if (symbols.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-muted-foreground">
          Add symbols to view metrics comparison
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading metrics data...</p>
      </div>
    );
  }

  const getProgressValue = (
    metric: MetricInfo,
    symbol: string,
    value: number
  ) => {
    if (!value || !metric.scale) return 0;

    const allValues = symbols
      .map((s) => metricsData[s]?.[metric.key])
      .filter((v) => v !== undefined && v !== null)
      .map(Number);

    const { min, max } = metric.scale(allValues);
    const range = max - min;

    if (range === 0) return 50;
    return ((value - min) / range) * 100;
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-2">
        <p>
          Compare key financial metrics across selected stocks. Hover over
          metric name for detailed explanation.
        </p>
      </div>
      <div className="overflow-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[180px]">Metric</TableHead>
              {symbols.map((symbol) => (
                <TableHead key={symbol}>{symbol}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {metrics.map((metric) => (
              <TableRow key={metric.key}>
                <TableCell className="font-medium">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-1 cursor-help">
                        {metric.label}
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{metric.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>

                {symbols.map((symbol) => {
                  const value = metricsData[symbol]?.[metric.key];
                  const indicator =
                    metric.indicator && value !== undefined
                      ? metric.indicator(value)
                      : null;
                  const progressValue =
                    value !== undefined && metric.scale
                      ? getProgressValue(metric, symbol, Number(value))
                      : null;

                  return (
                    <TableCell key={symbol} className="relative">
                      <div className="flex flex-col gap-1">
                        <div className="font-medium">
                          {value !== undefined ? metric.format(value) : "N/A"}
                        </div>

                        {indicator && (
                          <Badge
                            variant="outline"
                            className={`text-xs px-1.5 py-0 ${indicator.color.replace(
                              "bg-",
                              "text-"
                            )} border-${indicator.color.replace("bg-", "")}/30`}
                          >
                            {indicator.label}
                          </Badge>
                        )}

                        {progressValue !== null && (
                          <div className="w-full mt-1">
                            <Progress value={progressValue} className="h-1" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
