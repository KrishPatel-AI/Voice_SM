import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IndexData {
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
  region?: string;
}

export function GlobalIndices() {
  // Sample global indices data
  const indices: IndexData[] = [
    {
      name: "S&P 500",
      symbol: "SPX",
      value: 5245.47,
      change: 15.23,
      changePercent: 0.29,
      region: "US",
    },
    {
      name: "Dow Jones",
      symbol: "DJI",
      value: 38764.9,
      change: 89.56,
      changePercent: 0.23,
      region: "US",
    },
    {
      name: "Nasdaq",
      symbol: "IXIC",
      value: 16853.15,
      change: 30.19,
      changePercent: 0.18,
      region: "US",
    },
    {
      name: "Russell 2000",
      symbol: "RUT",
      value: 2067.85,
      change: -12.46,
      changePercent: -0.6,
      region: "US",
    },
    {
      name: "FTSE 100",
      symbol: "FTSE",
      value: 8164.99,
      change: -28.74,
      changePercent: -0.35,
      region: "Europe",
    },
    {
      name: "DAX",
      symbol: "GDAXI",
      value: 18317.84,
      change: 45.67,
      changePercent: 0.25,
      region: "Europe",
    },
    {
      name: "CAC 40",
      symbol: "FCHI",
      value: 8089.13,
      change: 12.45,
      changePercent: 0.15,
      region: "Europe",
    },
    {
      name: "Nikkei 225",
      symbol: "N225",
      value: 39836.62,
      change: -156.38,
      changePercent: -0.39,
      region: "Asia",
    },
    {
      name: "Shanghai",
      symbol: "SSEC",
      value: 3103.75,
      change: 18.93,
      changePercent: 0.61,
      region: "Asia",
    },
    {
      name: "Hang Seng",
      symbol: "HSI",
      value: 18122.39,
      change: -142.57,
      changePercent: -0.78,
      region: "Asia",
    },
  ];

  const usIndices = indices.filter((index) => index.region === "US");
  const europeIndices = indices.filter((index) => index.region === "Europe");
  const asiaIndices = indices.filter((index) => index.region === "Asia");

  const renderIndices = (data: IndexData[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {data.map((index) => (
        <Card key={index.symbol} className="bg-card/50 shadow-none">
          <CardContent className="p-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{index.name}</div>
                <div className="text-sm text-muted-foreground">
                  {index.symbol}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {index.value.toLocaleString()}
                </div>
                <div className="flex items-center justify-end">
                  {index.change > 0 ? (
                    <>
                      <ArrowUpRight className="h-4 w-4 text-stock-up" />
                      <span className="text-sm text-stock-up">
                        {index.change.toFixed(2)} (
                        {index.changePercent.toFixed(2)}%)
                      </span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="h-4 w-4 text-stock-down" />
                      <span className="text-sm text-stock-down">
                        {Math.abs(index.change).toFixed(2)} (
                        {Math.abs(index.changePercent).toFixed(2)}%)
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <Tabs defaultValue="us" className="w-full">
      <TabsList className="w-full grid grid-cols-3 mb-3">
        <TabsTrigger value="us">US</TabsTrigger>
        <TabsTrigger value="europe">Europe</TabsTrigger>
        <TabsTrigger value="asia">Asia</TabsTrigger>
      </TabsList>
      <TabsContent value="us">{renderIndices(usIndices)}</TabsContent>
      <TabsContent value="europe">{renderIndices(europeIndices)}</TabsContent>
      <TabsContent value="asia">{renderIndices(asiaIndices)}</TabsContent>
    </Tabs>
  );
}
