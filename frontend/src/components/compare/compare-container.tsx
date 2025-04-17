// frontend/src/components/compare/compare-container.tsx
"use client";
import { useState, useEffect } from "react";
import { StockSearchBar } from "./stock-search";
import { ComparisonChart } from "./compare-chart";
import { PerformanceSummary } from "./performance-summary";
import { ComparisonMetrics } from "./comparison-metrics";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart3, Clock } from "lucide-react";

const timeframeOptions = [
  { value: "1d", label: "1 Day" },
  { value: "5d", label: "5 Days" },
  { value: "1mo", label: "1 Month" },
  { value: "3mo", label: "3 Months" },
  { value: "6mo", label: "6 Months" },
  { value: "1y", label: "1 Year" },
  { value: "2y", label: "2 Years" },
  { value: "5y", label: "5 Years" },
];

export function StockComparisonContainer() {
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState("1mo");
  const [activeTab, setActiveTab] = useState("chart");
  
  // Handle selecting stocks
  const handleStockSelection = (stocks: string[]) => {
    setSelectedSymbols(stocks);
    // Save to local storage
    localStorage.setItem("comparisonSymbols", JSON.stringify(stocks));
  };
  
  // Load any previously selected symbols from local storage
  useEffect(() => {
    const savedSymbols = localStorage.getItem("comparisonSymbols");
    if (savedSymbols) {
      try {
        const parsed = JSON.parse(savedSymbols);
        if (Array.isArray(parsed)) {
          setSelectedSymbols(parsed);
        }
      } catch (e) {
        console.error("Error parsing saved symbols:", e);
      }
    }
  }, []);
  
  // Handle timeframe change
  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Stock Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <StockSearchBar selected={selectedSymbols} setSelected={handleStockSelection} />
        </CardContent>
      </Card>
      
      {selectedSymbols.length > 0 && (
        <>
          <PerformanceSummary symbols={selectedSymbols} />
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Performance Analysis</CardTitle>
              <div className="flex items-center justify-between mt-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                  <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                    <TabsTrigger value="chart" className="flex items-center">
                      <LineChart className="h-4 w-4 mr-1" />
                      Chart
                    </TabsTrigger>
                    <TabsTrigger value="metrics" className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Metrics
                    </TabsTrigger>
                    <TabsTrigger value="history" className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      History
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Select value={timeframe} onValueChange={handleTimeframeChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeframeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            
            <CardContent className="pt-4">
              <TabsContent value="chart" className="mt-0">
                <ComparisonChart symbols={selectedSymbols} timeframe={timeframe} />
              </TabsContent>
              
              <TabsContent value="metrics" className="mt-0">
                <ComparisonMetrics symbols={selectedSymbols} />
              </TabsContent>
              
              <TabsContent value="history" className="mt-0">
                {/* Assuming you have a ComparisonHistory component */}
                {/* <ComparisonHistory symbols={selectedSymbols} timeframe={timeframe} /> */}
              </TabsContent>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}