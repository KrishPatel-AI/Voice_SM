"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface IndexData {
  symbol: string;
  name: string;
  price: number | string;
  change: number | string;
}

interface RegionData {
  [region: string]: IndexData[];
}

export function MarketIndices() {
  const [marketData, setMarketData] = useState<RegionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("India");

  const fetchData = async () => {
    try {
      const response = await fetch("/market-indices/data");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setMarketData(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to load market data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const renderIndices = (data: IndexData[] | undefined) => {
    if (!data || data.length === 0) {
      return (
        <Alert>
          <AlertDescription>
            No data available for this region.
          </AlertDescription>
        </Alert>
      );
    }

    return (
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
                    {typeof index.price === "number"
                      ? index.price.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })
                      : index.price}
                  </div>
                  <div className="flex items-center justify-end">
                    {typeof index.change === "number" ? (
                      index.change > 0 ? (
                        <>
                          <ArrowUpRight className="h-4 w-4 text-stock-up" />
                          <span className="text-sm text-stock-up">
                            {index.change.toFixed(2)}%
                          </span>
                        </>
                      ) : (
                        <>
                          <ArrowDownRight className="h-4 w-4 text-stock-down" />
                          <span className="text-sm text-stock-down">
                            {Math.abs(Number(index.change)).toFixed(2)}%
                          </span>
                        </>
                      )
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {index.change}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const regions = marketData ? Object.keys(marketData) : [];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList
        className="w-full grid"
        style={{ gridTemplateColumns: `repeat(${regions.length}, 1fr)` }}
      >
        {regions.map((region) => (
          <TabsTrigger key={region} value={region}>
            {region}
          </TabsTrigger>
        ))}
      </TabsList>
      {regions.map((region) => (
        <TabsContent key={region} value={region}>
          {renderIndices(marketData?.[region])}
        </TabsContent>
      ))}
    </Tabs>
  );
}
