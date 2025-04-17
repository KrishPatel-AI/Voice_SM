import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  ArrowDownRight,
  Bookmark,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface StockItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentage: number;
  volume: string;
}

export function TrendingStocks() {
  const trendingStocks: StockItem[] = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 187.68,
      change: 1.25,
      percentage: 0.67,
      volume: "52.3M",
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: 407.54,
      change: 2.78,
      percentage: 0.69,
      volume: "28.7M",
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 156.28,
      change: -0.45,
      percentage: -0.29,
      volume: "15.5M",
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: 183.05,
      change: 1.87,
      percentage: 1.03,
      volume: "31.2M",
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corp.",
      price: 950.02,
      change: 15.23,
      percentage: 1.63,
      volume: "42.1M",
    },
    {
      symbol: "META",
      name: "Meta Platforms",
      price: 485.96,
      change: -2.34,
      percentage: -0.48,
      volume: "18.9M",
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 181.06,
      change: -3.12,
      percentage: -1.7,
      volume: "35.6M",
    },
  ];

  return (
    <section className="p-12 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <TrendingUp className="mr-2 text-primary h-6 w-6" />
              Trending Stocks
            </h2>
            <p className="text-muted-foreground mt-1">
              Todays most active stocks in the market
            </p>
          </div>
          <Link href="/markets">
            <Button variant="outline">View All Markets</Button>
          </Link>
        </div>

        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex w-max space-x-4 p-1">
            {trendingStocks.map((stock) => (
              <Card
                key={stock.symbol}
                className="w-[280px] shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold">{stock.symbol}</h3>
                        <Badge variant="outline" className="font-normal">
                          {stock.volume}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {stock.name}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <p className="text-xl font-bold">
                        ${stock.price.toFixed(2)}
                      </p>
                      <div className="flex items-center space-x-1">
                        {stock.change > 0 ? (
                          <>
                            <ArrowUpRight className="h-4 w-4 text-stock-up" />
                            <span className="text-sm text-stock-up">
                              ${stock.change.toFixed(2)} (
                              {stock.percentage.toFixed(2)}%)
                            </span>
                          </>
                        ) : (
                          <>
                            <ArrowDownRight className="h-4 w-4 text-stock-down" />
                            <span className="text-sm text-stock-down">
                              ${Math.abs(stock.change).toFixed(2)} (
                              {Math.abs(stock.percentage).toFixed(2)}%)
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </section>
  );
}
