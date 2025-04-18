import { HeroSection } from "@/components/home/hero-section";
import { KeyFeatures } from "@/components/home/key-features";
import { Authentication } from "@/components/home/authentication";
import { CallToAction } from "@/components/home/call-to-action";
import { Market } from "@/components/home/market";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CallToAction />
      <KeyFeatures />
      <Market />
      <Authentication />
      <Footer/>
    </div>
  );
}
