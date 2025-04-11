"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
}

interface StockTableProps {
  filterSector?: string;
}

export function StockTable({ filterSector }: StockTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof StockData>("symbol");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Sample stock data
  const stockData: StockData[] = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 181.56,
      change: 2.45,
      changePercent: 1.37,
      volume: 52.3,
      marketCap: 2850,
      sector: "Technology",
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: 422.92,
      change: 5.12,
      changePercent: 1.23,
      volume: 29.1,
      marketCap: 3145,
      sector: "Technology",
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: 175.85,
      change: -1.23,
      changePercent: -0.69,
      volume: 35.8,
      marketCap: 1820,
      sector: "Consumer",
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corp.",
      price: 822.79,
      change: -15.64,
      changePercent: -1.87,
      volume: 42.6,
      marketCap: 2030,
      sector: "Technology",
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 152.13,
      change: 0.84,
      changePercent: 0.56,
      volume: 24.3,
      marketCap: 1950,
      sector: "Technology",
    },
    {
      symbol: "JPM",
      name: "JPMorgan Chase & Co.",
      price: 193.84,
      change: -0.59,
      changePercent: -0.3,
      volume: 11.2,
      marketCap: 565,
      sector: "Finance",
    },
    {
      symbol: "BAC",
      name: "Bank of America Corp.",
      price: 37.12,
      change: 0.28,
      changePercent: 0.76,
      volume: 34.5,
      marketCap: 292,
      sector: "Finance",
    },
    {
      symbol: "JNJ",
      name: "Johnson & Johnson",
      price: 152.35,
      change: 1.24,
      changePercent: 0.82,
      volume: 7.8,
      marketCap: 368,
      sector: "Healthcare",
    },
    {
      symbol: "PFE",
      name: "Pfizer Inc.",
      price: 27.45,
      change: -0.35,
      changePercent: -1.26,
      volume: 28.3,
      marketCap: 155,
      sector: "Healthcare",
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 175.22,
      change: -3.78,
      changePercent: -2.11,
      volume: 98.6,
      marketCap: 557,
      sector: "Consumer",
    },
  ];

  const handleSort = (column: keyof StockData) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Sort and filter data
  let displayData = [...stockData];

  // Apply sector filter if provided
  if (filterSector && filterSector !== "All") {
    displayData = displayData.filter((stock) => stock.sector === filterSector);
  }

  // Apply sorting
  displayData.sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    let result = 0;
    if (typeof valueA === "string" && typeof valueB === "string") {
      result = valueA.localeCompare(valueB);
    } else {
      result = (valueA as number) < (valueB as number) ? -1 : 1;
    }

    return sortDirection === "asc" ? result : -result;
  });

  return (
    <div className="rounded-md border">
      <div className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]" />
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("symbol")}
              >
                Symbol
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name
              </TableHead>
              <TableHead
                className="text-right cursor-pointer"
                onClick={() => handleSort("price")}
              >
                Price
              </TableHead>
              <TableHead
                className="text-right cursor-pointer"
                onClick={() => handleSort("changePercent")}
              >
                24h Change
              </TableHead>
              <TableHead
                className="text-right cursor-pointer hidden md:table-cell"
                onClick={() => handleSort("volume")}
              >
                Volume (M)
              </TableHead>
              <TableHead
                className="text-right cursor-pointer hidden lg:table-cell"
                onClick={() => handleSort("marketCap")}
              >
                Market Cap (B)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayData.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Star className="h-3.5 w-3.5" />
                    <span className="sr-only">Favorite</span>
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell className="text-right">
                  ${stock.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    {stock.change > 0 ? (
                      <ArrowUp className="h-3 w-3 text-stock-up mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-stock-down mr-1" />
                    )}
                    <span
                      className={cn(
                        stock.change > 0 ? "text-stock-up" : "text-stock-down"
                      )}
                    >
                      {stock.changePercent > 0 ? "+" : ""}
                      {stock.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right hidden md:table-cell">
                  {stock.volume.toFixed(1)}M
                </TableCell>
                <TableCell className="text-right hidden lg:table-cell">
                  ${stock.marketCap}B
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
