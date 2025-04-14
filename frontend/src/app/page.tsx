// app/page.tsx
import { HeroSection } from "@/components/home/hero-section";
import { FeatureSection } from "@/components/home/feature-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { EducationalResources } from "@/components/home/educational-resources";
import { CallToAction } from "@/components/home/call-to-action";
import { TrendingStocks } from "@/components/home/trending-stocks";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TrendingStocks />
      <FeatureSection />
      <TestimonialsSection />
      <EducationalResources />
      <CallToAction />
    </div> 
  );
}
