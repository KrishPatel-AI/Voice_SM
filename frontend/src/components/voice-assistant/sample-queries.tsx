import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HelpCircle,
  TrendingUp,
  ArrowRight,
  Briefcase,
  DollarSign,
  BarChart2,
} from "lucide-react";

interface QueryProps {
  title: string;
  icon: React.ReactNode;
  examples: string[];
}

function QueryCategory({ title, icon, examples }: QueryProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 font-medium">
        {icon}
        <span>{title}</span>
      </div>
      <div className="space-y-1.5">
        {examples.map((example, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sm h-auto py-1.5 px-2 font-normal"
          >
            <span className="truncate">{example}</span>
            <ArrowRight className="ml-auto h-3 w-3 opacity-50" />
          </Button>
        ))}
      </div>
    </div>
  );
}

export function SampleQueries() {
  const categories = [
    {
      title: "Market Overview",
      icon: <TrendingUp className="h-4 w-4 text-primary" />,
      examples: [
        "How is the market performing today?",
        "What sectors are trending this week?",
        "Compare S&P 500 and Nasdaq performance",
      ],
    },
    {
      title: "Stock Analysis",
      icon: <BarChart2 className="h-4 w-4 text-primary" />,
      examples: [
        "What's the latest news on Apple stock?",
        "Compare Tesla and Rivian performance",
        "How has Microsoft stock performed this year?",
      ],
    },
    {
      title: "Financial Advice",
      icon: <DollarSign className="h-4 w-4 text-primary" />,
      examples: [
        "What are good dividend stocks to consider?",
        "Explain dollar-cost averaging",
        "Should I invest in growth or value stocks?",
      ],
    },
    {
      title: "Portfolio Insights",
      icon: <Briefcase className="h-4 w-4 text-primary" />,
      examples: [
        "What tech stocks should I consider buying?",
        "How to diversify my portfolio?",
        "Best performing energy stocks this quarter",
      ],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          Sample Queries
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {categories.map((category, index) => (
          <QueryCategory
            key={index}
            title={category.title}
            icon={category.icon}
            examples={category.examples}
          />
        ))}
      </CardContent>
    </Card>
  );
}
