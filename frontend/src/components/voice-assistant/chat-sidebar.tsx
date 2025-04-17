import { ArrowRight, BarChart2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ChatUser } from "./chat-user";

export function ChatSidebar() {
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
              <SidebarMenu className="w-full gap-4"></SidebarMenu>
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
        <ChatUser />
      </SidebarFooter>
    </Sidebar>
  );
}
