import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HistoricalData {
  date: string;
  aapl: {
    price: number;
    change: number;
    volume: string;
  };
  msft: {
    price: number;
    change: number;
    volume: string;
  };
  googl: {
    price: number;
    change: number;
    volume: string;
  };
}

export function ComparisonHistory() {
  // Sample historical data
  const historicalData: HistoricalData[] = [
    {
      date: "Apr 08, 2025",
      aapl: { price: 187.68, change: 0.67, volume: "52.3M" },
      msft: { price: 407.54, change: 0.69, volume: "28.7M" },
      googl: { price: 156.28, change: -0.29, volume: "15.5M" },
    },
    {
      date: "Apr 07, 2025",
      aapl: { price: 186.42, change: -0.32, volume: "48.1M" },
      msft: { price: 404.73, change: 1.21, volume: "30.2M" },
      googl: { price: 156.73, change: 0.85, volume: "14.9M" },
    },
    {
      date: "Apr 06, 2025",
      aapl: { price: 187.02, change: 1.05, volume: "55.7M" },
      msft: { price: 399.86, change: -0.45, volume: "25.3M" },
      googl: { price: 155.41, change: 0.22, volume: "16.2M" },
    },
    {
      date: "Apr 05, 2025",
      aapl: { price: 185.08, change: -0.78, volume: "47.3M" },
      msft: { price: 401.67, change: 0.33, volume: "22.8M" },
      googl: { price: 155.07, change: -1.02, volume: "18.5M" },
    },
    {
      date: "Apr 04, 2025",
      aapl: { price: 186.53, change: 0.12, volume: "50.1M" },
      msft: { price: 400.34, change: 0.89, volume: "24.5M" },
      googl: { price: 156.66, change: 1.43, volume: "17.7M" },
    },
    {
      date: "Apr 03, 2025",
      aapl: { price: 186.31, change: 1.23, volume: "49.2M" },
      msft: { price: 396.79, change: -0.56, volume: "26.1M" },
      googl: { price: 154.45, change: -0.38, volume: "15.8M" },
    },
    {
      date: "Apr 02, 2025",
      aapl: { price: 184.04, change: -0.45, volume: "53.8M" },
      msft: { price: 399.02, change: 0.74, volume: "29.4M" },
      googl: { price: 155.04, change: 0.61, volume: "16.9M" },
    },
  ];

  const renderStockHistory = (
    stockSymbol: "aapl" | "msft" | "googl",
    stockName: string
  ) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Date</TableHead>
            <TableHead>Close Price</TableHead>
            <TableHead>Change</TableHead>
            <TableHead>Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historicalData.map((row) => (
            <TableRow key={`${stockSymbol}-${row.date}`}>
              <TableCell>{row.date}</TableCell>
              <TableCell>${row[stockSymbol].price.toFixed(2)}</TableCell>
              <TableCell>
                {row[stockSymbol].change > 0 ? (
                  <div className="flex items-center text-stock-up">
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                    <span>{row[stockSymbol].change.toFixed(2)}%</span>
                  </div>
                ) : (
                  <div className="flex items-center text-stock-down">
                    <ArrowDownRight className="h-3 w-3 mr-0.5" />
                    <span>{Math.abs(row[stockSymbol].change).toFixed(2)}%</span>
                  </div>
                )}
              </TableCell>
              <TableCell>{row[stockSymbol].volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Badge className="px-3 py-1" variant="outline">
          AAPL - Apple Inc.
        </Badge>
        <Badge className="px-3 py-1" variant="outline">
          MSFT - Microsoft Corp.
        </Badge>
        <Badge className="px-3 py-1" variant="outline">
          GOOGL - Alphabet Inc.
        </Badge>
      </div>

      <Tabs defaultValue="aapl" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-4 max-w-md">
          <TabsTrigger value="aapl">AAPL</TabsTrigger>
          <TabsTrigger value="msft">MSFT</TabsTrigger>
          <TabsTrigger value="googl">GOOGL</TabsTrigger>
        </TabsList>
        <TabsContent value="aapl">
          {renderStockHistory("aapl", "Apple Inc.")}
        </TabsContent>
        <TabsContent value="msft">
          {renderStockHistory("msft", "Microsoft Corp.")}
        </TabsContent>
        <TabsContent value="googl">
          {renderStockHistory("googl", "Alphabet Inc.")}
        </TabsContent>
      </Tabs>
    </div>
  );
}
