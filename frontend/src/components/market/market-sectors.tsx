import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface SectorData {
  name: string;
  change: number;
  value: number;
}

export function MarketSectors() {
  // Sample market sector data
  const sectors: SectorData[] = [
    { name: "Technology", change: 1.8, value: 65 },
    { name: "Healthcare", change: 0.7, value: 58 },
    { name: "Financials", change: -0.4, value: 42 },
    { name: "Consumer Disc.", change: 1.2, value: 61 },
    { name: "Communication", change: -0.2, value: 45 },
    { name: "Industrials", change: 0.5, value: 53 },
    { name: "Energy", change: -1.3, value: 35 },
    { name: "Materials", change: 0.3, value: 51 },
  ];

  return (
    <div className="space-y-4">
      {sectors.map((sector) => (
        <Card key={sector.name} className="bg-card/50 shadow-none">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium">{sector.name}</div>
              <div className="flex items-center">
                {sector.change > 0 ? (
                  <>
                    <ArrowUpRight className="h-4 w-4 text-stock-up" />
                    <span className="text-sm text-stock-up">
                      {sector.change.toFixed(1)}%
                    </span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-4 w-4 text-stock-down" />
                    <span className="text-sm text-stock-down">
                      {Math.abs(sector.change).toFixed(1)}%
                    </span>
                  </>
                )}
              </div>
            </div>
            <Progress
              value={sector.value}
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
