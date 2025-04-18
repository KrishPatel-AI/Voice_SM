import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MarketSummary } from "../market/market-summary";
import { ArrowRight, Check } from "lucide-react";

export function Market() {
  return (
    <section className="p-12 bg-primary/5 border-t border-b">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Market Analysis</h2>
            <p className="mb-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 bg-primary/20 p-1.5 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Real-time Market Data</h3>
                    <p className="text-muted-foreground text-sm">
                      Real-time market insights from Indian Market with Market
                      Indices
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 bg-primary/20 p-1.5 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Global Market Summary</h3>
                    <p className="text-muted-foreground text-sm">
                      Market insights from Global market like USA, Europe, and
                      Asia.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 bg-primary/20 p-1.5 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Sector Performance </h3>
                    <p className="text-muted-foreground text-sm">
                      Sector wise Performance in the stock market
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 bg-primary/20 p-1.5 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Global Market News</h3>
                    <p className="text-muted-foreground text-sm">
                     Provide latest news related to the global market and stock market
                    </p>
                  </div>
                </div>
              </div>
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/market">
                <Button size="lg" variant="outline" className="gap-2">
                  Market Insights
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          {/* <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 shadow-sm"> */}
          <MarketSummary />
          {/* </div> */}
        </div>
      </div>
    </section>
  );
}
