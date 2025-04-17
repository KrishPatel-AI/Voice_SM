"use client";
import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface NewsItem {
  title: string;
  summary: string;
  url: string;
  banner_image: string;
  source: string;
}

export function MarketNews() {
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/market-news");

        if (!response.ok) {
          throw new Error("Failed to fetch news data");
        }

        const data = await response.json();
        setNewsItems(data);
        setError(null);
      } catch (err) {
        setError("Error loading news. Please try again later.");
        console.error("Error fetching news:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const filteredNews = newsItems.filter(
    (item) =>
      item.title.toLowerCase().includes(filter.toLowerCase()) ||
      item.source.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNewsItems = filteredNews.slice(startIndex, endIndex);

  const extractTickers = (text: string) => {
    const tickerPattern = /\$[A-Z]+|\b[A-Z]{1,5}\b/g;
    const matches = text.match(tickerPattern) || [];
    return [...new Set(matches)]
      .filter(
        (ticker) =>
          ticker.length > 1 &&
          !["A", "I", "THE", "AND", "OR", "FOR", "IN", "ON", "AT"].includes(
            ticker
          )
      )
      .slice(0, 3);
  };

  const analyzeSentiment = (
    text: string
  ): "positive" | "negative" | "neutral" => {
    const positiveWords = [
      "gain",
      "rise",
      "up",
      "growth",
      "surge",
      "improve",
      "rally",
      "bullish",
      "outperform",
    ];
    const negativeWords = [
      "fall",
      "drop",
      "down",
      "decline",
      "loss",
      "bearish",
      "crash",
      "plunge",
      "underperform",
    ];

    text = text.toLowerCase();

    let positiveScore = positiveWords.filter((word) =>
      text.includes(word)
    ).length;
    let negativeScore = negativeWords.filter((word) =>
      text.includes(word)
    ).length;

    if (positiveScore > negativeScore) return "positive";
    if (negativeScore > positiveScore) return "negative";
    return "neutral";
  };

  const generatePaginationItems = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, "ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "ellipsis",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      totalPages,
    ];
  };

  return (
    <>
      <div className="mb-4">
        <Input
          placeholder="Search news by keyword or source..."
          className="h-9"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="space-y-4">
        {isLoading ? (
          Array(3)
            .fill(0)
            .map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Skeleton className="h-16 w-16 rounded-md" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
        ) : error ? (
          <div className="py-6 text-center text-muted-foreground">{error}</div>
        ) : filteredNews.length === 0 ? (
          <div className="py-6 text-center text-muted-foreground">
            No news items found
          </div>
        ) : (
          <>
            {currentNewsItems.map((news, index) => {
              const tickers = extractTickers(news.title + " " + news.summary);
              const sentiment = analyzeSentiment(
                news.title + " " + news.summary
              );

              return (
                <Card key={index} className="cursor-pointer">
                  <CardContent className="px-2 py-0">
                    <div className="flex gap-4">
                      <Avatar className="h-20 w-20 rounded-md">
                        <AvatarImage
                          src={news.banner_image}
                          alt={news.title}
                          className="object-cover"
                        />
                        <AvatarFallback className="rounded-md bg-muted">
                          {news.source.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium mb-1 line-clamp-2">
                            {news.title}
                          </h3>
                          <a
                            href={news.url}
                            className="text-muted-foreground hover:text-primary ml-2 mt-1"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>

                        <div className="text-xs text-muted-foreground flex gap-2 mb-1">
                          <span>{news.source}</span>
                          <span>•</span>
                          <span>{new Date().toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex gap-1 flex-wrap">
                            {tickers.map((ticker) => (
                              <Badge
                                key={ticker}
                                variant="outline"
                                className="text-xs"
                              >
                                {ticker}
                              </Badge>
                            ))}
                          </div>
                          {sentiment === "positive" ? (
                            <Badge className="bg-green-500 hover:bg-green-600">
                              Positive
                            </Badge>
                          ) : sentiment === "negative" ? (
                            <Badge className="bg-red-500 hover:bg-red-600">
                              Negative
                            </Badge>
                          ) : (
                            <Badge variant="outline">Neutral</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {totalPages > 1 && (
              <Pagination className="mt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {generatePaginationItems().map((page, i) =>
                    page === "ellipsis" ? (
                      <PaginationItem key={`ellipsis-${i}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={`page-${page}`}>
                        <PaginationLink
                          onClick={() => setCurrentPage(Number(page))}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </>
  );
}
