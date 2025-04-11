"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
}

export function StockList() {
  const [searchQuery, setSearchQuery] = useState("");

  const stocks: Stock[] = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 181.56,
      change: 2.45,
      percentChange: 1.37,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: 422.92,
      change: 5.12,
      percentChange: 1.23,
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: 175.85,
      change: -1.23,
      percentChange: -0.69,
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corp.",
      price: 822.79,
      change: -15.64,
      percentChange: -1.87,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 152.13,
      change: 0.84,
      percentChange: 0.56,
    },
    {
      symbol: "META",
      name: "Meta Platforms Inc.",
      price: 483.7,
      change: 12.71,
      percentChange: 2.7,
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 175.22,
      change: -3.78,
      percentChange: -2.11,
    },
    {
      symbol: "BRK.B",
      name: "Berkshire Hathaway",
      price: 407.23,
      change: 2.13,
      percentChange: 0.53,
    },
    {
      symbol: "V",
      name: "Visa Inc.",
      price: 275.4,
      change: 1.21,
      percentChange: 0.44,
    },
    {
      symbol: "JPM",
      name: "JPMorgan Chase & Co.",
      price: 193.84,
      change: -0.59,
      percentChange: -0.3,
    },
  ];

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Watchlist</CardTitle>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search stocks..."
            className="h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          {filteredStocks.length === 0 && (
            <div className="py-6 text-center text-muted-foreground">
              No stocks found
            </div>
          )}
          {filteredStocks.map((stock) => (
            <div
              key={stock.symbol}
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50 cursor-pointer"
            >
              <div className="flex flex-col">
                <div className="font-medium">{stock.symbol}</div>
                <div className="text-xs text-muted-foreground">
                  {stock.name}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="font-medium">${stock.price.toFixed(2)}</div>
                <div className="flex items-center">
                  {stock.change > 0 ? (
                    <ArrowUp className="h-3 w-3 text-stock-up" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-stock-down" />
                  )}
                  <span
                    className={cn(
                      "ml-1 text-xs",
                      stock.change > 0 ? "text-stock-up" : "text-stock-down"
                    )}
                  >
                    {stock.change > 0 ? "+" : ""}
                    {stock.change.toFixed(2)} ({stock.change > 0 ? "+" : ""}
                    {stock.percentChange.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
