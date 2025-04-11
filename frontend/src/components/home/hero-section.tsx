"use client";
import Link from "next/link";
import { ArrowRight, BarChart2, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function HeroSection() {
  return (
    <section className="p-12 md:py-24">
      <div className="container grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-4">
            <Badge variant="outline" >
              Introducing <span className="text-primary">Groq</span>it
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Your Voice-Powered Stock Market Assistant
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Get real-time market insights, stock analysis, and financial
              advice through natural conversation. Powered by Groq and Fluvio
              for lightning-fast, accurate responses.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link href="/voice-assistant">
              <Button size="lg" className="gap-2">
                <Mic className="h-4 w-4" />
                Try Voice Assistant
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="gap-2">
                <BarChart2 className="h-4 w-4" />
                View Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <Card className="relative h-[350px] w-full max-w-[500px] overflow-hidden rounded-xl border-none shadow-none bg-gradient-to-br from-primary/30 to-purple-500/40 dark:from-primary/20 dark:to-purple-500/30">
            <CardContent className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
              <div className="h-24 w-24 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center">
                <Mic className="h-12 w-12 text-primary" />
              </div>
              <div className="backdrop-blur-sm p-4 rounded-lg max-w-sm space-y-2">
                <h3 className="text-xl font-bold">Voice-First Experience</h3>
                <p className="text-sm">
                  Ask about stocks, market trends, financial advice, and more
                  with natural voice commands.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-12 rounded-full bg-primary/50"
                    style={{
                      height: `${Math.floor(Math.random() * 30) + 4}px`,
                      opacity: 0.6 + Math.random() * 0.4,
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
