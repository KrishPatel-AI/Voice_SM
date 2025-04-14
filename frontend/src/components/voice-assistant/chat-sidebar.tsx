import { ArrowRight, BarChart2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ChatUser } from "./chat-user";

// const data = {
//   user: {
//     name: "VoiceSM AI User",
//     email: "user.ai@voicesm.in",
//     avatar: "/avatars/shadcn.jpg",
//   },
// };

export function ChatSidebar() {
  const chatHistory = [
    { id: "1", title: "Stock market trendsasdfasdfasdfafd", date: "Apr 12" },
    { id: "2", title: "Apple performance analysis", date: "Apr 11" },
    { id: "3", title: "Tesla price predictions", date: "Apr 10" },
    { id: "4", title: "Market overview 2025", date: "Apr 9" },
    { id: "5", title: "S&P 500 analysis", date: "Apr 8" },
    { id: "6", title: "Cryptocurrency impacts", date: "Apr 7" },
    { id: "7", title: "Tech sector outlook", date: "Apr 6" },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center px-2 py-3 border-b">
          <Link
            href="/"
            className="font-bold text-xl flex items-center justify-center h-full w-full"
          >
            <span className="text-primary">Voice</span>SM
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chat History</SidebarGroupLabel>
          <SidebarGroupContent>
            <ScrollArea className="h-[calc(100vh-160px)]">
              <SidebarMenu className="w-full gap-4">
                {chatHistory.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton className="py-6">
                      <div className="flex flex-col items-start">
                        <span className="truncate">
                          {chat.title.length > 25
                            ? chat.title.slice(0, 25) + "…"
                            : chat.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {chat.date}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="py-6">
        <div>
          <Link
            href="/dashboard"
            className="w-full flex justify-center items-center"
          >
            <Button size="sm" variant="ghost">
              <BarChart2 className="h-4 w-4" />
              Back to Dashboard
              <ArrowRight className="h-2 w-2" />
            </Button>
          </Link>
        </div>
        <ChatUser  />
      </SidebarFooter>
    </Sidebar>
  );
}
