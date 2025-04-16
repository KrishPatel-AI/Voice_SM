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

interface StockData {
  Date: string;
  Close: number;
  Volume: number;
}

interface HistoricalData {
  [symbol: string]: StockData[];
}

interface Props {
  symbols: string[];
}

export function ComparisonHistory({ symbols }: Props) {
  const [historicalData, setHistoricalData] = useState<HistoricalData>({});

  useEffect(() => {
    if (symbols.length >= 3) {
      fetch(
        `http://localhost:5000/api/compare/history?symbols=${symbols.join(
          "&symbols="
        )}&period=1mo`
      )
        .then((res) => res.json())
        .then((data) => setHistoricalData(data));
    }
  }, [symbols]);

  const renderStockHistory = (symbol: string) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Date</TableHead>
            <TableHead>Close Price</TableHead>
            <TableHead>Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historicalData[symbol]?.map((row, index) => (
            <TableRow key={`${symbol}-${index}`}>
              <TableCell>{row.Date}</TableCell>
              <TableCell>${row.Close.toFixed(2)}</TableCell>
              <TableCell>{row.Volume.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {symbols.map((symbol) => (
          <Badge key={symbol} className="px-3 py-1" variant="outline">
            {symbol}
          </Badge>
        ))}
      </div>

      <Tabs defaultValue={symbols[0]} className="w-full">
        <TabsList className={`grid grid-cols-${symbols.length} w-full max-w-xl`}>
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
