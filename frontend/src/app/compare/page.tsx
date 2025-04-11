import { StockComparison } from "@/components/compare/stock-comparison";
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
import { ComparisonMetrics } from "@/components/compare/comparison-metrics";
import { ComparisonHistory } from "@/components/compare/comparison-history";

const Compare = () => {
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
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl">Stock Selection</CardTitle>
                <CardDescription>
                  Select stocks to compare performance metrics
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Preset: Tech Giants
                </Button>
                <Button variant="outline" size="sm">
                  Preset: Banking
                </Button>
                <Button variant="outline" size="sm">
                  Preset: EV Makers
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <StockComparison />
          </CardContent>
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
                  <ComparisonChart />
                </div>
              </TabsContent>
              <TabsContent value="metrics">
                <ComparisonMetrics />
              </TabsContent>
              <TabsContent value="history">
                <ComparisonHistory />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function ComparisonChart() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-muted/30 rounded-lg border border-dashed">
      <div className="text-center">
        <BarChart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground">
          Interactive stock price comparison chart will be displayed here
        </p>
        <p className="text-sm text-muted-foreground">
          (Implementation requires actual chart component)
        </p>
      </div>
    </div>
  );
}

export default Compare;
