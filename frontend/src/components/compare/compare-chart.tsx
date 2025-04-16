"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

interface StockData {
  Date: string;
  Close: number;
}

interface ChartDataPoint {
  Date: string;
  [symbol: string]: number | string;
}

interface Props {
  symbols: string[];
}

const colorPalette = [
  "#8884d8", // purple
  "#82ca9d", // green
  "#ffc658", // yellow
  "#ff8042", // orange
  "#00c49f", // teal
  "#ff6384", // pink
];

export function ComparisonChart({ symbols }: Props) {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [view, setView] = useState("line");

  useEffect(() => {
    if (symbols.length >= 3) {
      fetch(
        `http://localhost:5000/api/compare/history?symbols=${symbols.join(
          "&symbols="
        )}&period=1mo`
      )
        .then((res) => res.json())
        .then((rawData) => {
          const merged: Record<string, ChartDataPoint> = {};

          symbols.forEach((symbol) => {
            rawData[symbol]?.forEach((entry: StockData) => {
              if (!merged[entry.Date]) {
                merged[entry.Date] = { Date: entry.Date };
              }
              merged[entry.Date][symbol] = parseFloat(entry.Close.toFixed(2));
            });
          });

          const mergedArray = Object.values(merged).sort(
            (a, b) =>
              new Date(a.Date).getTime() - new Date(b.Date).getTime()
          );
          setData(mergedArray);
        });
    }
  }, [symbols]);

  if (data.length === 0)
    return <p className="mt-4 text-muted-foreground">Loading chart...</p>;

  return (
    <div className="w-full">
      <Tabs value={view} onValueChange={setView}>
        <TabsList className="mb-4">
          <TabsTrigger value="line">Line Chart</TabsTrigger>
          <TabsTrigger value="area">Area Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="line">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <XAxis dataKey="Date" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Legend />
              {symbols.map((symbol, index) => (
                <Line
                  key={symbol}
                  type="monotone"
                  dataKey={symbol}
                  stroke={colorPalette[index % colorPalette.length]}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="area">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
              <XAxis dataKey="Date" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Legend />
              {symbols.map((symbol, index) => (
                <Area
                  key={symbol}
                  type="monotone"
                  dataKey={symbol}
                  stroke={colorPalette[index % colorPalette.length]}
                  fill={colorPalette[index % colorPalette.length]}
                  fillOpacity={0.3}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
}
