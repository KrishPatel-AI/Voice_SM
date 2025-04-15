'use client';

import { ArrowRight, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatUser } from './chat-user';
import { useChat } from '../../hooks/useChat';

export function ChatSidebar() {
  const { conversations, selectConversation, currentConversation, isLoading } =
    useChat();

  // Improved function to handle conversation selection
  const handleSelectConversation = async (conversationId) => {
    try {
      // First select the conversation - this should update the messages state
      await selectConversation(conversationId);

      // Make sure we notify the user if there's an error selecting the conversation
      console.log(`Successfully selected conversation: ${conversationId}`);

      // Use a more reliable way to scroll to the latest message
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        setTimeout(() => {
          const messagesEndElement = document.getElementById('messages-end');
          if (messagesEndElement) {
            messagesEndElement.scrollIntoView({ behavior: 'smooth' });
          } else {
            console.warn('Could not find messages-end element to scroll to');
          }
        }, 300);
      });
    } catch (error) {
      console.error('Failed to select conversation:', error);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className='flex items-center px-2 py-3 border-b'>
          <Link
            href='/'
            className='font-bold text-xl flex items-center justify-center h-full w-full'
          >
            <span className='text-primary'>Voice</span>SM
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chat History</SidebarGroupLabel>
          <SidebarGroupContent>
            <ScrollArea className='h-[calc(100vh-160px)]'>
              {isLoading ? (
                <div className='text-center text-muted-foreground py-4'>
                  Loading conversations...
                </div>
              ) : conversations.length === 0 ? (
                <div className='text-center text-muted-foreground py-4'>
                  No conversations found.
                </div>
              ) : (
                <SidebarMenu className='w-full gap-4'>
                  {conversations.map((chat) => (
                    <SidebarMenuItem key={chat.id}>
                      <SidebarMenuButton
                        className={`py-6 ${
                          currentConversation?.id === chat.id ? 'bg-muted' : ''
                        }`}
                        onClick={() => handleSelectConversation(chat.id)}
                      >
                        <div className='flex flex-col items-start'>
                          <span className='truncate'>
                            {chat.title && chat.title.trim().length > 0
                              ? chat.title.length > 25
                                ? chat.title.slice(0, 25) + '…'
                                : chat.title
                              : 'New Conversation'}
                          </span>
                          <span className='text-xs text-muted-foreground'>
                            {new Date(chat.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              )}
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='py-6'>
        <div>
          <Link
            href='/dashboard'
            className='w-full flex justify-center items-center'
          >
            <Button size='sm' variant='ghost'>
              <BarChart2 className='h-4 w-4 mr-2' />
              Back to Dashboard
              <ArrowRight className='h-4 w-4 ml-2' />
            </Button>
          </Link>
        </div>
        <ChatUser />
      </SidebarFooter>
    </Sidebar>
  );
}
