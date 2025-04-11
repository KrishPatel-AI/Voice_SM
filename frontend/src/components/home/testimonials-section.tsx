import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatarUrl?: string;
  rating: number;
}

export function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "Retail Investor",
      content:
        "StockWhisper has transformed how I research stocks. I can simply ask questions about market trends and get instant insights while driving or cooking.",
      avatarUrl: "",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Financial Analyst",
      content:
        "The voice recognition is incredible. I can ask complex questions about market correlations and get accurate responses without typing a single word.",
      avatarUrl: "",
      rating: 5,
    },
    {
      name: "Emily Rivera",
      role: "Day Trader",
      content:
        "This tool saves me hours every week. The real-time data and quick responses help me make faster trading decisions with confidence.",
      avatarUrl: "",
      rating: 4,
    },
    {
      name: "David Park",
      role: "Investment Advisor",
      content:
        "I recommend StockWhisper to all my clients. It makes market research accessible to everyone, regardless of their technical background.",
      avatarUrl: "",
      rating: 5,
    },
  ];

  return (
    <section className="p-12 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how StockWhisper is helping investors of all levels make
            better decisions
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="border shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4 space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating
                                ? "text-primary fill-primary"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="relative">
                        <Quote className="h-6 w-6 text-muted-foreground/30 absolute -top-1 -left-2" />
                        <blockquote className="relative pl-2 mb-4 text-sm">
                          {testimonial.content}
                        </blockquote>
                      </div>
                      <div className="flex items-center mt-6">
                        <Avatar className="h-10 w-10 mr-3">
                          {testimonial.avatarUrl ? (
                            <AvatarImage
                              src={testimonial.avatarUrl}
                              alt={testimonial.name}
                            />
                          ) : (
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">
                            {testimonial.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6 gap-2">
            <CarouselPrevious className="relative static translate-y-0 left-0" />
            <CarouselNext className="relative static translate-y-0 right-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
