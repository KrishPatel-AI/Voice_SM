import { Metadata } from "next";

import { VoiceInterface } from "@/components/voice-assistant/voice-interface";

import { ChatLayout } from "@/components/layout/chat-layout";

import { Brain } from "lucide-react";

export const metadata: Metadata = {
  title: "Voice Assistant - GroqIt",
  description: "AI-powered voice assistant for financial market insights",
};

export default function VoiceAssistant() {
  return (
    <div className="min-h-screen bg-background">
    <ChatLayout>
      <VoiceInterface />
    </ChatLayout>
  </div>
  );
}
