// frontend/src/components/compare/comparison-history.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus,
  Calendar,
  Loader2,
  BarChart3
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StockData {
  Date: string;
  Close: number;
  Open?: number;
  High?: number;
  Low?: number;
  Volume: number;
}

interface HistoricalData {
  [symbol: string]: StockData[];
}

interface Props {
  symbols: string[];
  timeframe: string;
}

export function ComparisonHistory({ symbols, timeframe }: Props) {
  const [historicalData, setHistoricalData] = useState<HistoricalData>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (symbols.length > 0) {
      setLoading(true);
      fetch(
        `http://localhost:5000/api/compare/history?symbols=${symbols.join(
          "&symbols="
        )}&period=${timeframe}`
      )
        .then((res) => res.json())
        .then((data) => {
          setHistoricalData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching history:", err);
          setLoading(false);
        });
    }
  }, [symbols, timeframe]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateChange = (current: number, previous: number | undefined) => {
    if (previous === undefined) return { value: 0, percent: 0 };
    const change = current - previous;
    const percentChange = (change / previous) * 100;
    return {
      value: change,
      percent: percentChange
    };
  };

  const renderStockHistory = (symbol: string) => {
    if (!historicalData[symbol] || historicalData[symbol].length === 0) {
      return (
        <div className="text-center p-8 text-muted-foreground">
          No historical data available for {symbol}
        </div>
      );
    }

    // Sort data by date (newest first)
    const sortedData = [...historicalData[symbol]].sort((a, b) => 
      new Date(b.Date).getTime() - new Date(a.Date).getTime()
    );

    return (
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[140px]">Date</TableHead>
              <TableHead>Close</TableHead>
              <TableHead>Change</TableHead>
              <TableHead className="hidden md:table-cell">Volume</TableHead>
              <TableHead className="hidden lg:table-cell">Range</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row, index) => {
              const previousDay = sortedData[index + 1];
              const change = calculateChange(row.Close, previousDay?.Close);
              const isPositive = change.value > 0;
              const isNegative = change.value < 0;
              const colorClass = isPositive 
                ? "text-green-600" 
                : isNegative 
                  ? "text-red-600" 
                  : "text-gray-600";
              
              return (
                <TableRow key={`${symbol}-${index}`}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {formatDate(row.Date)}
                  </TableCell>
                  <TableCell>${row.Close.toFixed(2)}</TableCell>
                  <TableCell className={`whitespace-nowrap ${colorClass}`}>
                    <div className="flex items-center gap-1">
                      {isPositive ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : isNegative ? (
                        <ArrowDownRight className="h-4 w-4" />
                      ) : (
                        <Minus className="h-4 w-4" />
                      )}
                      <span>${Math.abs(change.value).toFixed(2)}</span>
                      <span className="text-xs">({change.percent.toFixed(2)}%)</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell whitespace-nowrap">
                    {row.Volume.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {row.High && row.Low ? 
                      <div className="flex gap-2 items-center whitespace-nowrap">
                        <span className="text-muted-foreground text-xs">L: ${row.Low.toFixed(2)}</span>
                        <div className="h-[6px] w-16 bg-gray-200 rounded-full relative">
                          <div 
                            className="absolute top-0 bottom-0 bg-primary rounded-full"
                            style={{
                              left: `${((row.Close - row.Low) / (row.High - row.Low)) * 100}%`,
                              width: '6px',
                              transform: 'translateX(-50%)',
                            }}
                          />
                        </div>
                        <span className="text-muted-foreground text-xs">H: ${row.High.toFixed(2)}</span>
                      </div>
                    : "N/A"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  };

  if (symbols.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-muted-foreground">Add symbols to view historical data</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading historical data...</p>
      </div>
    );
  }

  return (
    <div>
      {/* <div className="flex items-center gap-2 mb-4 flex-wrap">
        {symbols.map((symbol) => (
          <Badge key={symbol} className="px-3 py-1" variant="secondary">
            {symbol}
          </Badge>
        ))}
      </div> */}

      <Tabs defaultValue={symbols[0]} className="w-full">
        <TabsList className="mb-4">
          {symbols.map((symbol) => (
            <TabsTrigger key={symbol} value={symbol}>
              {symbol}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {symbols.map((symbol) => (
          <TabsContent key={symbol} value={symbol}>
            {renderStockHistory(symbol)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}