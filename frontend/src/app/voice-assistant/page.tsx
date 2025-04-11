import { Metadata } from "next";

import { VoiceInterface } from "@/components/voice-assistant/voice-interface";
import { AboutSection } from "@/components/voice-assistant/about-section";
import { SampleQueries } from "@/components/voice-assistant/sample-queries";
import { Brain } from "lucide-react";

export const metadata: Metadata = {
  title: "Voice Assistant - GroqIt",
  description: "AI-powered voice assistant for financial market insights",
};

export default function VoiceAssistant() {
  return (
    <div className="container px-12 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Brain className="mr-2 h-7 w-7 text-primary" />
          Voice Assistant
        </h1>
        <p className="text-muted-foreground">
          Ask questions about stocks and get real-time insights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <VoiceInterface />
        </div>

        <div className="space-y-6">
          <AboutSection />
          <SampleQueries />
        </div>
      </div>
    </div>
  );
}
