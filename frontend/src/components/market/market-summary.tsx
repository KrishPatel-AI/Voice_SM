"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, BarChart2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketIndex {
  symbol: string;
  name: string;
  price: number | string;
  change: number | string;
}

export function IndianMarketSummary() {
  const [marketData, setMarketData] = useState<MarketIndex[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial data load
    fetch('/market-indices/data')
      .then(response => response.json())
      .then(data => {
        if (data.India) {
          setMarketData(data.India);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch initial data:", err);
        setLoading(false);
      });

    // Connect to WebSocket for real-time updates
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/market-indices`;
    const socket = new WebSocket(wsUrl);
    
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.India) {
          setMarketData(data.India);
        }
      } catch (err) {
        console.error("Failed to parse WebSocket data:", err);
      }
    };
    
    // Clean up WebSocket on component unmount
    return () => {
      socket.close();
    };
  }, []);

  // Show only key Indian indices (Sensex and Nifty)
  const keyIndices = marketData.filter(index => 
    index.symbol === "^NSEI" || index.symbol === "^BSESN" || 
    index.symbol === "NIFTYBANK.NS" || index.symbol === "NIFTYIT.NS"
  );

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <BarChart2 className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg font-medium">Indian Market Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-24">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <BarChart2 className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg font-medium">Indian Market Summary</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {keyIndices.map((index) => (
            <div key={index.symbol} className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">
                {index.name}
              </span>
              <span className="text-lg font-medium">
                {typeof index.price === 'number' 
                  ? index.price.toLocaleString(undefined, {maximumFractionDigits: 2}) 
                  : index.price}
              </span>
              <div className="flex items-center">
                {typeof index.change === 'number' ? (
                  index.change > 0 ? (
                    <>
                      <ArrowUp className="h-4 w-4 text-stock-up" />
                      <span className="ml-1 text-sm text-stock-up">
                        +{index.change.toFixed(2)}%
                      </span>
                    </>
                  ) : (
                    <>
                      <ArrowDown className="h-4 w-4 text-stock-down" />
                      <span className="ml-1 text-sm text-stock-down">
                        {index.change.toFixed(2)}%
                      </span>
                    </>
                  )
                ) : (
                  <span className="ml-1 text-sm text-muted-foreground">{index.change}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}