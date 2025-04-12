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

interface MetricData {
  metric: string;
  aapl: string | number;
  aaplChange?: number;
  msft: string | number;
  msftChange?: number;
  googl: string | number;
  googlChange?: number;
  category: string;
}

export function ComparisonMetrics() {
  // Sample metrics data
  const metrics: MetricData[] = [
    // Price metrics
    {
      metric: "Last Price",
      aapl: "$187.68",
      aaplChange: 0.67,
      msft: "$407.54",
      msftChange: 0.69,
      googl: "$156.28",
      googlChange: -0.29,
      category: "price",
    },
    {
      metric: "52 Week High",
      aapl: "$199.62",
      msft: "$415.32",
      googl: "$160.12",
      category: "price",
    },
    {
      metric: "52 Week Low",
      aapl: "$142.53",
      msft: "$245.61",
      googl: "$105.21",
      category: "price",
    },
    {
      metric: "Market Cap",
      aapl: "$2.89T",
      msft: "$3.02T",
      googl: "$1.98T",
      category: "price",
    },

    // Financial metrics
    {
      metric: "P/E Ratio",
      aapl: 32.47,
      msft: 38.21,
      googl: 27.45,
      category: "financial",
    },
    {
      metric: "EPS (TTM)",
      aapl: 5.78,
      msft: 10.66,
      googl: 5.69,
      category: "financial",
    },
    {
      metric: "Revenue (TTM)",
      aapl: "$383.29B",
      msft: "$211.92B",
      googl: "$307.39B",
      category: "financial",
    },
    {
      metric: "Dividend Yield",
      aapl: "0.51%",
      msft: "0.72%",
      googl: "0.00%",
      category: "financial",
    },

    // Technical metrics
    {
      metric: "RSI (14)",
      aapl: 58.24,
      msft: 62.35,
      googl: 47.18,
      category: "technical",
    },
    {
      metric: "50-Day MA",
      aapl: "$178.45",
      msft: "$395.87",
      googl: "$152.93",
      category: "technical",
    },
    {
      metric: "200-Day MA",
      aapl: "$174.32",
      msft: "$362.14",
      googl: "$142.86",
      category: "technical",
    },
    {
      metric: "Beta",
      aapl: 1.27,
      msft: 0.92,
      googl: 1.06,
      category: "technical",
    },
  ];

  const priceMetrics = metrics.filter((m) => m.category === "price");
  const financialMetrics = metrics.filter((m) => m.category === "financial");
  const technicalMetrics = metrics.filter((m) => m.category === "technical");

  const renderChange = (change: number | undefined) => {
    if (change === undefined) return null;

    return change > 0 ? (
      <div className="flex items-center text-stock-up">
        <ArrowUpRight className="h-3 w-3 mr-0.5" />
        <span>{change.toFixed(2)}%</span>
      </div>
    ) : (
      <div className="flex items-center text-stock-down">
        <ArrowDownRight className="h-3 w-3 mr-0.5" />
        <span>{Math.abs(change).toFixed(2)}%</span>
      </div>
    );
  };

  const renderMetricSection = (title: string, data: MetricData[]) => (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Metric</TableHead>
              <TableHead>AAPL</TableHead>
              <TableHead>MSFT</TableHead>
              <TableHead>GOOGL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.metric}>
                <TableCell className="font-medium">{row.metric}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{row.aapl}</span>
                    {renderChange(row.aaplChange)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{row.msft}</span>
                    {renderChange(row.msftChange)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{row.googl}</span>
                    {renderChange(row.googlChange)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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

      {renderMetricSection("Price & Market Metrics", priceMetrics)}
      {renderMetricSection("Financial Metrics", financialMetrics)}
      {renderMetricSection("Technical Indicators", technicalMetrics)}
    </div>
  );
}
