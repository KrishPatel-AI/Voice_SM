import { Metadata } from "next";
import { MarketSummary } from "@/components/market/market-summary";
import { NewsFeed } from "@/components/market/news-feed";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, TrendingUp, Globe, Newspaper } from "lucide-react";
import { MarketSectors } from "@/components/market/market-sectors";
import { GlobalIndices } from "@/components/market/global-indices";

export const metadata: Metadata = {
  title: "Markets - StockWhisper",
  description: "Global market summary and latest financial news",
};

export default function Markets() {
  return (
    <div className="container px-12 py-8 ">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Globe className="mr-2 h-7 w-7 text-primary" />
          Markets
        </h1>
        <p className="text-muted-foreground">
          Global market summary and latest financial news
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Market Overview
            </CardTitle>
            <CardDescription>
              Key market indicators and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <h3 className="text-sm font-medium mb-3">US Market Indices</h3>
                <MarketSummary />
              </div>

              <div className="lg:col-span-2">
                <GlobalIndices />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Newspaper className="mr-2 h-5 w-5 text-primary" />
                Financial News
              </CardTitle>
              <CardDescription>Latest market news and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="top" className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-4">
                  <TabsTrigger value="top">Top Stories</TabsTrigger>
                  <TabsTrigger value="business">Business</TabsTrigger>
                  <TabsTrigger value="tech">Technology</TabsTrigger>
                </TabsList>
                <TabsContent value="top">
                  <NewsFeed />
                </TabsContent>
                <TabsContent value="business">
                  <NewsFeed />
                </TabsContent>
                <TabsContent value="tech">
                  <NewsFeed />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <BarChart2 className="mr-2 h-5 w-5 text-primary" />
                Market Sectors
              </CardTitle>
              <CardDescription>Performance by industry sector</CardDescription>
            </CardHeader>
            <CardContent>
              <MarketSectors />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
