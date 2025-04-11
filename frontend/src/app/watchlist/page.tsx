import { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StockTable } from "@/components/watchlist/stock-table";
import { WatchlistHeader } from "@/components/watchlist/watchlist-header";
import { Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Watchlist - StockWhisper",
  description: "Track your favorite stocks and market movements",
};

export default function Watchlist() {
  return (
    <div className="container px-12 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Eye className="mr-2 h-7 w-7 text-primary" />
          Watchlist
        </h1>
        <p className="text-muted-foreground">
          Track and monitor your favorite stocks
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <WatchlistHeader />
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Stocks</TabsTrigger>
              <TabsTrigger value="tech">Technology</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
              <TabsTrigger value="health">Healthcare</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <StockTable />
            </TabsContent>
            <TabsContent value="tech">
              <StockTable filterSector="Technology" />
            </TabsContent>
            <TabsContent value="finance">
              <StockTable filterSector="Finance" />
            </TabsContent>
            <TabsContent value="health">
              <StockTable filterSector="Healthcare" />
            </TabsContent>
            <TabsContent value="custom">
              <StockTable filterSector="Custom" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
