// components/authentication/avatar.tsx
'use client';

import { useUser, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function ProfileNamePlate() {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded || !user) { 
    return (
      <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  const initials = `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`;
  
  return (
    <div className="flex items-center gap-2">
      <UserButton afterSignOutUrl="/" />
      <span className="text-sm font-medium hidden md:block">
        {user.firstName} {user.lastName}
      </span>
    </div>
  );
}