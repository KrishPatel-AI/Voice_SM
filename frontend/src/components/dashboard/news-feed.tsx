"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, ExternalLink, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
  sentiment: "positive" | "negative" | "neutral";
  tickers: string[];
}

export function NewsFeed() {
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");

  // Mock data for news items
  const newsItems: NewsItem[] = [
    {
      id: "1",
      title: "Apple's Q2 Earnings Beat Expectations on Strong iPhone Sales",
      source: "Financial Times",
      date: "2025-04-06",
      url: "#",
      sentiment: "positive",
      tickers: ["AAPL"],
    },
    {
      id: "2",
      title: "Microsoft Announces New AI Features for Azure Cloud Services",
      source: "Tech Insider",
      date: "2025-04-06",
      url: "#",
      sentiment: "positive",
      tickers: ["MSFT"],
    },
    {
      id: "3",
      title: "Tesla Faces Production Challenges with New Model Release",
      source: "Auto News",
      date: "2025-04-05",
      url: "#",
      sentiment: "negative",
      tickers: ["TSLA"],
    },
    {
      id: "4",
      title: "Amazon Expands Same-Day Delivery to 20 New Markets",
      source: "Retail Daily",
      date: "2025-04-05",
      url: "#",
      sentiment: "positive",
      tickers: ["AMZN"],
    },
    {
      id: "5",
      title: "Fed Signals Potential Rate Cut in Next Meeting",
      source: "Market Watch",
      date: "2025-04-04",
      url: "#",
      sentiment: "neutral",
      tickers: ["SPY", "QQQ"],
    },
  ];

  const filteredNews = newsItems.filter(
    (item) =>
      item.title.toLowerCase().includes(filter.toLowerCase()) ||
      item.tickers.some((ticker) =>
        ticker.toLowerCase().includes(filter.toLowerCase())
      )
  );

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Positive</Badge>
        );
      case "negative":
        return <Badge className="bg-red-500 hover:bg-red-600">Negative</Badge>;
      default:
        return <Badge variant="outline">Neutral</Badge>;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">Market News</CardTitle>
          </div>
          <Button size="sm" variant="outline">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search news by keyword or ticker..."
            className="h-9"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {isLoading ? (
            Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex flex-col space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              ))
          ) : filteredNews.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground">
              No news items found
            </div>
          ) : (
            filteredNews.map((news) => (
              <div
                key={news.id}
                className="border rounded-lg p-3 hover:bg-accent/50 cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium mb-1">{news.title}</h3>
                  <a
                    href={news.url}
                    className="text-muted-foreground hover:text-primary ml-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <div className="text-xs text-muted-foreground flex gap-2 mb-2">
                  <span>{news.source}</span>
                  <span>•</span>
                  <span>{news.date}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-1">
                    {news.tickers.map((ticker) => (
                      <Badge key={ticker} variant="outline" className="text-xs">
                        {ticker}
                      </Badge>
                    ))}
                  </div>
                  {getSentimentBadge(news.sentiment)}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
