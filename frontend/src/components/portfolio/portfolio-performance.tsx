import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PortfolioPerformance() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-4 justify-between md:justify-start flex-1">
          <div>
            <div className="text-sm text-muted-foreground">Total Return</div>
            <div className="text-2xl font-bold text-stock-up">+14.43%</div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground">1Y Return</div>
            <div className="text-2xl font-bold text-stock-up">+8.27%</div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground">YTD Return</div>
            <div className="text-2xl font-bold text-stock-up">+4.15%</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Select defaultValue="1Y">
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1M">1 Month</SelectItem>
              <SelectItem value="3M">3 Months</SelectItem>
              <SelectItem value="6M">6 Months</SelectItem>
              <SelectItem value="1Y">1 Year</SelectItem>
              <SelectItem value="ALL">All Time</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="value">
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="value">Value</SelectItem>
              <SelectItem value="percentage">Percentage</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-4 max-w-md">
          <TabsTrigger value="performance">Portfolio</TabsTrigger>
          <TabsTrigger value="benchmark">vs. Benchmark</TabsTrigger>
          <TabsTrigger value="holdings">By Holdings</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <PerformanceChart />
        </TabsContent>

        <TabsContent value="benchmark">
          <BenchmarkComparison />
        </TabsContent>

        <TabsContent value="holdings">
          <HoldingsPerformance />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Sample chart components
function PerformanceChart() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center bg-muted/30 rounded-lg border border-dashed">
      <div className="text-center">
        <svg
          className="h-10 w-10 text-muted-foreground mx-auto mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
        <p className="text-muted-foreground">
          Interactive portfolio performance chart will be displayed here
        </p>
        <p className="text-sm text-muted-foreground">
          (Implementation requires actual chart component)
        </p>
      </div>
    </div>
  );
}

function BenchmarkComparison() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center bg-muted/30 rounded-lg border border-dashed">
      <div className="text-center">
        <svg
          className="h-10 w-10 text-muted-foreground mx-auto mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <p className="text-muted-foreground">
          Portfolio vs benchmark comparison chart will be displayed here
        </p>
        <p className="text-sm text-muted-foreground">
          (Implementation requires actual chart component)
        </p>
      </div>
    </div>
  );
}

function HoldingsPerformance() {
  const topHoldings = [
    { name: "NVDA", value: 7600.16, change: 33.8 },
    { name: "MSFT", value: 6113.1, change: 16.59 },
    { name: "AAPL", value: 4692.0, change: 13.73 },
    { name: "JPM", value: 3536.46, change: 11.13 },
    { name: "GOOGL", value: 3125.6, change: 7.91 },
  ];

  return (
    <div className="space-y-4">
      {topHoldings.map((holding) => (
        <Card key={holding.name} className="shadow-none bg-muted/50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{holding.name}</div>
                <div className="text-sm text-muted-foreground">
                  ${holding.value.toLocaleString()}
                </div>
              </div>
              <div
                className={`text-right text-lg font-medium ${
                  holding.change >= 0 ? "text-stock-up" : "text-stock-down"
                }`}
              >
                {holding.change >= 0 ? "+" : ""}
                {holding.change.toFixed(2)}%
              </div>
            </div>
            <div className="mt-2">
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    holding.change >= 0 ? "bg-stock-up" : "bg-stock-down"
                  }`}
                  style={{
                    width: `${Math.min(Math.abs(holding.change * 2), 100)}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
