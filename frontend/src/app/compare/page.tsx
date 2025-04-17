// frontend/src/app/compare/page.tsx
"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  BarChart, 
  TrendingUp, 
  Search, 
  Info, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  DollarSign,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StockSearchBar } from "@/components/compare/stock-search";
import { ComparisonMetrics } from "@/components/compare/comparison-metrics";
import { ComparisonHistory } from "@/components/compare/comparison-history";
import { ComparisonChart } from "@/components/compare/compare-chart";
import { PerformanceSummary } from "@/components/compare/performance-summary";

export default function Compare() {
  const [selected, setSelected] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState("1mo");
  
  return (
    <div className="container px-4 md:px-12 py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center">
          <LineChart className="mr-2 h-7 w-7 text-primary" />
          Stock Comparison
        </h1>
        <p className="text-muted-foreground">
          Analyze and compare different stocks side by side with detailed metrics and visualizations
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card className="overflow-hidden border-2 border-muted/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl mb-2 flex items-center">
              <Search className="mr-2 h-5 w-5 text-primary" />
              Search and Select Stocks
            </CardTitle>
            <CardDescription>
              Enter stock symbols or search by company name to add to comparison
            </CardDescription>
            <StockSearchBar selected={selected} setSelected={setSelected} />
          </CardHeader>
        </Card>
      </div>

      {selected.length > 0 && (
        <div className="grid grid-cols-1 gap-6 mb-8">
          <PerformanceSummary symbols={selected} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card className="overflow-hidden border-2 border-muted/20 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Performance Comparison
            </CardTitle>
            <CardDescription>
              Compare historical prices and key financial metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chart" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-4 max-w-md">
                <TabsTrigger value="chart" className="flex items-center">
                  <LineChart className="h-4 w-4 mr-1" />
                  Charts
                </TabsTrigger>
                <TabsTrigger value="metrics" className="flex items-center">
                  <BarChart className="h-4 w-4 mr-1" />
                  Metrics
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  History
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="chart">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Select time period:
                  </div>
                  <div className="flex gap-1">
                    {[
                      { label: "1D", value: "1d" },
                      { label: "1W", value: "1wk" },
                      { label: "1M", value: "1mo" },
                      { label: "3M", value: "3mo" },
                      { label: "6M", value: "6mo" },
                      { label: "1Y", value: "1y" },
                      { label: "5Y", value: "5y" },
                    ].map((period) => (
                      <Button
                        key={period.value}
                        variant={timeframe === period.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeframe(period.value)}
                        className="h-8"
                      >
                        {period.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="h-[500px]">
                  <ComparisonChart symbols={selected} timeframe={timeframe} />
                </div>
              </TabsContent>
              
              <TabsContent value="metrics">
                <ComparisonMetrics symbols={selected} />
              </TabsContent>
              
              <TabsContent value="history">
                <div className="mb-4">
                  <div className="flex gap-1 mb-2">
                    {[
                      { label: "1M", value: "1mo" },
                      { label: "3M", value: "3mo" },
                      { label: "6M", value: "6mo" },
                      { label: "1Y", value: "1y" },
                    ].map((period) => (
                      <Button
                        key={period.value}
                        variant={timeframe === period.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeframe(period.value)}
                      >
                        {period.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <ComparisonHistory symbols={selected} timeframe={timeframe} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}