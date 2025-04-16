"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

interface Props {
  symbols: string[];
}

export function ComparisonMetrics({ symbols }: Props) {
  const [metricsData, setMetricsData] = useState<any>({});

  useEffect(() => {
    if (symbols.length >= 3) {
      fetch(`http://localhost:5000/api/compare/metrics?symbols=${symbols.join('&symbols=')}`)
        .then(res => res.json())
        .then(data => setMetricsData(data));
    }
  }, [symbols]);

  const metrics = [
    ['Market Cap', 'marketCap'],
    ['P/E Ratio', 'peRatio'],
    ['EPS', 'eps'],
    ['Dividend Yield', 'dividendYield'],
    ['Beta', 'beta'],
    ['52-Week High', '52WeekHigh'],
    ['52-Week Low', '52WeekLow'],
  ];

  return (
    <div className="overflow-auto border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Metric</TableHead>
            {symbols.map((symbol) => (
              <TableHead key={symbol}>{symbol}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map(([label, key]) => (
            <TableRow key={key}>
              <TableCell className="font-medium">{label}</TableCell>
              {symbols.map((symbol) => (
                <TableCell key={symbol}>
                  {metricsData[symbol]?.[key] ?? "N/A"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
