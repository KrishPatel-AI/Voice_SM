import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CallToAction() {
  return (
    <section className="p-12 bg-primary/5 border-t border-b">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Ready to transform your investment journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Join thousands of investors who are using StockWhisper to make
              better market decisions through voice-powered intelligence and
              real-time data analysis.
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
                  <svg
                    className="h-4 w-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Real-time Market Data</h3>
                  <p className="text-muted-foreground text-sm">
                    Access up-to-the-minute stock prices and market trends
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 bg-primary/20 p-1.5 rounded-full">
                  <svg
                    className="h-4 w-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Advanced Stock Comparisons</h3>
                  <p className="text-muted-foreground text-sm">
                    Compare multiple stocks with comprehensive metrics
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 bg-primary/20 p-1.5 rounded-full">
                  <svg
                    className="h-4 w-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Portfolio Simulation</h3>
                  <p className="text-muted-foreground text-sm">
                    Test investment strategies without risking real money
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 bg-primary/20 p-1.5 rounded-full">
                  <svg
                    className="h-4 w-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
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
