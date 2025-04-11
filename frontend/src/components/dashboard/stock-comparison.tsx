"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowDownUp } from "lucide-react";

interface ComparisonData {
  date: string;
  AAPL: number;
  MSFT: number;
  GOOGL: number;
  AMZN: number;
  META: number;
}

export function StockComparison() {
  const [timeframe, setTimeframe] = useState("1m");
  const [stocks, setStocks] = useState<string[]>(["AAPL", "MSFT"]);

  // Mock data for chart
  const mockData: ComparisonData[] = [
    {
      date: "2025-03-01",
      AAPL: 175,
      MSFT: 420,
      GOOGL: 150,
      AMZN: 174,
      META: 480,
    },
    {
      date: "2025-03-08",
      AAPL: 178,
      MSFT: 425,
      GOOGL: 153,
      AMZN: 178,
      META: 485,
    },
    {
      date: "2025-03-15",
      AAPL: 180,
      MSFT: 430,
      GOOGL: 155,
      AMZN: 180,
      META: 490,
    },
    {
      date: "2025-03-22",
      AAPL: 176,
      MSFT: 426,
      GOOGL: 152,
      AMZN: 176,
      META: 484,
    },
    {
      date: "2025-03-29",
      AAPL: 182,
      MSFT: 432,
      GOOGL: 156,
      AMZN: 179,
      META: 492,
    },
    {
      date: "2025-04-05",
      AAPL: 181,
      MSFT: 435,
      GOOGL: 158,
      AMZN: 182,
      META: 495,
    },
  ];

  // Colors for different stocks
  const stockColors = {
    AAPL: "#FF5733",
    MSFT: "#3366FF",
    GOOGL: "#33FF57",
    AMZN: "#FF33A8",
    META: "#33FFF5",
  };

  const availableStocks = [
    { value: "AAPL", label: "Apple Inc." },
    { value: "MSFT", label: "Microsoft Corp." },
    { value: "GOOGL", label: "Alphabet Inc." },
    { value: "AMZN", label: "Amazon.com Inc." },
    { value: "META", label: "Meta Platforms Inc." },
  ];

  const timeframeOptions = [
    { value: "1w", label: "1 Week" },
    { value: "1m", label: "1 Month" },
    { value: "3m", label: "3 Months" },
    { value: "6m", label: "6 Months" },
    { value: "1y", label: "1 Year" },
  ];

  const toggleStock = (stock: string) => {
    if (stocks.includes(stock)) {
      setStocks(stocks.filter((s) => s !== stock));
    } else {
      if (stocks.length < 3) {
        setStocks([...stocks, stock]);
      }
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ArrowDownUp className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">Stock Comparison</CardTitle>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                {timeframeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {availableStocks.map((stock) => (
            <Button
              key={stock.value}
              variant={stocks.includes(stock.value) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleStock(stock.value)}
              className="flex items-center gap-1"
              disabled={!stocks.includes(stock.value) && stocks.length >= 3}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: stocks.includes(stock.value)
                    ? "white"
                    : (stockColors as any)[stock.value],
                }}
              />
              {stock.value}
            </Button>
          ))}
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={mockData}
              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="date" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Legend />
              {stocks.map((stock) => (
                <Area
                  key={stock}
                  type="monotone"
                  dataKey={stock}
                  stroke={(stockColors as any)[stock]}
                  fill={(stockColors as any)[stock]}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center text-xs text-muted-foreground mt-4">
          <p>Select up to 3 stocks to compare performance</p>
        </div>
      </CardContent>
    </Card>
  );
}
