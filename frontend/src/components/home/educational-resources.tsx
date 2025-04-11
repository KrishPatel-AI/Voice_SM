import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Video,
  FileText,
  Lightbulb,
  ExternalLink,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Resource {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  link: string;
}

export function EducationalResources() {
  const resources: Resource[] = [
    {
      id: "1",
      title: "Stock Market Basics",
      description:
        "Learn the fundamentals of stock market investing and how markets operate.",
      icon: <BookOpen className="h-8 w-8" />,
      tags: ["Fundamentals", "Investing"],
      difficulty: "beginner",
      link: "#",
    },
    {
      id: "2",
      title: "Technical Analysis Guide",
      description:
        "Understand chart patterns and technical indicators for better trading decisions.",
      icon: <FileText className="h-8 w-8" />,
      tags: ["Analysis", "Charts"],
      difficulty: "intermediate",
      link: "#",
    },
    {
      id: "3",
      title: "Fundamental Analysis Tutorial",
      description:
        "Learn how to evaluate a company's financial health and growth potential.",
      icon: <Video className="h-8 w-8" />,
      tags: ["Analysis", "Financials"],
      difficulty: "intermediate",
      link: "#",
    },
    {
      id: "4",
      title: "Options Trading Strategies",
      description:
        "Advanced strategies for options trading and risk management.",
      icon: <Lightbulb className="h-8 w-8" />,
      tags: ["Options", "Advanced"],
      difficulty: "advanced",
      link: "#",
    },
  ];

  // Color mapping for difficulty badges
  const difficultyColors = {
    beginner: "bg-green-500 hover:bg-green-600",
    intermediate: "bg-yellow-500 hover:bg-yellow-600",
    advanced: "bg-red-500 hover:bg-red-600",
  };

  return (
    <section className="p-12 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Learn & Grow
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Educational resources to help you master stock market investing
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-primary/10 text-primary rounded-md">
                    {resource.icon}
                  </div>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div
                        className={`px-2 py-1 rounded-md text-xs font-medium text-white ${
                          difficultyColors[resource.difficulty]
                        }`}
                      >
                        {resource.difficulty.charAt(0).toUpperCase() +
                          resource.difficulty.slice(1)}
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent side="top">
                      <div className="text-sm">
                        <p className="font-medium">Difficulty Level</p>
                        <p className="text-muted-foreground">
                          {resource.difficulty === "beginner" &&
                            "Suitable for those new to investing"}
                          {resource.difficulty === "intermediate" &&
                            "Requires basic investing knowledge"}
                          {resource.difficulty === "advanced" &&
                            "For experienced investors"}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <CardTitle className="text-xl mt-3">{resource.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {resource.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-muted px-2 py-1 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full flex gap-2 items-center"
                >
                  <ExternalLink className="h-4 w-4" />
                  Access Resource
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
