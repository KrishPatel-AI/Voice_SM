import { BarChart2, Lightbulb, Mic, Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function FeatureSection() {
  const features = [
    {
      icon: <Mic className="h-10 w-10 text-primary" />,
      title: "Voice Interaction",
      description:
        "Ask questions and get responses using natural language. No typing required.",
    },
    {
      icon: <BarChart2 className="h-10 w-10 text-primary" />,
      title: "Real-Time Data",
      description:
        "Access up-to-the-minute stock prices, market trends, and financial news.",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      title: "Intelligent Analysis",
      description:
        "Get AI-powered insights and recommendations based on current market conditions.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Secure & Private",
      description:
        "Your data and conversations are kept private and secure at all times.",
    },
  ];

  return (
    <section className="p-12 bg-accent/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Key Features</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            StockWhisper combines voice technology with real-time financial data
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
