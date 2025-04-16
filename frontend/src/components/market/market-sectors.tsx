"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface SectorData {
  sector: string;
  change: number;
  weight: number; // assume this is already percentage (e.g. 10.58)
}

export function MarketSectors() {
  const [sectors, setSectors] = useState<SectorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/sectors");
        const data = await res.json();
        setSectors(data);
      } catch (err) {
        console.error("Failed to fetch sector data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 max-h-[700px] overflow-y-auto">
      {sectors.map((sector) => (
        <Card key={sector.sector} className="bg-card/50 shadow-none">
          <CardContent className="p-3 ">
         

              <div className="flex justify-between items-center mb-1">
                <div className="flex flex-col">
                  <span className="font-medium">{sector.sector}</span>
                  <span className="text-xs text-muted-foreground">
                    {sector.weight.toFixed(1)}% of Index
                  </span>
                </div>
                <div className="flex items-center">
                  {sector.change > 0 ? (
                    <>
                      <ArrowUpRight className="h-4 w-4 text-stock-up" />
                      <span className="text-sm text-stock-up">
                        {sector.change.toFixed(2)}%
                      </span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="h-4 w-4 text-stock-down" />
                      <span className="text-sm text-stock-down">
                        {Math.abs(sector.change).toFixed(2)}%
                      </span>
                    </>
                  )}
                </div>
              </div>
              <Progress
                value={sector.weight}
                className="h-2 bg-muted"
                indicatorClassName={
                  sector.change > 0 ? "bg-stock-up" : "bg-stock-down"
                }
              />
            
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
