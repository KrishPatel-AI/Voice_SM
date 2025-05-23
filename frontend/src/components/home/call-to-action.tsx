import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export function CallToAction() {
  return (
    <section className="p-12 bg-primary/5 border-t border-b">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Ready to transform your FINANCIAL journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Use{" "}
              <span className="font-bold">
                <span className="text-primary">Voice</span>SM
              </span>{" "}
              to make better market decisions through voice-powered intelligence
              and real-time data analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/dashboard">
                <Button size="lg">Get Started Now</Button>
              </Link>
              <Link href="/voice-assistant">
                <Button variant="outline" size="lg">
                  Try Voice Assistant
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 bg-primary/20 p-1.5 rounded-full">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Real-time Market Data</h3>
                  <p className="text-muted-foreground text-sm">
                    Access realtime stock prices and market trends
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 bg-primary/20 p-1.5 rounded-full">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Advanced Stock Comparisons</h3>
                  <p className="text-muted-foreground text-sm">
                    Compare multiple stocks with comprehensive metrics, charts,
                    history
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 bg-primary/20 p-1.5 rounded-full">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Market Analysis</h3>
                  <p className="text-muted-foreground text-sm">
                    Analysis realtime market indices, sector performance and
                    market news
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 bg-primary/20 p-1.5 rounded-full">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Voice-Powered Assistant</h3>
                  <p className="text-muted-foreground text-sm">
                    Ask questions and get answers using natural language
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
