// frontend/src/components/compare/compare-chart.tsx
"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle } from "lucide-react";

interface StockData {
  Date: string;
  Close: number;
  Open?: number;
  High?: number;
  Low?: number;
  Volume: number;
}

interface ChartDataPoint {
  Date: string;
  [symbol: string]: number | string;
  [symbolNormalized: string]: number | string;
}

interface Props {
  symbols: string[];
  timeframe: string;
}

const colorPalette = [
  "#8884d8", // purple
  "#82ca9d", // green
  "#ffc658", // yellow
  "#ff8042", // orange
  "#00c49f", // teal
  "#ff6384", // pink
  "#36a2eb", // blue
  "#fd7e14", // dark orange
];

export function ComparisonChart({ symbols, timeframe }: Props) {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [normalizedData, setNormalizedData] = useState<ChartDataPoint[]>([]);
  const [isNormalized, setIsNormalized] = useState(false);
  const [view, setView] = useState("line");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (symbols.length > 0) {
      setLoading(true);
      setError(null);
      
      fetch(
        `http://localhost:5000/api/compare/history?symbols=${symbols.join(
          "&symbols="
        )}&period=${timeframe}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
          }
          return res.json();
        })
        .then((rawData) => {
          // Process raw data for absolute values
          const merged: Record<string, ChartDataPoint> = {};
          let hasData = false;
          
          symbols.forEach((symbol) => {
            if (rawData[symbol] && rawData[symbol].length > 0) {
              hasData = true;
              rawData[symbol].forEach((entry: StockData) => {
                // Ensure Date is a string
                const dateStr = typeof entry.Date === 'string' 
                  ? entry.Date 
                  : new Date(entry.Date).toISOString().split('T')[0];
                
                if (!merged[dateStr]) {
                  merged[dateStr] = { Date: dateStr };
                }
                
                // Ensure Close is a number
                const closePrice = typeof entry.Close === 'number' 
                  ? entry.Close 
                  : parseFloat(entry.Close);
                
                merged[dateStr][symbol] = parseFloat(closePrice.toFixed(2));
              });
            }
          });

          if (!hasData) {
            setError("No data available for the selected symbols");
            setLoading(false);
            return;
          }

          // Sort by date
          const mergedArray = Object.values(merged).sort(
            (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
          );
          
          // Calculate normalized data (percentage change)
          const normalized = [...mergedArray];
          
          if (normalized.length > 0) {
            // Find base values (first entry for each symbol)
            const baseValues: Record<string, number> = {};
            symbols.forEach(symbol => {
              // Find first valid entry for this symbol
              const firstValidEntry = normalized.find(entry => 
                entry[symbol] !== undefined && !isNaN(Number(entry[symbol]))
              );
              
              if (firstValidEntry && firstValidEntry[symbol] !== undefined) {
                baseValues[symbol] = Number(firstValidEntry[symbol]);
              }
            });
            
            // Calculate percentage changes
            normalized.forEach(entry => {
              symbols.forEach(symbol => {
                if (entry[symbol] !== undefined && baseValues[symbol]) {
                  const currentValue = Number(entry[symbol]);
                  const baseValue = baseValues[symbol];
                  const percentChange = ((currentValue - baseValue) / baseValue) * 100;
                  entry[`${symbol}_norm`] = parseFloat(percentChange.toFixed(2));
                }
              });
            });
          }
          
          setData(mergedArray);
          setNormalizedData(normalized);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching data:", err);
          setError("Failed to fetch stock data. Please try again later.");
          setLoading(false);
        });
    } else {
      // Reset data when no symbols are selected
      setData([]);
      setNormalizedData([]);
      setError(null);
    }
  }, [symbols, timeframe]);

  const chartData = isNormalized ? normalizedData : data;
  const yAxisLabel = isNormalized ? 'Change (%)' : 'Price ($)';

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="border shadow-md">
          <CardContent className="p-2 text-xs">
            <p className="font-semibold mb-1">{label}</p>
            {payload.map((entry: any, index: number) => (
              <div 
                key={`tooltip-${index}`} 
                className="flex items-center justify-between gap-2 py-0.5"
              >
                <span style={{ color: entry.color }}>{entry.name}:</span>
                <span className="font-medium">
                  {isNormalized ? `${entry.value}%` : `$${entry.value}`}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] border rounded-lg p-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading chart data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] border rounded-lg p-4 bg-red-50">
        <AlertTriangle className="h-8 w-8 text-red-500 mb-4" />
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  if (symbols.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] border rounded-lg p-4">
        <p className="text-muted-foreground">Add symbols to view comparison chart</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] border rounded-lg p-4">
        <p className="text-muted-foreground">No data available for selected symbols</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 border rounded-lg p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <Tabs value={view} onValueChange={setView} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-3 w-full sm:w-auto">
            <TabsTrigger value="line">Line</TabsTrigger>
            <TabsTrigger value="area">Area</TabsTrigger>
            <TabsTrigger value="bar">Bar</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2">
          <Switch
            id="normalize"
            checked={isNormalized}
            onCheckedChange={setIsNormalized}
          />
          <Label htmlFor="normalize">Compare % Change</Label>
        </div>
      </div>

      <div className="h-[400px] w-full">
        {view === "line" && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="Date" 
                tickFormatter={(date) => {
                  const d = new Date(date);
                  return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear().toString().substr(2)}`;
                }}
              />
              <YAxis 
                domain={['auto', 'auto']}
                label={{ 
                  value: yAxisLabel, 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' } 
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {isNormalized && <ReferenceLine y={0} stroke="#666" />}
              {isNormalized ? (
                symbols.map((symbol, index) => (
                  <Line
                    key={symbol}
                    type="monotone"
                    dataKey={`${symbol}_norm`}
                    name={symbol}
                    stroke={colorPalette[index % colorPalette.length]}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                ))
              ) : (
                symbols.map((symbol, index) => (
                  <Line
                    key={symbol}
                    type="monotone"
                    dataKey={symbol}
                    name={symbol}
                    stroke={colorPalette[index % colorPalette.length]}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                ))
              )}
            </LineChart>
          </ResponsiveContainer>
        )}

        {view === "area" && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="Date" 
                tickFormatter={(date) => {
                  const d = new Date(date);
                  return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear().toString().substr(2)}`;
                }}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                label={{ 
                  value: yAxisLabel, 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' } 
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {isNormalized && <ReferenceLine y={0} stroke="#666" />}
              {isNormalized ? (
                symbols.map((symbol, index) => (
                  <Area
                    key={symbol}
                    type="monotone"
                    dataKey={`${symbol}_norm`}
                    name={symbol}
                    stroke={colorPalette[index % colorPalette.length]}
                    fill={colorPalette[index % colorPalette.length]}
                    fillOpacity={0.2}
                  />
                ))
              ) : (
                symbols.map((symbol, index) => (
                  <Area
                    key={symbol}
                    type="monotone"
                    dataKey={symbol}
                    name={symbol}
                    stroke={colorPalette[index % colorPalette.length]}
                    fill={colorPalette[index % colorPalette.length]}
                    fillOpacity={0.2}
                  />
                ))
              )}
            </AreaChart>
          </ResponsiveContainer>
        )}

        {view === "bar" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="Date" 
                tickFormatter={(date) => {
                  const d = new Date(date);
                  return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear().toString().substr(2)}`;
                }}
              />
              <YAxis 
                domain={['auto', 'auto']}
                label={{ 
                  value: yAxisLabel, 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' } 
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {isNormalized && <ReferenceLine y={0} stroke="#666" />}
              {isNormalized ? (
                symbols.map((symbol, index) => (
                  <Bar
                    key={symbol}
                    dataKey={`${symbol}_norm`}
                    name={symbol}
                    fill={colorPalette[index % colorPalette.length]}
                  />
                ))
              ) : (
                symbols.map((symbol, index) => (
                  <Bar
                    key={symbol}
                    dataKey={symbol}
                    name={symbol}
                    fill={colorPalette[index % colorPalette.length]}
                  />
                ))
              )}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}