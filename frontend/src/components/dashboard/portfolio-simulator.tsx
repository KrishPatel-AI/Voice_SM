"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUp, ArrowDown, Wallet, Plus, Trash2 } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

interface PortfolioHolding {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  price: number;
  change: number;
}

export function PortfolioSimulator() {
  const [holdings, setHoldings] = useState<PortfolioHolding[]>([
    {
      id: "1",
      symbol: "AAPL",
      name: "Apple Inc.",
      shares: 10,
      price: 181.56,
      change: 1.37,
    },
    {
      id: "2",
      symbol: "MSFT",
      name: "Microsoft Corp.",
      shares: 5,
      price: 422.92,
      change: 1.23,
    },
    {
      id: "3",
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      shares: 8,
      price: 175.85,
      change: -0.69,
    },
  ]);

  const [newHolding, setNewHolding] = useState({
    symbol: "",
    shares: 0,
  });

  // Colors for different holdings in the pie chart
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  const getTotalValue = () => {
    return holdings.reduce(
      (sum, holding) => sum + holding.shares * holding.price,
      0
    );
  };

  const addHolding = () => {
    if (newHolding.symbol && newHolding.shares > 0) {
      // Simulate fetching stock data
      const mockStocks: Record<
        string,
        { name: string; price: number; change: number }
      > = {
        AAPL: { name: "Apple Inc.", price: 181.56, change: 1.37 },
        MSFT: { name: "Microsoft Corp.", price: 422.92, change: 1.23 },
        AMZN: { name: "Amazon.com Inc.", price: 175.85, change: -0.69 },
        NVDA: { name: "NVIDIA Corp.", price: 822.79, change: -1.87 },
        GOOGL: { name: "Alphabet Inc.", price: 152.13, change: 0.56 },
        META: { name: "Meta Platforms Inc.", price: 483.7, change: 2.7 },
        TSLA: { name: "Tesla Inc.", price: 175.22, change: -2.11 },
      };

      const stockData = mockStocks[newHolding.symbol.toUpperCase()];

      if (stockData) {
        setHoldings([
          ...holdings,
          {
            id: Date.now().toString(),
            symbol: newHolding.symbol.toUpperCase(),
            name: stockData.name,
            shares: newHolding.shares,
            price: stockData.price,
            change: stockData.change,
          },
        ]);
        setNewHolding({ symbol: "", shares: 0 });
      }
    }
  };

  const removeHolding = (id: string) => {
    setHoldings(holdings.filter((holding) => holding.id !== id));
  };

  const pieChartData = holdings.map((holding, index) => ({
    name: holding.symbol,
    value: holding.shares * holding.price,
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle className="text-lg">Portfolio Simulator</CardTitle>
            <CardDescription>
              Total Value: $
              {getTotalValue().toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <div className="space-y-1 flex-1">
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input
                    id="symbol"
                    placeholder="e.g. AAPL"
                    value={newHolding.symbol}
                    onChange={(e) =>
                      setNewHolding({ ...newHolding, symbol: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <Label htmlFor="shares">Shares</Label>
                  <Input
                    id="shares"
                    type="number"
                    placeholder="Quantity"
                    min="0"
                    value={newHolding.shares || ""}
                    onChange={(e) =>
                      setNewHolding({
                        ...newHolding,
                        shares: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <Button onClick={addHolding} className="mb-0.5">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-2">Symbol</th>
                      <th className="text-right p-2">Shares</th>
                      <th className="text-right p-2">Price</th>
                      <th className="text-right p-2">Value</th>
                      <th className="p-2 w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.map((holding) => (
                      <tr key={holding.id} className="border-t">
                        <td className="p-2 font-medium">{holding.symbol}</td>
                        <td className="text-right p-2">{holding.shares}</td>
                        <td className="text-right p-2">
                          ${holding.price.toFixed(2)}
                        </td>
                        <td className="text-right p-2">
                          ${(holding.shares * holding.price).toFixed(2)}
                          <div className="inline-flex items-center ml-1">
                            {holding.change > 0 ? (
                              <ArrowUp className="h-3 w-3 text-green-500" />
                            ) : (
                              <ArrowDown className="h-3 w-3 text-red-500" />
                            )}
                            <span
                              className={cn(
                                "text-xs",
                                holding.change > 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              )}
                            >
                              {Math.abs(holding.change).toFixed(2)}%
                            </span>
                          </div>
                        </td>
                        <td className="p-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeHolding(holding.id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {holdings.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="p-4 text-center text-muted-foreground"
                        >
                          No holdings in portfolio
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center h-[280px]">
            {holdings.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name }) => name}
                    labelLine={false}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [
                      `$${value.toFixed(2)}`,
                      "Value",
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-muted-foreground">
                <p>Add holdings to see allocation chart</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
