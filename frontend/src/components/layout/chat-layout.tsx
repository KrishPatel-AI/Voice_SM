import { ChatSidebar } from "../voice-assistant/chat-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg">
        <ChatSidebar />

        <main className="flex-1  overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
