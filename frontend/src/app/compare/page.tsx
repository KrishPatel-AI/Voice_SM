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
import { LineChart, BarChart, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StockSearchBar } from "@/components/compare/stock-search";
import { ComparisonMetrics } from "@/components/compare/comparison-metrics";
import { ComparisonHistory } from "@/components/compare/comparison-history";
import { ComparisonChart } from "@/components/compare/compare-chart";

export default function Compare() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div className="container px-12 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <LineChart className="mr-2 h-7 w-7 text-primary" />
          Compare Stocks
        </h1>
        <p className="text-muted-foreground">
          Analyze and compare different stocks side by side
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl mb-2">
              Search and Select Stocks
            </CardTitle>
            <StockSearchBar selected={selected} setSelected={setSelected} />
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Performance Comparison
            </CardTitle>
            <CardDescription>
              Historical price and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chart" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-4 max-w-md">
                <TabsTrigger value="chart">Price Chart</TabsTrigger>
                <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <TabsContent value="chart">
                <div className="h-[500px]">
                  <ComparisonChart symbols={selected} />
                </div>
              </TabsContent>
              <TabsContent value="metrics">
                <ComparisonMetrics symbols={selected} />
              </TabsContent>
              <TabsContent value="history">
                <ComparisonHistory symbols={selected} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
